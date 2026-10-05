/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 20 }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// Debe coincidir con los @media de index.css, Home.css y Lanyard.css
const STACKED_LAYOUT_QUERY = '(max-width: 767px), (max-width: 1100px) and (orientation: portrait)';

const CARD_PINK = '#d4819f'; // mismo rosa que --color-primary
const CARD_FONT = 'Montserrat';
const NAME_FONT = 'Fraunces'; // misma fuente que "Software developer.", sin itálica

// Redibuja "Click!" y el nombre sobre la imagen original de la tarjeta (1678x1677 px)
function drawCard(ctx, img) {
  ctx.drawImage(img, 0, 0);

  // Tapa el "Click !" viejo con un parche de cuero liso, sin tocar el borde del círculo
  ctx.save();
  ctx.beginPath();
  ctx.rect(590, 30, 260, 240);
  ctx.arc(412, 450, 381, 0, Math.PI * 2);
  ctx.clip('evenodd');
  ctx.drawImage(img, 300, 1300, 260, 240, 590, 30, 260, 240);
  ctx.restore();

  ctx.save();
  ctx.translate(728, 128);
  ctx.rotate(0.5);
  ctx.font = `700 64px ${CARD_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000';
  ctx.strokeText('Click!', 0, 0);
  ctx.fillStyle = CARD_PINK;
  ctx.fillText('Click!', 0, 0);
  ctx.restore();

  // Nombre bajo la foto
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.roundRect(50, 885, 725, 185, 18);
  ctx.fill();
  ctx.font = `500 104px ${NAME_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CARD_PINK;
  ctx.fillText('Romina', 412, 980);
}

function useCardTexture(baseMap) {
  const [cardTexture, setCardTexture] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let created;
    Promise.all([document.fonts.load(`700 64px ${CARD_FONT}`), document.fonts.load(`500 104px ${NAME_FONT}`)])
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        const img = baseMap.image;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        drawCard(canvas.getContext('2d'), img);
        created = new THREE.CanvasTexture(canvas);
        created.flipY = baseMap.flipY;
        created.colorSpace = baseMap.colorSpace;
        setCardTexture(created);
      });
    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [baseMap]);

  return cardTexture;
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  // Carga los archivos usando rutas absolutas desde public/
  const { nodes, materials } = useGLTF('/assets/lanyard/card.glb');
  const texture = useTexture('/assets/lanyard/lanyard.png');
  const cardTexture = useCardTexture(materials.base.map);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(STACKED_LAYOUT_QUERY).matches);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
      setIsMobile(window.matchMedia(STACKED_LAYOUT_QUERY).matches);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const xOffset = isMobile ? 0 : 2; // en celular la tarjeta va centrada debajo del texto

  return (
    <>
      <group position={[xOffset, 4.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}

            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}

          >
            {cardTexture && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardTexture}
                  map-anisotropy={16}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={0.8}
        />
      </mesh>
    </>
  );
}
