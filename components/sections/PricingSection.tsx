"use client";
import React, { useRef, useEffect, useState } from "react";
import { plans } from "@/data/pricing";
import type { Plan } from "@/data/pricing";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";

// CheckIcon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// WebGL animated background
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertSrc = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragSrc = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      mat2 rotate2d(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff=center-uv; float len=length(diff);
        len+=variation(diff,vec2(0.,1.),5.,2.);
        len-=variation(diff,vec2(1.,0.),5.,2.);
        float circle=smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/iResolution.xy;
        uv.x*=1.5; uv.x-=0.25;
        float mask=0.0;
        float radius=.35;
        vec2 center=vec2(.5);
        mask+=paintCircle(uv,center,radius,.035).r;
        mask+=paintCircle(uv,center,radius-.018,.01).r;
        mask+=paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 fgColor=vec3(v.x*0.1,v.y*0.3+0.1,.7-v.y*v.x);
        vec3 bgColor=vec3(0.02,0.03,0.06);
        vec3 color=mix(bgColor,fgColor,mask);
        color=mix(color,vec3(0.13,0.77,0.37),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");

    let animId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block z-0"
    />
  );
}

// Pricing Card
function PricingCard({
  planName,
  description,
  price,
  priceAVista,
  features,
  buttonText,
  isPopular = false,
  buttonVariant = "primary",
  whatsappLink,
}: Plan) {
  const cardClass = cn(
    "backdrop-blur-[14px] rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300 relative",
    "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10",
    isPopular &&
      "scale-105 ring-2 ring-[#22c55e]/30 from-white/10 to-white/5 border-[#22c55e]/30 shadow-2xl"
  );

  const btnClass = cn(
    "mt-auto w-full py-3 rounded-xl font-semibold text-sm transition-all",
    buttonVariant === "primary"
      ? "bg-[#22c55e] hover:bg-[#16a34a] text-black"
      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
  );

  return (
    <div className={cardClass}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[11px] font-bold rounded-full bg-[#22c55e] text-black">
          Mais popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-4xl font-extralight tracking-tight text-white">{planName}</h2>
        <p className="text-sm text-white/60 mt-1">{description}</p>
      </div>
      <div className="my-5 flex items-baseline gap-2">
        <span className="text-4xl font-extralight text-white">CAD$ {price}</span>
        <span className="text-xs text-white/50">/mês</span>
      </div>
      {priceAVista && (
        <p className="text-xs text-white/40 mb-3">
          À vista: CAD$ {priceAVista}
        </p>
      )}
      <div className="w-full mb-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <ul className="flex flex-col gap-2 text-xs text-white/80 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckIcon className="text-[#22c55e] w-3 h-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <RippleButton
        className={btnClass}
        rippleColor={
          buttonVariant === "primary"
            ? "rgba(0,0,0,0.2)"
            : "rgba(255,255,255,0.1)"
        }
        onClick={() => window.open(whatsappLink, "_blank")}
      >
        {buttonText}
      </RippleButton>
    </div>
  );
}

// Main export
export function PricingSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-16 bg-[#05080f]">
      <ShaderCanvas />
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
          Investimento
        </span>
        <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight text-white mt-3">
          Protocolo C.O.R.E. 8{" "}
          <span className="text-[#22c55e]">· 16 semanas</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
          Acompanhamento com um coach real. Não um app. Não uma planilha no grupo do WhatsApp.
        </p>
      </div>
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-5 justify-center items-center w-full max-w-4xl">
        {plans.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </div>
      <p className="relative z-10 mt-10 text-xs text-white/30 text-center">
        Grupos de 3 ou mais: CAD$ 45,90/mês por pessoa ·{" "}
        <a
          href="https://wa.me/12269617351"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#22c55e] underline"
        >
          Consultar
        </a>
      </p>
    </section>
  );
}
