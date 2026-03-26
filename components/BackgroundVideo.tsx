import { useEffect, useRef } from 'react';

// Total de frames: frame_000.png … frame_081.png
const FRAME_COUNT = 82;

const frameSrc = (index: number) =>
  `/animate-video/frame_${String(index).padStart(3, '0')}.png`;

export default function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(FRAME_COUNT - 1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    // ── Pre-carregar todos os frames ──────────────────────────────────────
    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      return img;
    });

    // Carrega o frame inicial com prioridade e faz fade-in ao pintar
    const initialFrame = images[FRAME_COUNT - 1];
    initialFrame.onload = () => {
      ctx.drawImage(initialFrame, 0, 0, canvas.width, canvas.height);
      // Revela o canvas suavemente após o primeiro frame estar pronto
      canvas.style.transition = 'opacity 0.4s ease';
      canvas.style.opacity = '0.85';
    };
    // Se a imagem já estava em cache, dispara imediatamente
    if (initialFrame.complete && initialFrame.naturalWidth > 0) {
      ctx.drawImage(initialFrame, 0, 0, canvas.width, canvas.height);
      canvas.style.opacity = '0.85';
    }

    // ── Scroll handler ────────────────────────────────────────────────────
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionHeight = window.innerHeight * 2;
      const scrollFraction = Math.min(1, scrollTop / sectionHeight);
      currentFrameRef.current = (1 - scrollFraction) * (FRAME_COUNT - 1);
    };

    // ── Loop de animação com lerp ─────────────────────────────────────────
    let displayedFrame = FRAME_COUNT - 1;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const target = currentFrameRef.current;
      const lerped = displayedFrame + (target - displayedFrame) * 0.12;

      const frameIndex = Math.round(lerped);
      const prevIndex = Math.round(displayedFrame);
      displayedFrame = lerped;

      if (frameIndex !== prevIndex || displayedFrame === FRAME_COUNT - 1) {
        const img = images[Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1))];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // bg-[#1a0d00] = cor escura quente do café → elimina o flash preto
    <div className="absolute inset-0 z-0 bg-[#1a0d00]">
      <canvas
        ref={canvasRef}
        // Começa invisível; fade-in via JS após o primeiro frame pintar
        className="w-full h-full object-cover"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      {/* Gradiente escuro para legibilidade do texto */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50" />
    </div>
  );
}