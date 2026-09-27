import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import useInView from './useInView'

type Shape = 'bubble' | 'swirl' | 'ring'

function Blob({ shape }: { shape: Shape }) {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.1
    mesh.current.rotation.y += delta * 0.15 + state.pointer.x * delta * 0.2
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={mesh}>
        {shape === 'bubble' && <sphereGeometry args={[1.25, 96, 96]} />}
        {shape === 'swirl' && <torusKnotGeometry args={[0.95, 0.34, 300, 48, 2, 3]} />}
        {shape === 'ring' && <torusGeometry args={[1.1, 0.42, 64, 160]} />}
        {/* Pearly iridescent glass: thin-film colours shift as it turns. */}
        <meshPhysicalMaterial
          color="#f4f1ff"
          roughness={0.03}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[200, 1200]}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  )
}

export default function GlassBlob({ shape = 'bubble', className }: { shape?: Shape; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div className={className} ref={ref} aria-hidden>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <Blob shape={shape} />
        {/* Pastel light studio for reflections — no HDR download needed. */}
        <Environment resolution={256}>
          {/* Bright base so reflections read as pearl, not grey. */}
          <color attach="background" args={['#9d93d9']} />
          <Lightformer intensity={5} color="#ffffff" position={[0, 4, 2]} scale={[8, 2, 1]} />
          <Lightformer intensity={4} color="#c4b5fd" position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
          <Lightformer intensity={4} color="#a5f3fc" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[5, 4, 1]} />
          <Lightformer intensity={3} color="#fbcfe8" position={[0, -4, 2]} scale={[6, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}
