import { useEffect, useRef } from 'react';

// Total de frames: frame_000.png … frame_081.png
const FRAME_COUNT = 82;

/**
 * Formata o índice para zero-padded com 3 dígitos: 0 → "000"
 */
const frameSrc = (index: number) =>
  `/animate-video/frame_${String(index).padStart(3, '0')}.png`;

export default function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 1. ALTERADO: Inicia com o maior frame (81) em vez de 0
  const currentFrameRef = useRef(FRAME_COUNT - 1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resolução nativa do canvas (será escalado via CSS)
    canvas.width = 1920;
    canvas.height = 1080;

    // ── Pre-carregar todos os frames ──────────────────────────────────────
    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      return img;
    });

    // 2. ALTERADO: Desenha o frame final (81) assim que carregar para a tela inicial
    images[FRAME_COUNT - 1].onload = () => {
      ctx.drawImage(images[FRAME_COUNT - 1], 0, 0, canvas.width, canvas.height);
    };

    // ── Scroll handler ────────────────────────────────────────────────────
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionHeight = window.innerHeight * 2; // 200vh de espaço de scroll efetivo
      const scrollFraction = Math.min(1, scrollTop / sectionHeight);
      
      // 3. ALTERADO: Inverte a matemática (1 - scrollFraction). 
      // Scroll 0% = Frame 81 | Scroll 100% = Frame 0
      const targetFrame = (1 - scrollFraction) * (FRAME_COUNT - 1);

      // Atualiza o target; o loop de RAF faz a interpolação
      currentFrameRef.current = targetFrame;
    };

    // ── Loop de animação com lerp (easing suave) ─────────────────────────
    
    // 4. ALTERADO: A variável de controle de exibição também precisa iniciar no máximo
    let displayedFrame = FRAME_COUNT - 1;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const target = currentFrameRef.current;
      // Lerp: aproxima 12% da distância a cada frame → suavidade natural
      const lerped = displayedFrame + (target - displayedFrame) * 0.12;

      // Só redesenha se mudou de frame inteiro
      const frameIndex = Math.round(lerped);
      const prevIndex = Math.round(displayedFrame);

      displayedFrame = lerped;

      // Verifica mudança ou se é a montagem inicial (onde displayedFrame está no limite superior)
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
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-85"
        aria-hidden="true"
      />
      {/* Gradiente escuro suave para legibilidade do texto */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50" />
    </div>
  );
}