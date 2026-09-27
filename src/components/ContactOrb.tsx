import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import useInView from './useInView'

function Knot() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.12
    mesh.current.rotation.y += delta * 0.18 + state.pointer.x * delta * 0.3
  })
  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1, 0.3, 256, 32, 2, 3]} />
        <meshStandardMaterial color="#b77a45" metalness={1} roughness={0.22} />
      </mesh>
    </Float>
  )
}

export default function ContactOrb() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div className="contact-orb" ref={ref} aria-hidden>
      <Canvas frameloop={inView ? 'always' : 'never'} camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[-3, 2, 3]} intensity={30} color="#ffb676" />
        <Knot />
        {/* Local light studio for reflections — no HDR download needed. */}
        <Environment resolution={256}>
          <Lightformer intensity={2} color="#ffcf9e" position={[0, 4, -2]} scale={[8, 1, 1]} />
          <Lightformer intensity={1.2} color="#c8925e" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer intensity={0.6} color="#ffffff" position={[4, -1, 3]} rotation-y={-Math.PI / 2} scale={[3, 3, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}
