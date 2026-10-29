// Precios públicos con retraso (Yahoo Finance) y calendario económico de la semana (Forex Factory) para cartel-trading.vercel.app.
// Mismo origen que la mesa de trading del Cerebro (server/markets.ts). Sin claves y solo lectura. Caché de 10 minutos en Vercel.
// GET /api/mercado?s=BTC-USD,NVDA  → { quotes: [...] }      GET /api/mercado?cal=1 → { calendar: [...] }
const UA = { "User-Agent": "Mozilla/5.0 (CartelTrading/1.0)" };
const OK = /^[A-Za-z0-9^=.\-]{1,20}$/;

async function quote(symbol) {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`, { headers: UA, signal: AbortSignal.timeout(12000) });
  if (!r.ok) throw new Error(String(r.status));
  const res = (await r.json()).chart?.result?.[0];
  if (!res) throw new Error("sin datos");
  const closes = (res.indicators?.quote?.[0]?.close || []).filter((c) => typeof c === "number");
  const price = res.meta.regularMarketPrice;
  const prev = closes.length > 1 ? closes[closes.length - 2] : res.meta.chartPreviousClose || price;
  const t = res.meta.regularMarketTime;
  return { symbol, price, changePct: prev ? ((price - prev) / prev) * 100 : 0, currency: res.meta.currency || "", time: t ? new Date(t * 1000).toISOString() : new Date().toISOString(), source: "Yahoo Finance", status: "DELAYED" };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
  try {
    if (req.query.cal) {
      const r = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.json", { headers: UA, signal: AbortSignal.timeout(12000) });
      const rows = r.ok ? await r.json() : [];
      return res.status(200).json({ calendar: rows.map(({ title, country, date, impact, forecast, previous }) => ({ title, country, date, impact, forecast, previous })) });
    }
    const symbols = String(req.query.s || "").split(",").map((s) => s.trim()).filter((s) => OK.test(s)).slice(0, 60);
    const out = await Promise.allSettled(symbols.map(quote));
    return res.status(200).json({ quotes: out.flatMap((r) => (r.status === "fulfilled" ? [r.value] : [])) });
  } catch (e) {
    return res.status(200).json({ quotes: [], calendar: [], error: "Fuente no disponible" });
  }
}
