import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import useInView from './useInView'

// Evenly distribute points on a sphere (Fibonacci lattice).
function spherePoints(n: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
  })
}

const parentQuat = new THREE.Quaternion()

function Word({ text, position }: { text: string; position: THREE.Vector3 }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<THREE.Object3D>(null!)
  // Face the camera regardless of how the parent group is rotated.
  useFrame(({ camera }) => {
    ref.current.parent!.getWorldQuaternion(parentQuat)
    ref.current.quaternion.copy(parentQuat.invert().multiply(camera.quaternion))
  })
  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.26}
        color={hovered ? '#e0a870' : '#e9dfd3'}
        anchorX="center"
        anchorY="middle"
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
      >
        {text}
      </Text>
    </group>
  )
}

function Cloud({ words }: { words: string[] }) {
  const group = useRef<THREE.Group>(null!)
  const points = useMemo(() => spherePoints(words.length, 2.5), [words.length])
  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.15 + state.pointer.x * delta * 0.5
    group.current.rotation.x += state.pointer.y * delta * 0.3
  })
  return (
    <group ref={group}>
      {words.map((w, i) => (
        <Word key={w} text={w} position={points[i]} />
      ))}
    </group>
  )
}

export default function SkillsSphere({ skills }: { skills: string[] }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div className="skills-canvas" ref={ref}>
      <Canvas frameloop={inView ? 'always' : 'never'} camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
        <Cloud words={skills} />
      </Canvas>
    </div>
  )
}
