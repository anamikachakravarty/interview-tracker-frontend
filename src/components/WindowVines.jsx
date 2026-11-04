import { useEffect, useRef } from "react";

const LEAF_COLORS = ["#477c50", "#5c995e", "#79a968", "#396e49"];
const STEM = "#6e5a3a";
const STEM_LIGHT = "#8d7448";

// Small pixel leaf made of three blocks, anchored at its top-left corner.
function Leaf({ x, y, i, size = 1 }) {
  const n = Math.floor(i);
  const c = LEAF_COLORS[n % 4];
  const s = 4 * size;
  return (
    <g
      className="vine-leaf"
      style={{ animationDelay: `${(n % 7) * -0.6}s`, transformOrigin: `${x}px ${y}px` }}
    >
      <rect x={x} y={y} width={s * 2} height={s} fill={c} />
      <rect x={x + s} y={y + s} width={s * 2} height={s} fill={LEAF_COLORS[(n + 1) % 4]} />
      <rect x={x} y={y + s} width={s} height={s} fill={LEAF_COLORS[(n + 2) % 4]} />
    </g>
  );
}

// Horizontal vine along the top with strands that hang down.
function TopVine() {
  const width = 1200;
  const parts = [];
  for (let x = 0; x < width; x += 8) {
    const y = 8 + (Math.round(Math.sin(x / 70) * 1.5) * 4);
    parts.push(<rect key={`s${x}`} x={x} y={y} width="8" height="5" fill={x % 16 ? STEM : STEM_LIGHT} />);
    if (x % 40 === 0) parts.push(<Leaf key={`l${x}`} x={x} y={y + 5} i={x / 40} size={1.75} />);
    if (x % 120 === 24) {
      const len = 6 + ((x / 120) % 3) * 4;
      const strand = [];
      for (let k = 0; k < len; k++) {
        strand.push(<rect key={`h${x}-${k}`} x={x + (k % 2) * 4} y={y + 5 + k * 6} width="4" height="6" fill={STEM} />);
        if (k % 2 === 1) strand.push(<Leaf key={`hl${x}-${k}`} x={x + 8 - (k % 4) * 6} y={y + 5 + k * 6} i={x / 8 + k} size={1.5} />);
      }
      parts.push(
        <g key={`strand${x}`} className="vine-strand" data-ax={x + 2} data-ay={y + 5}>
          {strand}
        </g>
      );
    }
  }
  return (
    <svg className="window-vine vine-top" viewBox={`0 0 ${width} 140`} preserveAspectRatio="xMinYMin slice" aria-hidden="true" shapeRendering="crispEdges">
      {parts}
    </svg>
  );
}

// Thick vertical vine climbing the side of the frame.
function SideVine({ side }) {
  const height = 900;
  const parts = [];
  const offset = side === "left" ? 0 : 3;
  for (let y = 0; y < height; y += 8) {
    const x = 6 + Math.round(Math.sin(y / 60 + offset) * 1.5) * 4;
    parts.push(<rect key={`s${y}`} x={x} y={y} width="10" height="8" fill={y % 16 ? STEM : STEM_LIGHT} />);
    if (y % 48 === 24) {
      parts.push(<Leaf key={`l${y}`} x={x + 10} y={y} i={y / 48 + offset} size={2} />);
    }
  }
  return (
    <svg className={`window-vine vine-${side}`} viewBox={`0 0 40 ${height}`} preserveAspectRatio="xMinYMin meet" aria-hidden="true" shapeRendering="crispEdges">
      {parts}
    </svg>
  );
}

// Strands swing away from the pointer and spring back, like hanging vines.
function useVineSway(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const strands = [...root.querySelectorAll(".vine-strand")].map((el) => ({
      el,
      angle: 0,
      velocity: 0,
      target: 0,
      ax: Number(el.dataset.ax),
      ay: Number(el.dataset.ay),
    }));
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const step = () => {
      let moving = false;
      for (const s of strands) {
        s.velocity += (s.target - s.angle) * 0.08;
        s.velocity *= 0.9;
        s.angle += s.velocity;
        if (Math.abs(s.velocity) > 0.01 || Math.abs(s.target - s.angle) > 0.05) moving = true;
        s.el.style.transform = `rotate(${s.angle.toFixed(2)}deg)`;
      }
      frame = moving ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const update = () => {
      for (const s of strands) {
        const svg = s.el.ownerSVGElement;
        const box = svg.getBoundingClientRect();
        const scale = box.width / svg.viewBox.baseVal.width;
        const dx = pointer.x - (box.left + s.ax * scale);
        const dy = pointer.y - (box.top + s.ay * scale);
        const reach = 110;
        const near = Math.max(0, 1 - Math.hypot(dx, dy * 0.5) / reach);
        s.target = near > 0 ? -Math.sign(dx || 1) * near * 28 : 0;
        s.el.style.transformOrigin = `${s.ax}px ${s.ay}px`;
      }
      kick();
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      update();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      update();
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}

export default function WindowVines() {
  const rootRef = useRef(null);
  useVineSway(rootRef);
  return (
    <div className="window-vines" ref={rootRef} aria-hidden="true">
      <TopVine />
      <SideVine side="left" />
      <SideVine side="right" />
    </div>
  );
}
