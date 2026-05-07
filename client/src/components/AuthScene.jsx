import { Environment, Float, MeshTransmissionMaterial, RoundedBox, Text, PresentationControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export function AuthScene() {
  const cubeRef = useRef(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.1;
      cubeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#ffffff" />

      <Environment preset="city" />

      <group position={[0, 0, -4]}>
        <Text
          fontSize={isMobile ? 2.0 : 3.2}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
          fontWeight={900}
          letterSpacing={-0.05}
          lineHeight={0.85}
          textAlign="center"
          color="#f4f4f4"
          position={[0, 0.2, 0]}
          anchorX="center"
          anchorY="middle"
        >
          {`Find\nYour\nRole`}
        </Text>
      </group>

      <PresentationControls
        global={true}
        cursor={true}
        config={{ mass: 2, tension: 500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 2, Math.PI / 2]}
        azimuth={[-Math.PI, Math.PI]}
      >
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <RoundedBox
            ref={cubeRef}
            args={isMobile ? [2.5, 2.5, 2.5] : [3.5, 3.5, 3.5]}
            radius={0.1}
            smoothness={5}
          >
            <MeshTransmissionMaterial
              backside
              backsideThickness={1.5}
              samples={8}
              resolution={1024}
              thickness={3.5}
              chromaticAberration={0.04}
              anisotropy={0.1}
              distortion={0.15}
              distortionScale={0.3}
              temporalDistortion={0.0}
              iridescence={0}
              clearcoat={1}
              clearcoatRoughness={0.1}
              roughness={0.05}
              ior={1.45}
              color="#ffffff"
              transmission={1}
            />
          </RoundedBox>
        </Float>
      </PresentationControls>
    </>
  );
}