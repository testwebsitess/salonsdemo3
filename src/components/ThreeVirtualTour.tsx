import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, Move, Info } from 'lucide-react';
import { salonImages } from '../data';

export default function ThreeVirtualTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<{ title: string; desc: string } | null>(null);

  // References for drag calculations
  const isUserInteractingRef = useRef(false);
  const onPointerDownMouseXRef = useRef(0);
  const onPointerDownMouseYRef = useRef(0);
  const onPointerDownLonRef = useRef(0);
  const onPointerDownLatRef = useRef(0);
  const lonRef = useRef(180); // Start facing the center of the styling area
  const latRef = useRef(0);
  const fovRef = useRef(75);

  const [lonState, setLonState] = useState(180);
  const [latState, setLatState] = useState(0);

  // List of interactive hotspots to show inside the 360 virtual room
  const hotspots = [
    {
      id: 'bridal',
      title: 'The Royal Bridal Lounge',
      desc: 'Our private, luxury suite where brides receive bespoke consultations and signature makeups with complementary high-tea.',
      lon: 130,
      lat: -5,
    },
    {
      id: 'styling',
      title: 'Main Styling & Coloring Deck',
      desc: 'Fitted with Italian leather chairs and daylight-balanced vanity lighting, where our master colorists craft signature balayages.',
      lon: 210,
      lat: -10,
    },
    {
      id: 'skin',
      title: 'Vortex Skin Sanctuary',
      desc: 'Quiet, dimly-lit therapy rooms where state-of-the-art Hydra-facials and 24K Gold skin treatments are custom blended.',
      lon: 310,
      lat: -2,
    },
  ];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(fovRef.current, width / height, 1, 1100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);

    // Geometry - Sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert the geometry on the x-axis so the texture is mapped on the inside
    geometry.scale(-1, 1, 1);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let texture: THREE.Texture | null = null;

    textureLoader.load(
      salonImages.panorama,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        texture = loadedTexture;

        const material = new THREE.MeshBasicMaterial({ map: loadedTexture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading 360 panorama texture:', err);
        // Fallback grid texture if image fails to load
        const canvasFallback = document.createElement('canvas');
        canvasFallback.width = 512;
        canvasFallback.height = 256;
        const ctx = canvasFallback.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#064e3b'; // emerald
          ctx.fillRect(0, 0, 512, 256);
          ctx.fillStyle = '#d4af37'; // gold
          ctx.font = '24px serif';
          ctx.fillText('Zaria Salon Flagship Room', 50, 128);
        }
        const fallbackTex = new THREE.CanvasTexture(canvasFallback);
        const material = new THREE.MeshBasicMaterial({ map: fallbackTex });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        setIsLoading(false);
      }
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Drag-to-look Interaction Handlers
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return; // left click only

      isUserInteractingRef.current = true;

      onPointerDownMouseXRef.current = event.clientX;
      onPointerDownMouseYRef.current = event.clientY;

      onPointerDownLonRef.current = lonRef.current;
      onPointerDownLatRef.current = latRef.current;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isUserInteractingRef.current) {
        const clientX = event.clientX;
        const clientY = event.clientY;

        // Sensible panning multiplier
        const factor = 0.15 * (fovRef.current / 75);

        lonRef.current = (onPointerDownMouseXRef.current - clientX) * factor + onPointerDownLonRef.current;
        latRef.current = (clientY - onPointerDownMouseYRef.current) * factor + onPointerDownLatRef.current;

        // Keep latitude in boundary to prevent camera flipping at the poles
        latRef.current = Math.max(-85, Math.min(85, latRef.current));
      }
    };

    const onPointerUp = () => {
      isUserInteractingRef.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(fov, 30, 90);
      camera.updateProjectionMatrix();
      fovRef.current = camera.fov;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // If user is not dragging, let the camera slowly pan on its own for cinematic feel
      if (!isUserInteractingRef.current) {
        lonRef.current += 0.025; // Slow ambient pan
      }

      // Convert lat/lon to Spherical look-at target
      latRef.current = Math.max(-85, Math.min(85, latRef.current));
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      cameraTarget.x = 500 * Math.sin(phi) * Math.sin(theta);
      cameraTarget.y = 500 * Math.cos(phi);
      cameraTarget.z = 500 * Math.sin(phi) * Math.cos(theta);

      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);

      // Keep React state in sync for hotspots alignment
      setLonState(lonRef.current % 360);
      setLatState(latRef.current);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      geometry.dispose();
      if (texture) texture.dispose();
      renderer.dispose();
    };
  }, []);

  // Hotspot placement math
  // We can calculate which hotspots are currently in front of the camera and project them onto our overlay
  // For a basic interactive overlay, we calculate if a hotspot's lon/lat is near our camera's current angle.
  const isHotspotVisible = (hLon: number, hLat: number) => {
    // Normalize angles
    let diffLon = Math.abs((lonState < 0 ? 360 + (lonState % 360) : lonState % 360) - (hLon % 360));
    if (diffLon > 180) diffLon = 360 - diffLon;
    const diffLat = Math.abs(latState - hLat);

    // If within a reasonable field of view, show it!
    return diffLon < 45 && diffLat < 35;
  };

  // Approximate hotspot position on screen for absolute layout overlay
  const getHotspotStyle = (hLon: number, hLat: number) => {
    let diffLon = (hLon % 360) - (lonState < 0 ? 360 + (lonState % 360) : lonState % 360);
    if (diffLon > 180) diffLon -= 360;
    if (diffLon < -180) diffLon += 360;

    const diffLat = hLat - latState;

    // Map degree offset to screen percent
    const left = 50 + diffLon * 1.5; // multiplier maps degree to screen width
    const top = 50 - diffLat * 1.5;  // multiplier maps degree to screen height

    return {
      left: `${left}%`,
      top: `${top}%`,
      transform: 'translate(-50%, -50%)',
    };
  };

  // Controls helper functions for overlays
  const zoomIn = () => {
    if (!canvasRef.current) return;
    const currentFov = fovRef.current;
    fovRef.current = Math.max(30, currentFov - 10);
    // Simulate wheel event internally
    const event = new WheelEvent('wheel', { deltaY: -100 });
    canvasRef.current.dispatchEvent(event);
  };

  const zoomOut = () => {
    if (!canvasRef.current) return;
    const currentFov = fovRef.current;
    fovRef.current = Math.min(90, currentFov + 10);
    const event = new WheelEvent('wheel', { deltaY: 100 });
    canvasRef.current.dispatchEvent(event);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-[#d4af37]/20 bg-black group select-none">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#111827]">
          <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4"></div>
          <p className="text-[#dfb48c] font-sans text-sm tracking-widest uppercase">Loading 3D Studio Space...</p>
        </div>
      )}

      {/* Real Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />

      {/* Guide HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="bg-[#111827]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#d4af37]/20 flex items-center gap-2">
          <Move className="w-4 h-4 text-[#d4af37] animate-pulse" />
          <span className="text-white text-xs font-sans font-medium tracking-wide">
            Drag to Look Around • Scroll to Zoom
          </span>
        </div>
        
        <div className="bg-[#1e1b4b]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#d4af37]/20 flex items-center gap-1.5 text-xs text-[#dfb48c] font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Karachi/Lahore Studio Tour
        </div>
      </div>

      {/* Interactive 3D Hotspots mapped onto the sphere screen */}
      {!isLoading && hotspots.map((hotspot) => {
        if (!isHotspotVisible(hotspot.lon, hotspot.lat)) return null;
        
        return (
          <button
            key={hotspot.id}
            onClick={() => setActiveHotspot(hotspot)}
            className="absolute z-20 p-2.5 rounded-full bg-[#111827]/90 text-[#d4af37] border-2 border-[#d4af37] hover:scale-110 active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20 cursor-pointer pointer-events-auto hover:bg-[#d4af37] hover:text-[#111827] group/hotspot"
            style={getHotspotStyle(hotspot.lon, hotspot.lat)}
            title={hotspot.title}
          >
            <Info className="w-5 h-5" />
            <span className="absolute left-full ml-2 px-3 py-1 bg-[#111827] text-white text-xs rounded-lg border border-[#d4af37]/20 whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity">
              {hotspot.title}
            </span>
          </button>
        );
      })}

      {/* Hotspot details Modal / overlay card */}
      {activeHotspot && (
        <div className="absolute inset-x-4 bottom-4 md:left-4 md:right-auto md:max-w-sm bg-[#111827]/95 backdrop-blur-lg p-5 rounded-2xl border border-[#d4af37]/35 z-30 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-serif text-lg text-[#dfb48c] tracking-wide font-medium">{activeHotspot.title}</h4>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-gray-400 hover:text-white text-sm font-mono tracking-wider ml-4 cursor-pointer"
            >
              [close]
            </button>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed font-sans">{activeHotspot.desc}</p>
        </div>
      )}

      {/* Bottom control hub */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button
          onClick={zoomIn}
          className="p-3 bg-[#111827]/85 backdrop-blur-md rounded-xl text-white hover:text-[#d4af37] border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all cursor-pointer shadow-lg active:scale-95"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="p-3 bg-[#111827]/85 backdrop-blur-md rounded-xl text-white hover:text-[#d4af37] border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all cursor-pointer shadow-lg active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
