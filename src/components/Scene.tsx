import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Scroll progress 0..1, read inside the render loop without re-rendering React.
function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? window.scrollY / max : 0
}

function Blob() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    const p = scrollProgress()
    mesh.current.rotation.x += delta * 0.15
    mesh.current.rotation.y += delta * 0.2
    // Swing from right to left as the page scrolls, and shrink toward the end.
    easing.damp3(mesh.current.position, [1.8 * Math.cos(p * Math.PI), -p * 1.5, -p * 2], 0.4, delta)
    easing.damp3(mesh.current.scale, 1.6 - p * 0.6, 0.4, delta)
  })
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={[1.8, 0, 0]}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial color="#6d5dfc" roughness={0.15} metalness={0.6} distort={0.45} speed={2} />
      </mesh>
    </Float>
  )
}

function Rings() {
  const group = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    group.current.rotation.z += delta * 0.1
    group.current.rotation.y = scrollProgress() * Math.PI
  })
  return (
    <group ref={group} position={[1.8, 0, -1]}>
      {[2.4, 3.1].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.4 + i * 0.5, i * 0.6, 0]}>
          <torusGeometry args={[r, 0.012, 16, 200]} />
          <meshBasicMaterial color={i ? '#22d3ee' : '#a78bfa'} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Camera follows the pointer slightly for parallax.
function Rig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.pointer.x * 0.6, state.pointer.y * 0.4, 6], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <div className="scene">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#07070d']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={40} color="#22d3ee" />
        <Stars radius={60} depth={40} count={4000} factor={3} fade speed={0.6} />
        <Sparkles count={80} scale={10} size={2} speed={0.3} color="#a78bfa" />
        <Blob />
        <Rings />
        <Rig />
      </Canvas>
    </div>
  )
}
