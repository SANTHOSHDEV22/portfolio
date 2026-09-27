import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'

// Scroll progress 0..1, read inside the render loop without re-rendering React.
function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? window.scrollY / max : 0
}

// Warm dust drifting slowly upward.
function Dust({ count = 900 }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * 0.08
      if (y > 7) y = -7
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    points.current.rotation.y = scrollProgress() * 0.6
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#d9a36f" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// Thin orbital rings echoing the hero's circular motif.
function Orbits() {
  const group = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    const p = scrollProgress()
    group.current.rotation.z += delta * 0.03
    easing.damp3(group.current.position, [2.6, 0.6 + p * 6, -2], 0.5, delta)
  })
  return (
    <group ref={group} position={[2.6, 0.6, -2]}>
      {[2.6, 3.4, 4.3].map((r, i) => (
        <mesh key={r} rotation={[0.2 * i, 0.3 * i, 0]}>
          <torusGeometry args={[r, 0.004, 8, 256]} />
          <meshBasicMaterial color="#c8925e" transparent opacity={0.25 - i * 0.05} />
        </mesh>
      ))}
    </group>
  )
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.pointer.x * 0.4, state.pointer.y * 0.25, 7], 0.6, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Dust />
        <Orbits />
        <Rig />
      </Canvas>
    </div>
  )
}
