import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Eye centres in portrait.jpg pixel coordinates (900x900 image, origin top-left).
const IMAGE_SIZE = 900
const EYES = [new THREE.Vector2(372, 337), new THREE.Vector2(523, 336)]
// How far the irises may travel, in image pixels.
const MAX_SHIFT = new THREE.Vector2(10, 4)

// Mouse position in viewport pixels, tracked across the whole page.
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 3 }

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Liquify-style warp: inside an ellipse around each eye, sample the texture from
// an offset position so the iris appears to move. The weight stays ~1 over the
// iris and falls to 0 toward the eye corners, so the eyelids stay anchored.
const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uSize;
  uniform vec2 uEyeL;
  uniform vec2 uEyeR;
  uniform vec2 uShift;
  varying vec2 vUv;

  float eyeWeight(vec2 p, vec2 eye) {
    vec2 d = (p - eye) / vec2(40.0, 26.0);
    return 1.0 - smoothstep(0.4, 1.0, length(d));
  }

  void main() {
    vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
    float w = max(eyeWeight(p, uEyeL), eyeWeight(p, uEyeR));
    p -= uShift * w;
    vec2 uv = vec2(p.x / uSize, 1.0 - p.y / uSize);

    // Circular crop with a soft edge.
    float r = length(vUv - 0.5);
    float alpha = 1.0 - smoothstep(0.495, 0.5, r);
    gl_FragColor = vec4(texture2D(uMap, uv).rgb, alpha);
    #include <colorspace_fragment>
  }
`

function Face({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  const map = useTexture('/portrait.jpg')
  map.colorSpace = THREE.SRGBColorSpace
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uSize: { value: IMAGE_SIZE },
      uEyeL: { value: EYES[0] },
      uEyeR: { value: EYES[1] },
      uShift: { value: new THREE.Vector2() },
    }),
    [map],
  )
  const target = useMemo(() => new THREE.Vector2(), [])

  useFrame((_, delta) => {
    const el = container.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Screen position of the midpoint between the eyes.
    const ex = rect.left + (((EYES[0].x + EYES[1].x) / 2) / IMAGE_SIZE) * rect.width
    const ey = rect.top + (((EYES[0].y + EYES[1].y) / 2) / IMAGE_SIZE) * rect.height
    const dx = mouse.x - ex
    const dy = mouse.y - ey
    const dist = Math.hypot(dx, dy)
    // Full deflection once the cursor is ~1.5 portrait widths away.
    const k = Math.min(dist / (rect.width * 1.5), 1) / (dist || 1)
    target.set(dx * k * MAX_SHIFT.x, dy * k * MAX_SHIFT.y)
    easing.damp2(uniforms.uShift.value, target, 0.12, delta)

    // Tilt the whole portrait slightly toward the cursor.
    const tx = Math.max(-1, Math.min(1, dx / window.innerWidth))
    const ty = Math.max(-1, Math.min(1, dy / window.innerHeight))
    el.style.transform = `perspective(900px) rotateY(${tx * 12}deg) rotateX(${-ty * 10}deg)`
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  )
}

export default function Portrait() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="portrait" ref={container}>
      <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 1 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <Face container={container} />
      </Canvas>
    </div>
  )
}
