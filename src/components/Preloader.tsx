import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { playShutterSound } from '../utils/audio';

interface PreloaderProps {
  onComplete: () => void;
}

// Particle interface for individual fine grains of sand
interface SandGrain {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isScattering: boolean;
  settled: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'animating' | 'flash' | 'dissolve' | 'done'>('animating');

  const triggerFlashAndExit = () => {
    if (phase === 'flash' || phase === 'dissolve' || phase === 'done') return;
    setPhase('flash');
    playShutterSound();

    // Dissolve the sketch during the peak of the sharp flash
    setTimeout(() => {
      setPhase('dissolve');
    }, 110);

    // Complete transition as the flash smoothly fades out
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 820);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();
    const pressStartTime = 380; // ms when feet start pressing into sand
    const pressDuration = 620; // ms duration of compression into sand
    const flashTriggerTime = 1800; // ms when sharp camera flash triggers

    // Physics parameters for sand grains
    const sandGrains: SandGrain[] = [];
    let grainsInitialized = false;

    // Handle high-resolution canvas scaling
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Footprint geometric contour path (centered around (100, 160))
    const soleSvgPath =
      'M 64 118 C 54 134 54 148 64 164 C 76 182 92 194 94 218 C 96 236 88 250 84 262 C 80 276 86 294 104 298 C 122 302 134 294 138 278 C 142 260 140 240 136 222 C 132 202 136 184 142 166 C 148 150 158 136 156 122 C 154 110 142 104 126 106 C 110 108 94 106 78 110 C 70 112 66 114 64 118 Z';
    const solePath2D = new Path2D(soleSvgPath);

    // Five distinct sketched toes: Hallux to pinky toe
    const toes = [
      { cx: 70, cy: 64, rx: 16, ry: 21, rot: -0.15 },
      { cx: 102, cy: 54, rx: 10, ry: 15, rot: -0.05 },
      { cx: 126, cy: 62, rx: 8.5, ry: 13, rot: 0.08 },
      { cx: 146, cy: 76, rx: 7.5, ry: 11, rot: 0.22 },
      { cx: 162, cy: 95, rx: 6.5, ry: 8.5, rot: 0.32 },
    ];

    const toesPaths = toes.map((t) => {
      const p = new Path2D();
      p.ellipse(t.cx, t.cy, t.rx, t.ry, t.rot, 0, Math.PI * 2);
      return p;
    });

    // Helper: draw hand-drawn jittered sketch stroke
    const drawSketchStroke = (
      context: CanvasRenderingContext2D,
      path: Path2D,
      passes = 2,
      baseAlpha = 0.85
    ) => {
      context.save();
      for (let p = 0; p < passes; p++) {
        context.lineWidth = 1.2 + Math.random() * 0.9;
        context.strokeStyle = `rgba(18, 18, 18, ${baseAlpha * (0.6 + Math.random() * 0.4)})`;
        context.stroke(path);
      }
      context.restore();
    };

    // Helper: draw fine-art cross-hatching inside clipped impression
    const drawCrossHatching = (
      context: CanvasRenderingContext2D,
      density: number,
      opacity: number
    ) => {
      if (opacity <= 0.05) return;
      context.save();
      context.strokeStyle = `rgba(20, 20, 20, ${opacity * 0.65})`;
      context.lineWidth = 0.85;

      const spacing = Math.max(5, 14 - density * 8);
      // Diagonal hatch pass 1 (45 degrees)
      for (let x = -200; x < 400; x += spacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x + 320, 320);
        context.stroke();
      }

      // Diagonal cross pass 2 (-45 degrees) for deepest areas
      if (density > 0.45) {
        context.strokeStyle = `rgba(15, 15, 15, ${opacity * 0.45})`;
        for (let x = -200; x < 400; x += spacing * 1.35) {
          context.beginPath();
          context.moveTo(x + 320, 0);
          context.lineTo(x, 320);
          context.stroke();
        }
      }
      context.restore();
    };

    // Render loop
    const render = (now: number) => {
      const elapsed = now - startTime;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (elapsed >= flashTriggerTime && phase === 'animating') {
        triggerFlashAndExit();
      }

      ctx.clearRect(0, 0, w, h);

      // 1. Pristine Black-and-White Paper Canvas
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      // Geometry for oversized footprints (heroic central proportion)
      const footScale = Math.min(w, h) * 0.0019; // Oversized, commanding presence
      const footSpacing = Math.min(w * 0.17, 130);
      const centerX = w / 2;
      const centerY = h / 2;

      const leftCenter = { x: centerX - footSpacing, y: centerY };
      const rightCenter = { x: centerX + footSpacing, y: centerY };

      // Compression Progress (0 -> 1)
      const pressProgress =
        elapsed < pressStartTime
          ? 0
          : Math.min(1, (elapsed - pressStartTime) / pressDuration);

      // Smooth custom kinetic ease: realistic mechanical deceleration as weight sinks
      const easeWeight =
        pressProgress === 0
          ? 0
          : pressProgress === 1
          ? 1
          : 1 - Math.pow(1 - pressProgress, 3);

      // 2. Initialize Fine Sand Grains along foot perimeters
      if (!grainsInitialized) {
        grainsInitialized = true;
        const totalGrains = 480; // Dense, tangible field of fine sand grains

        for (let i = 0; i < totalGrains; i++) {
          const isLeft = i % 2 === 0;
          const center = isLeft ? leftCenter : rightCenter;
          const angle = Math.random() * Math.PI * 2;
          const radialDist = (65 + Math.random() * 55) * footScale;

          const px = center.x + Math.cos(angle) * radialDist * 0.75;
          const py = center.y + Math.sin(angle) * radialDist * 1.35;

          // Outward ballistic scattering direction
          const outAngle = angle + (Math.random() - 0.5) * 0.4;
          const scatterSpeed = 1.8 + Math.random() * 4.6;

          sandGrains.push({
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            vx: Math.cos(outAngle) * scatterSpeed,
            vy: Math.sin(outAngle) * scatterSpeed - (Math.random() * 0.8),
            size: 0.7 + Math.random() * 1.8,
            color: Math.random() > 0.4 ? '#181818' : '#3C3C3C',
            isScattering: false,
            settled: false,
          });
        }
      }

      // 3. Hand-Drawn Sand Dune Contour Lines
      // Flowing horizontal sketch strokes across the sand that warp as feet press
      const numSandLines = 32;
      const sandLineSpacing = h / (numSandLines + 1);

      ctx.save();
      for (let i = 1; i <= numSandLines; i++) {
        const baseY = i * sandLineSpacing;
        ctx.beginPath();
        ctx.lineWidth = 0.85 + (i % 3 === 0 ? 0.35 : 0);
        ctx.strokeStyle = `rgba(30, 30, 30, ${0.16 + (i % 4 === 0 ? 0.08 : 0)})`;

        const segments = 110;
        for (let s = 0; s <= segments; s++) {
          const px = (s / segments) * w;
          // Organic hand-drawn dune ripple
          const ripple =
            Math.sin(px * 0.006 + i * 0.4) * 6.5 +
            Math.cos(px * 0.014 + i * 0.25) * 3;

          let py = baseY + ripple;

          // Sand line displacement from foot impressions
          if (easeWeight > 0) {
            const dl = Math.hypot(px - leftCenter.x, (py - leftCenter.y) * 0.62);
            const dr = Math.hypot(px - rightCenter.x, (py - rightCenter.y) * 0.62);
            const minDist = Math.min(dl, dr);

            const footRadius = 115 * footScale;

            // Inside impression: sand contour line is pressed down
            if (minDist < footRadius) {
              const depress = (1 - minDist / footRadius) * 24 * footScale * easeWeight;
              py += depress;
            }
            // Perimeter displacement: sand piles up into a raised berm
            else if (minDist < footRadius * 1.5) {
              const ridgeFactor = (minDist - footRadius) / (footRadius * 0.5);
              const pushUp = Math.sin(ridgeFactor * Math.PI) * 12 * footScale * easeWeight;
              py -= pushUp;
            }
          }

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 4. Update & Render Fine Grains of Sand Shifting, Scattering, and Settling
      ctx.save();
      for (let i = 0; i < sandGrains.length; i++) {
        const g = sandGrains[i];

        if (easeWeight > 0.05 && !g.settled) {
          // Dynamic scattering motion
          g.isScattering = true;
          g.x += g.vx * (1 - easeWeight * 0.3);
          g.y += g.vy * (1 - easeWeight * 0.3);

          // Sand friction / aerodynamic drag
          g.vx *= 0.91;
          g.vy *= 0.91;

          // Check if grain has settled into the displaced perimeter
          if (Math.hypot(g.vx, g.vy) < 0.12 || easeWeight >= 0.95) {
            g.settled = true;
          }
        }

        // Draw individual hand-sketched sand grain dot
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();

        // Stippled sand grain ring: tiny companion micro-dot for hand-drawn grain texture
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(40, 40, 40, 0.45)';
          ctx.beginPath();
          ctx.arc(g.x + 1.2, g.y + 0.8, g.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 5. Draw the Single Set of Oversized Bare Footprints Pressing Deeply
      // Initial state: slightly elevated, pressing down with authority
      const currentElevation = (1 - easeWeight) * -16;
      const currentScale = 1.05 - easeWeight * 0.05;

      const drawHandDrawnFoot = (isLeft: boolean) => {
        ctx.save();
        const center = isLeft ? leftCenter : rightCenter;
        ctx.translate(center.x, center.y + currentElevation);
        ctx.scale(
          isLeft ? -footScale * currentScale : footScale * currentScale,
          footScale * currentScale
        );
        ctx.rotate(isLeft ? -0.08 : 0.08);
        ctx.translate(-100, -160);

        // A. Displaced Sand Ridge Berm (Penciled perimeter rim where sand piles up)
        if (easeWeight > 0.15) {
          ctx.save();
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = `rgba(20, 20, 20, ${0.35 * easeWeight})`;
          ctx.setLineDash([3, 5]);
          ctx.stroke(solePath2D);
          toesPaths.forEach((tp) => ctx.stroke(tp));
          ctx.restore();
        }

        // B. Deep Hand-Drawn Cross-Hatching inside impression
        ctx.save();
        ctx.clip(solePath2D);
        drawCrossHatching(ctx, easeWeight, easeWeight * 0.95);
        ctx.restore();

        // Cross-hatch each individual toe impression
        toesPaths.forEach((tp) => {
          ctx.save();
          ctx.clip(tp);
          drawCrossHatching(ctx, easeWeight * 1.1, easeWeight * 0.95);
          ctx.restore();
        });

        // C. Hand-Drawn Stippling Texture (Dense ink stipple dots in deep heel and ball)
        if (easeWeight > 0.3) {
          ctx.save();
          ctx.fillStyle = `rgba(15, 15, 15, ${0.75 * easeWeight})`;

          // Heel stipple cluster
          const heelSeeds = [
            { x: 104, y: 260 }, { x: 96, y: 272 }, { x: 112, y: 268 },
            { x: 100, y: 280 }, { x: 108, y: 285 }, { x: 88, y: 264 },
            { x: 118, y: 276 }, { x: 102, y: 250 }, { x: 110, y: 255 },
          ];
          heelSeeds.forEach((s) => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          });

          // Forefoot ball stipple cluster
          const ballSeeds = [
            { x: 100, y: 140 }, { x: 84, y: 135 }, { x: 118, y: 142 },
            { x: 72, y: 130 }, { x: 128, y: 146 }, { x: 92, y: 152 },
            { x: 110, y: 156 }, { x: 104, y: 125 }, { x: 88, y: 122 },
          ];
          ballSeeds.forEach((s) => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.1, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        }

        // D. Expressive 2D Hand-Drawn Sketch Contour Strokes
        drawSketchStroke(ctx, solePath2D, 3, 0.9 * easeWeight);
        toesPaths.forEach((tp) => drawSketchStroke(ctx, tp, 2, 0.9 * easeWeight));

        ctx.restore();
      };

      // Draw Left Foot and Right Foot in oversized heroic stance
      drawHandDrawnFoot(true);
      drawHandDrawnFoot(false);

      if (phase !== 'done') {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      document.body.style.overflow = originalOverflow;
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[99999] select-none cursor-pointer overflow-hidden bg-white flex items-center justify-center"
      onClick={triggerFlashAndExit}
    >
      {/* Black-and-White Hand-Drawn Sketch Canvas */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'dissolve' ? 0 : 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* 
        ========================================================================
        SHARP CAMERA FLASH TRANSITION
        An instantaneous, high-energy burst of stark white light
        ========================================================================
      */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === 'flash' ? 1 : phase === 'dissolve' ? 0 : 0,
        }}
        transition={{
          opacity:
            phase === 'flash'
              ? { duration: 0.03, ease: 'easeIn' } // Razor-sharp instantaneous strobe burst
              : { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
        }}
      />

      {/* Radial High-Key Strobe Light Bloom */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_40%,rgba(255,255,255,0.55)_100%)]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === 'flash' ? 1 : phase === 'dissolve' ? 0 : 0,
        }}
        transition={{
          opacity:
            phase === 'flash'
              ? { duration: 0.03, ease: 'easeIn' }
              : { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
        }}
      />
    </div>
  );
};
