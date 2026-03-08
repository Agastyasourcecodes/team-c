import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Landing.css";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x,289.0); }
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

struct ColorStop { vec3 color; float position; };
#define COLOR_RAMP(colors,factor,finalColor) { \
  int index=0; \
  for(int i=0;i<2;i++){ ColorStop cc=colors[i]; bool inBetween=cc.position<=factor; index=int(mix(float(index),float(i),float(inBetween))); } \
  ColorStop cc=colors[index]; ColorStop nc=colors[index+1]; \
  float range=nc.position-cc.position; float lf=(factor-cc.position)/range; \
  finalColor=mix(cc.color,nc.color,lf); \
}

void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  ColorStop colors[3];
  colors[0]=ColorStop(uColorStops[0],0.0);
  colors[1]=ColorStop(uColorStops[1],0.5);
  colors[2]=ColorStop(uColorStops[2],1.0);
  vec3 rampColor;
  COLOR_RAMP(colors,uv.x,rampColor);
  float height=snoise(vec2(uv.x*3.0+uTime*0.6,uTime*0.5))*0.5*uAmplitude;
  height=exp(height);
  height=(uv.y*2.0-height+0.2);
  float intensity=0.6*height;
  float midPoint=0.20;
  float auroraAlpha=smoothstep(midPoint-uBlend*0.5,midPoint+uBlend*0.5,intensity);
  vec3 auroraColor=intensity*rampColor;
  fragColor=vec4(auroraColor*auroraAlpha,auroraAlpha);
}`;

function HeroAurora({ colorStops = ["#1E3A8A", "#4B5563", "#1E3A8A"], amplitude = 1.2, blend = 0.6 }) {
  const ctnRef = useRef(null);
  const propsRef = useRef({ colorStops, amplitude, blend });
  propsRef.current = { colorStops, amplitude, blend };

  useEffect(() => {
    const ctn = ctnRef.current;
    if (!ctn) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;background:transparent;";

    let program;
    const resize = () => {
      if (!ctn) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      if (program) program.uniforms.uResolution.value = [ctn.offsetWidth, ctn.offsetHeight];
    };
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const toRGB = hex => { const c = new Color(hex); return [c.r, c.g, c.b]; };

    program = new Program(gl, {
      vertex: VERT, fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map(toRGB) },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animId;
    const update = t => {
      animId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.0001;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend;
      program.uniforms.uColorStops.value = propsRef.current.colorStops.map(toRGB);
      renderer.render({ scene: mesh });
    };
    animId = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, blend, colorStops]);

  return <div ref={ctnRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <span className="nav-brand">CIVIX</span>
        <div className="nav-right">
          <button className="nav-login" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-register" onClick={() => navigate("/login")}>Register</button>
        </div>
      </nav>

      <section className="hero-section">
        <HeroAurora
          colorStops={["#1E3A8A", "#60A5FA", "#1E3A8A"]}
          amplitude={1.1}
          blend={0.55}
        />

        {/* Dark overlay for readability */}
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">Civic Engagement Platform</div>
            <h1 className="brand">CIVIX</h1>
            <p className="tagline">Empowering Communities<br />Through Digital Participation</p>
            <p className="hero-description">
              Raise petitions, vote in community polls, track government
              responses, and ensure transparent governance — all in one secure platform.
            </p>
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => navigate("/login")}>Get Started</button>
              <button className="secondary-cta" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
                Learn More ↓
              </button>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1768213022263-0414dc145dfd?q=80&w=1170&auto=format&fit=crop"
              alt="Government Assembly"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        {[
          { value: "12,480+", label: "Petitions Raised" },
          { value: "8,920+",  label: "Issues Resolved" },
          { value: "45,000+", label: "Community Votes" },
          { value: "92%",     label: "Citizen Satisfaction" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="features-header">
          <h2>Everything You Need</h2>
          <p>Tools designed for real civic impact</p>
        </div>
        <div className="features-grid">
          {[
            {
              img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop",
              title: "Raise Petitions",
              desc: "Create and support local causes that matter to your community. Gain signatures and push for real change."
            },
            {
              img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&auto=format&fit=crop",
              title: "Participate in Polls",
              desc: "Share your opinion on civic projects and local development initiatives that shape your neighbourhood."
            },
            {
              img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
              title: "Transparent Tracking",
              desc: "Monitor the status of every petition — from submission to verification, action, and full resolution."
            },
          ].map(f => (
            <div className="feature-box" key={f.title}>
              <div className="feature-img-wrap">
                <img src={f.img} alt={f.title} />
              </div>
              <div className="feature-body">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-brand">CIVIX</span>
        <p>© {new Date().getFullYear()} Civix. Building transparent communities.</p>
      </footer>
    </div>
  );
}