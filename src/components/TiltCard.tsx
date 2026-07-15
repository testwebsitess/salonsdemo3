import { useRef, MouseEvent, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Tilt depth multiplier (higher is more tilt, default = 10)
}

export default function TiltCard({ children, className = '', intensity = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = mouseX / width;
    const normalizedY = mouseY / height;

    // Rotate equations: mouse moving up (negative Y) should tip the top forward (positive rotateX)
    const rotateX = -normalizedY * intensity;
    const rotateY = normalizedX * intensity;

    // Apply 3D perspective rotation
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update gloss shine gradient position
    if (shine) {
      const shineX = ((e.clientX - rect.left) / width) * 100;
      const shineY = ((e.clientY - rect.top) / height) * 100;
      shine.style.background = `radial-gradient(circle 120px at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 80%)`;
      shine.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    // Smooth reset to neutral
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

    if (shine) {
      shine.style.opacity = '0';
      shine.style.transition = 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    // Remove transition during active hover so it is highly responsive
    card.style.transition = 'none';
    if (shine) {
      shine.style.transition = 'none';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden transition-transform duration-500 ease-out will-change-transform transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Depth Content wrapper */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Dynamic Mirror Gloss Shine overlay */}
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-30"
        style={{
          background: 'radial-gradient(circle 120px at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
