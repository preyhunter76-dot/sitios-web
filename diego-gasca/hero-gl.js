// Portada en WebGL: lente líquida que sigue al mouse, separación de color con la velocidad,
// polvo flotando en profundidad, grano y viñeta. Sin librerías. Si no hay WebGL, queda la foto normal.
window.HeroGL = (() => {
  function start({ host, img, reduced }) {
    if (reduced || !host || !img) return null;
    const canvas = document.createElement("canvas");
    canvas.className = "hero-gl"; canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl) return null;

    const vs = `attribute vec2 p; varying vec2 v; void main(){ v = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;
    const fs = `precision highp float;
      varying vec2 v;
      uniform sampler2D T; uniform vec2 R, I, M; uniform float t, vel, sc, intro, sv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      vec2 cover(vec2 uv){
        float ra = R.x / R.y, ri = I.x / I.y;
        vec2 s = ra > ri ? vec2(1., ri / ra) : vec2(ra / ri, 1.);
        vec2 focus = clamp(vec2(.765, .34), s * .5, 1. - s * .5);
        return (uv - focus) * s + focus;
      }
      float dust(vec2 uv, float z, float sp){
        vec2 g = uv * vec2(R.x / R.y, 1.) * z; g.y -= t * sp; g.x += sin(t * .2 + z) * .2;
        vec2 id = floor(g), f = fract(g) - .5;
        float r = h(id); vec2 o = vec2(h(id + 3.1), h(id + 7.7)) - .5;
        float d = length(f - o * .7);
        return smoothstep(.06 * (.4 + r), 0., d) * step(.72, r) * (.5 + .5 * sin(t * (1. + r * 2.) + r * 6.28));
      }
      void main(){
        vec2 uv = v; uv.y = 1. - uv.y;
        float zoom = 1. + .16 * (1. - intro) + .07 * sc;
        uv = (uv - .5) / zoom + .5;
        uv.y -= sc * .06;
        vec2 asp = vec2(R.x / R.y, 1.);
        vec2 m = M;
        vec2 dv = (uv - m) * asp; float d = length(dv);
        float lens = smoothstep(.32, 0., d);
        uv -= normalize(dv + 1e-5) / asp * lens * (.012 + vel * .04);
        uv.x += sin(uv.y * 18. + t * 1.2) * .0012 * (1. + sv * 6.);
        vec2 c = cover(uv);
        float split = .0016 + vel * .012 + sv * .02 + lens * .004;
        vec2 dir = normalize(dv + vec2(1e-5, 0.)) / asp;
        vec3 col = vec3(texture2D(T, c + dir * split).r, texture2D(T, c).g, texture2D(T, c - dir * split).b);
        col *= mix(1., 1.08, lens);
        float dl = dust(v, 6., .03) * .55 + dust(v + 3.7, 11., .05) * .35 + dust(v + 9.1, 3.5, .015) * .8;
        col += dl * .55;
        float vig = smoothstep(1.25, .35, length((v - vec2(.58, .45)) * vec2(1.1, 1.)));
        col *= mix(.55, 1., vig);
        col += (h(v * R + fract(t) * 91.) - .5) * .07;
        col *= smoothstep(0., .35, intro);
        gl_FragColor = vec4(col, 1.);
      }`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    let prog;
    try { prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link"); }
    catch (e) { console.warn("HeroGL", e); return null; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ["T", "R", "I", "M", "t", "vel", "sc", "intro", "sv"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((p) => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const touch = !matchMedia("(hover: hover) and (pointer: fine)").matches;
    const st = { mx: touch ? -2 : .62, my: touch ? -2 : .45, tx: touch ? -2 : .62, ty: touch ? -2 : .45, vel: 0, sc: 0, sv: 0, intro: 0, introT: 0, on: true, ready: false };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.6), r = host.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr | 0); canvas.height = Math.max(1, r.height * dpr | 0);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      st.ready = true; host.appendChild(canvas); resize(); host.classList.add("gl-on");
    };
    if (img.complete && img.naturalWidth) upload(); else img.addEventListener("load", upload, { once: true });

    addEventListener("resize", resize);
    if (!touch) host.closest(".hero").addEventListener("mousemove", (e) => { const r = host.getBoundingClientRect(); st.tx = (e.clientX - r.left) / r.width; st.ty = (e.clientY - r.top) / r.height; }, { passive: true });
    new IntersectionObserver(([en]) => { st.on = en.isIntersecting; if (st.on) loop(); }, { threshold: 0 }).observe(host);

    let last = performance.now(), raf = 0;
    function loop(now = performance.now()) {
      cancelAnimationFrame(raf);
      if (!st.on) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const px = st.mx, py = st.my;
      st.mx += (st.tx - st.mx) * Math.min(1, dt * 6); st.my += (st.ty - st.my) * Math.min(1, dt * 6);
      const sp = Math.hypot(st.mx - px, st.my - py) / Math.max(dt, 1e-3);
      st.vel += (Math.min(sp * .15, 1) - st.vel) * Math.min(1, dt * 4);
      st.sv *= .9;
      if (st.ready) {
        st.intro = Math.min(1, st.intro + dt * (st.introGo ? .55 : 0));
        const e = 1 - Math.pow(1 - st.intro, 3);
        gl.uniform1i(U.T, 0); gl.uniform2f(U.R, canvas.width, canvas.height); gl.uniform2f(U.I, img.naturalWidth, img.naturalHeight);
        gl.uniform2f(U.M, st.mx, st.my); gl.uniform1f(U.t, now / 1000); gl.uniform1f(U.vel, st.vel); gl.uniform1f(U.sc, st.sc);
        gl.uniform1f(U.intro, e); gl.uniform1f(U.sv, st.sv);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
    return {
      play() { st.introGo = true; },
      setScroll(p, velocity = 0) { st.sc = p; st.sv = Math.min(1, Math.max(st.sv, Math.abs(velocity) * .03)); },
    };
  }
  return { start };
})();
