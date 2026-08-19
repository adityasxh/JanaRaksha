"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function JanaRakshaShield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --------------------------------------------------
    // SCENE
    // --------------------------------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // --------------------------------------------------
    // ROOT
    // --------------------------------------------------

    const shieldRoot = new THREE.Group();

    shieldRoot.rotation.set(-0.04, 0.08, 0);

    scene.add(shieldRoot);

    // --------------------------------------------------
    // SHIELD SHAPE
    // --------------------------------------------------

    const shieldShape = new THREE.Shape();

    shieldShape.moveTo(0, 3.05);

    shieldShape.bezierCurveTo(
      0.72,
      2.72,
      1.62,
      2.50,
      2.18,
      2.38
    );

    shieldShape.bezierCurveTo(
      2.18,
      0.55,
      1.58,
      -1.55,
      0,
      -2.82
    );

    shieldShape.bezierCurveTo(
      -1.58,
      -1.55,
      -2.18,
      0.55,
      -2.18,
      2.38
    );

    shieldShape.bezierCurveTo(
      -1.62,
      2.50,
      -0.72,
      2.72,
      0,
      3.05
    );

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.58,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.10,
      bevelSegments: 3,
      curveSegments: 12,
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(
      shieldShape,
      extrudeSettings
    );

    shieldGeometry.center();

    // --------------------------------------------------
    // MAROON GLASS BODY
    // --------------------------------------------------

    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6b1e2a,

      metalness: 0.28,
      roughness: 0.2,

      transparent: true,
      opacity: 0.84,

      clearcoat: 0.8,
      clearcoatRoughness: 0.18,

      emissive: 0x6b1e2a,
emissiveIntensity: 0.7,

      side: THREE.DoubleSide,
    });

    const shield = new THREE.Mesh(
      shieldGeometry,
      shieldMaterial
    );

    shieldRoot.add(shield);

    // --------------------------------------------------
    // GOLD OUTLINE
    // --------------------------------------------------

    const edgeGeometry = new THREE.EdgesGeometry(
      shieldGeometry,
      18
    );

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xf0c878,
      transparent: true,
      opacity: 0.18,
    });

    const shieldEdges = new THREE.LineSegments(
      edgeGeometry,
      edgeMaterial
    );

    shieldRoot.add(shieldEdges);

    // --------------------------------------------------
    // OUTER GLOW
    // --------------------------------------------------

    const haloGeometry = shieldGeometry.clone();

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6a94a,
      transparent: true,
      opacity: 0.075,

      side: THREE.BackSide,

      blending: THREE.AdditiveBlending,

      depthWrite: false,
    });

    const halo = new THREE.Mesh(
      haloGeometry,
      haloMaterial
    );

    halo.scale.set(1.075, 1.075, 1.16);

    shieldRoot.add(halo);

    // --------------------------------------------------
    // FACETED PANELS
    // --------------------------------------------------

    const facets = [
      [
        -1.55, 1.72, -0.18,
        0.00, 2.60, 0.06,
        -0.55, 1.20, 0.16,
      ],

      [
        -0.55, 1.20, 0.16,
        0.00, 2.60, 0.06,
        0.58, 1.48, 0.12,
      ],

      [
        0.58, 1.48, 0.12,
        0.00, 2.60, 0.06,
        1.52, 1.90, -0.12,
      ],

      [
        -1.55, 1.72, -0.18,
        -0.55, 1.20, 0.16,
        -0.95, 0.08, 0.12,
      ],

      [
        -0.55, 1.20, 0.16,
        0.58, 1.48, 0.12,
        0.30, 0.18, 0.20,
      ],

      [
        0.58, 1.48, 0.12,
        1.52, 1.90, -0.12,
        1.08, 0.15, 0.10,
      ],

      [
        -0.95, 0.08, 0.12,
        0.30, 0.18, 0.20,
        -0.35, -1.35, 0.14,
      ],

      [
        0.30, 0.18, 0.20,
        1.08, 0.15, 0.10,
        0.35, -1.35, 0.14,
      ],

      [
        -0.35, -1.35, 0.14,
        0.35, -1.35, 0.14,
        0.00, -2.35, 0.12,
      ],
    ];

    const facetColors = [
      0xf0c878,
      0x932a3b,
      0x4a1420,

      0xb3695d,
      0x6b1e2a,
      0x4a1420,

      0x932a3b,
      0x6b1e2a,
      0x4a1420,
    ];
    const facetMaterials: THREE.MeshPhysicalMaterial[] = [];
    function createFacet(
      points: number[],
      color: number
    ) {
      const geometry = new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          points,
          3
        )
      );

      geometry.computeVertexNormals();

const material =
  new THREE.MeshPhysicalMaterial({
    color,

    transparent: true,
    opacity: 0.72,

    metalness: 0.25,
    roughness: 0.2,

    clearcoat: 0.9,
    clearcoatRoughness: 0.12,

    // Crystal glow
    emissive: color,
    emissiveIntensity: 0.12,

    side: THREE.DoubleSide,
  });

facetMaterials.push(material);

      const mesh = new THREE.Mesh(
        geometry,
        material
      );

      shieldRoot.add(mesh);
    }

    facets.forEach((facet, index) => {
      createFacet(
        facet,
        facetColors[index]
      );
    });

    // --------------------------------------------------
    // HEXAGONAL DIGITAL GRID
    // --------------------------------------------------

    const lattice = new THREE.Group();

    const hexMaterial =
      new THREE.LineBasicMaterial({
        color: 0xf0c878,

        transparent: true,
        opacity: 0.58,

        blending: THREE.AdditiveBlending,
      });

    function createHexagon(
      x: number,
      y: number,
      radius: number
    ) {
      const points: THREE.Vector3[] = [];

      for (let i = 0; i < 6; i++) {
        const angle =
          Math.PI / 6 +
          (i * Math.PI) / 3;

        points.push(
          new THREE.Vector3(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius,
            0.34
          )
        );
      }

      points.push(points[0].clone());

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points
        );

      const hexagon =
        new THREE.Line(
          geometry,
          hexMaterial
        );

      lattice.add(hexagon);
    }

    const rows = [
      { y: 2.05, xs: [-0.48, 0.48] },

      {
        y: 1.58,
        xs: [-0.96, 0, 0.96],
      },

      {
        y: 1.11,
        xs: [-1.2, -0.4, 0.4, 1.2],
      },

      {
        y: 0.64,
        xs: [-1.38, -0.69, 0, 0.69, 1.38],
      },

      {
        y: 0.17,
        xs: [-1.42, -0.71, 0, 0.71, 1.42],
      },

      {
        y: -0.3,
        xs: [-1.25, -0.62, 0, 0.62, 1.25],
      },

      {
        y: -0.77,
        xs: [-1.02, -0.34, 0.34, 1.02],
      },

      {
        y: -1.24,
        xs: [-0.65, 0, 0.65],
      },

      {
        y: -1.71,
        xs: [-0.3, 0.3],
      },
    ];

    rows.forEach((row) => {
      row.xs.forEach((x) => {
        createHexagon(
          x,
          row.y,
          0.34
        );
      });
    });

    shieldRoot.add(lattice);

    // --------------------------------------------------
    // INNER DIGITAL LINES
    // --------------------------------------------------

    const dataMaterial =
      new THREE.LineBasicMaterial({
        color: 0xfbf6f3,

        transparent: true,
        opacity: 0.22,
      });

    for (let i = 0; i < 9; i++) {
      const x = -1.2 + i * 0.3;

      const geometry =
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            x,
            -1.65,
            0.36
          ),

          new THREE.Vector3(
            x * 0.78,
            2.12,
            0.36
          ),
        ]);

      shieldRoot.add(
        new THREE.Line(
          geometry,
          dataMaterial
        )
      );
    }

    // --------------------------------------------------
    // PARTICLES
    // --------------------------------------------------

    const particleCount = 420;

    const positions =
      new Float32Array(
        particleCount * 3
      );

    const phases =
      new Float32Array(
        particleCount
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const angle =
        Math.random() *
        Math.PI *
        2;

      const radius =
        2.6 +
        Math.random() * 2.4;

      positions[i * 3] =
        Math.cos(angle) *
        radius;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) *
        6.5;

      positions[i * 3 + 2] =
        (Math.random() - 0.5) *
        2.5;

      phases[i] =
        Math.random() *
        Math.PI *
        2;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xf0c878,

        size: 0.045,

        transparent: true,
        opacity: 0.78,

        depthWrite: false,

        blending:
          THREE.AdditiveBlending,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    // --------------------------------------------------
    // GROUND GLOW
    // --------------------------------------------------

    const glowCanvas =
      document.createElement(
        "canvas"
      );

    glowCanvas.width = 256;
    glowCanvas.height = 64;

    const ctx =
      glowCanvas.getContext(
        "2d"
      );

    if (ctx) {
      const gradient =
        ctx.createRadialGradient(
          128,
          32,
          2,
          128,
          32,
          125
        );

      gradient.addColorStop(
        0,
        "rgba(240,200,120,0.60)"
      );

      gradient.addColorStop(
        0.35,
        "rgba(214,169,74,0.25)"
      );

      gradient.addColorStop(
        1,
        "rgba(74,20,32,0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        256,
        64
      );
    }

    const glowTexture =
      new THREE.CanvasTexture(
        glowCanvas
      );

    const glowPlane =
      new THREE.Mesh(
        new THREE.PlaneGeometry(
          5.6,
          1
        ),

        new THREE.MeshBasicMaterial({
          map: glowTexture,

          transparent: true,

          depthWrite: false,

          blending:
            THREE.AdditiveBlending,
        })
      );

    glowPlane.position.set(
      0,
      -3.25,
      -0.25
    );

    scene.add(glowPlane);

    // --------------------------------------------------
    // LIGHTING
    // --------------------------------------------------

    scene.add(
      new THREE.AmbientLight(
        0xfff1d2,
        0.75
      )
    );

    const keyLight =
      new THREE.DirectionalLight(
        0xffe4b0,
        2
      );

    keyLight.position.set(
      4,
      5,
      8
    );

    scene.add(keyLight);

    const goldLight =
      new THREE.PointLight(
        0xd6a94a,
        2.4,
        20
      );

    goldLight.position.set(
      -4,
      -2,
      5
    );

    scene.add(goldLight);

    const maroonLight =
      new THREE.PointLight(
        0x932a3b,
        1.2,
        18
      );

    maroonLight.position.set(
      4,
      0,
      3
    );

    scene.add(maroonLight);

    // --------------------------------------------------
    // MOUSE INTERACTION
    // --------------------------------------------------

    let mouseX = 0;
    let mouseY = 0;

    let smoothX = 0;
    let smoothY = 0;
    let isHovering = false;

    const handleMouseMove = (
      event: MouseEvent
    ) => {
        isHovering = true;
      const rect =
        container.getBoundingClientRect();

      mouseX =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;

      mouseY =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;
    };

    const resetMouse = () => {
      mouseX = 0;
      mouseY = 0;
      isHovering = false;
    };

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      resetMouse
    );

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height,
        false
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    resize();

    // --------------------------------------------------
    // ANIMATION
    // --------------------------------------------------

    const clock =
      new THREE.Clock();

    let animationFrame = 0;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const time =
        clock.getElapsedTime();

      // Smooth mouse
      smoothX +=
        (mouseX - smoothX) *
        0.055;

      smoothY +=
        (mouseY - smoothY) *
        0.055;
        // Crystal hover glow
const hoverDistance = Math.sqrt(
  smoothX * smoothX +
  smoothY * smoothY
);

const proximity = Math.max(
  0,
  1 - hoverDistance / 0.65
);

const targetGlow = isHovering
  ? 0.15 + proximity * 0.9
  : 0.12;

facetMaterials.forEach(
  (material, index) => {
    // Slight variation between crystals
    const crystalVariation =
      1 +
      Math.sin(
        time * 2.5 + index
      ) *
        0.12;

    material.emissiveIntensity +=
      (
        targetGlow *
          crystalVariation -
        material.emissiveIntensity
      ) *
      0.08;
  }
);

      // Real 3D rotation
      shieldRoot.rotation.y =
        0.1 +
        smoothX * 0.42;

      shieldRoot.rotation.x =
        -0.04 -
        smoothY * 0.22;

      // Gentle floating
      shieldRoot.position.y =
        Math.sin(time * 0.8) *
        0.06;

      // Hex grid movement
      lattice.rotation.z =
        Math.sin(time * 0.45) *
        0.008;

      // Particle movement
      particles.rotation.y =
        time * 0.035;

      const particlePositions =
        particles.geometry
          .attributes
          .position
          .array as Float32Array;

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        particlePositions[
          i * 3 + 1
        ] +=
          Math.sin(
            time * 0.45 +
              phases[i]
          ) * 0.0007;
      }

      particles.geometry.attributes
        .position.needsUpdate = true;

      particleMaterial.opacity =
        0.58 +
        Math.sin(time * 1.8) *
          0.16;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        resetMouse
      );

      shieldGeometry.dispose();
      shieldMaterial.dispose();

      edgeGeometry.dispose();
      edgeMaterial.dispose();

      haloGeometry.dispose();
      haloMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      glowTexture.dispose();

      renderer.dispose();

      if (
        renderer.domElement.parentNode
      ) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "520px",
        position: "relative",
      }}
    />
  );
}