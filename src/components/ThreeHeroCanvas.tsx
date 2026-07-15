import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create Group for the entire 3D Perfume Bottle and animations
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Bottle Body (Luxury faceted glass)
    const bottleGeometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 8, 4);
    // Flatten it slightly to look like a premium flask perfume bottle
    bottleGeometry.scale(1.2, 1, 0.7);

    // Glass Material with Physical Properties
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      transmission: 0.9,      // Glass transparency
      ior: 1.5,               // Index of refraction for glass
      thickness: 0.5,         // Glass thickness
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const bottleMesh = new THREE.Mesh(bottleGeometry, glassMaterial);
    bottleMesh.castShadow = true;
    bottleMesh.receiveShadow = true;
    mainGroup.add(bottleMesh);

    // 2. Liquid inside (Blush / Champagne liquid)
    const liquidGeometry = new THREE.CylinderGeometry(1.05, 1.05, 2.0, 8, 2);
    liquidGeometry.scale(1.2, 1, 0.7);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdfb48c, // Rose gold / champagne color
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      transmission: 0.75,
      ior: 1.33, // Water/juice Index of Refraction
    });
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = -0.1;
    mainGroup.add(liquidMesh);

    // 3. Gold Neck collar
    const neckGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Real Gold tone
      metalness: 0.95,
      roughness: 0.15,
    });
    const neckMesh = new THREE.Mesh(neckGeometry, goldMaterial);
    neckMesh.position.y = 1.4;
    mainGroup.add(neckMesh);

    // 4. Gold Cap (faceted luxury cylinder)
    const capGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.8, 8);
    const capMesh = new THREE.Mesh(capGeometry, goldMaterial);
    capMesh.position.y = 1.9;
    capMesh.castShadow = true;
    mainGroup.add(capMesh);

    // 5. Label Plate on front
    const labelGeometry = new THREE.PlaneGeometry(1.2, 0.8);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827, // Dark slate
      roughness: 0.5,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    // Move it slightly forward to sit on bottle surface
    labelMesh.position.set(0, 0, 0.55);
    mainGroup.add(labelMesh);

    // Mini gold frame for the label plate
    const borderGeo = new THREE.BoxGeometry(1.3, 0.9, 0.02);
    const borderMesh = new THREE.Mesh(borderGeo, goldMaterial);
    borderMesh.position.set(0, 0, 0.54);
    mainGroup.add(borderMesh);

    // 6. Luxury Ribbon / Rings orbiting the perfume bottle
    const ribbonGroup = new THREE.Group();
    mainGroup.add(ribbonGroup);

    // Two golden rings orbiting elegantly
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, goldMaterial);
    ringMesh1.rotation.x = Math.PI / 2.5;
    ribbonGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.4, 0.015, 8, 100);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldMaterial);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 6;
    ribbonGroup.add(ringMesh2);

    // 7. Floating luxury particles
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Circle distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 2.5;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      scales[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create soft glowing circle particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light (Gold / Warm)
    const keyLight = new THREE.DirectionalLight(0xffe5b4, 1.8);
    keyLight.position.set(5, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light (Blush / Purple for dramatic depth)
    const fillLight = new THREE.DirectionalLight(0xeaa6bc, 1.2);
    fillLight.position.set(-5, -2, 2);
    scene.add(fillLight);

    // Rim Light (Accent on the glass silhouette)
    const rimLight = new THREE.SpotLight(0xffffff, 4, 15, Math.PI / 4, 0.5, 1);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    setIsLoading(false);

    // Mouse interactive target rotation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Limit response to subtle tilt
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation (damping) for mouse interaction
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Base rotation + mouse tilt
      mainGroup.rotation.y = elapsedTime * 0.4 + currentX;
      mainGroup.rotation.x = currentY;
      mainGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05; // Gentle float

      // Elegant float effect on Y-axis
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

      // Rotate orbiting ribbon rings at different speeds
      ribbonGroup.rotation.y = -elapsedTime * 0.25;
      ribbonGroup.rotation.z = Math.cos(elapsedTime * 0.1) * 0.1;

      // Slowly rotate background particles
      particles.rotation.y = elapsedTime * 0.03;
      
      // Update floating heights of particles slightly
      const positionsArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
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
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      // Dispose Geometries/Materials
      bottleGeometry.dispose();
      glassMaterial.dispose();
      liquidGeometry.dispose();
      liquidMaterial.dispose();
      neckGeometry.dispose();
      goldMaterial.dispose();
      capGeometry.dispose();
      labelGeometry.dispose();
      labelMaterial.dispose();
      borderGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] select-none flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full outline-none touch-none pointer-events-none" />
    </div>
  );
}
