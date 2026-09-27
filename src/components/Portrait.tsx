import { useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'
import useInView from './useInView'

// Eye centres in portrait.webp pixel coordinates (1024x1536, origin top-left).
const IMAGE_SIZE = new THREE.Vector2(1024, 1536)
const EYES = [new THREE.Vector2(457, 296), new THREE.Vector2(561, 293)]
// Half-size of the warp ellipse around each eye, and how far the irises may travel (image pixels).
const EYE_RADIUS = new THREE.Vector2(28, 18)
const MAX_SHIFT = new THREE.Vector2(7, 3)

// Mouse position in viewport pixels, tracked across the whole page.
const mouse = { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 }

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uSize;
  uniform vec2 uEyeRadius;
  uniform vec2 uEyeL;
  uniform vec2 uEyeR;
  uniform vec2 uShift;
  uniform vec2 uLight;   // unit direction (uv space) from the face toward the cursor
  varying vec2 vUv;

  const vec3 LILAC = vec3(0.72, 0.62, 1.0);

  // Liquify-style warp: inside an ellipse around each eye, sample from an offset
  // so the iris moves; weight ~1 over the iris, 0 at the eye corners.
  float eyeWeight(vec2 p, vec2 eye) {
    vec2 d = (p - eye) / uEyeRadius;
    return 1.0 - smoothstep(0.4, 1.0, length(d));
  }

  vec2 warp(vec2 uv) {
    vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
    float w = max(eyeWeight(p, uEyeL), eyeWeight(p, uEyeR));
    p -= uShift * w;
    return vec2(p.x / uSize.x, 1.0 - p.y / uSize.y);
  }

  void main() {
    vec4 tex = texture2D(uMap, warp(vUv));
    vec3 col = tex.rgb;

    // Gentle brightening on the side of the face nearest the cursor.
    vec2 fromCenter = vUv - vec2(0.5, 0.78);
    col *= 1.0 + 0.08 * dot(normalize(fromCenter + 1e-4), uLight) * smoothstep(0.0, 0.3, length(fromCenter));

    // Soft lilac rim light on the cursor side.
    float ahead = 0.0;
    for (int i = 1; i <= 4; i++) ahead += texture2D(uMap, vUv + uLight * 0.004 * float(i)).a;
    float rim = tex.a * (1.0 - ahead / 4.0);
    col = mix(col, LILAC, rim * 0.35);

    float alpha = tex.a;

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`

function Face({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  const map = useTexture('/portrait.webp')
  map.colorSpace = THREE.SRGBColorSpace
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uSize: { value: IMAGE_SIZE },
      uEyeRadius: { value: EYE_RADIUS },
      uEyeL: { value: EYES[0] },
      uEyeR: { value: EYES[1] },
      uShift: { value: new THREE.Vector2() },
      uLight: { value: new THREE.Vector2(-0.7, 0.7) },
    }),
    [map],
  )
  const shiftTarget = useMemo(() => new THREE.Vector2(), [])
  const lightTarget = useMemo(() => new THREE.Vector2(), [])

  useFrame((_, delta) => {
    const el = container.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Screen position of the midpoint between the eyes.
    const ex = rect.left + ((EYES[0].x + EYES[1].x) / 2 / IMAGE_SIZE.x) * rect.width
    const ey = rect.top + ((EYES[0].y + EYES[1].y) / 2 / IMAGE_SIZE.y) * rect.height
    const dx = mouse.x - ex
    const dy = mouse.y - ey
    const dist = Math.hypot(dx, dy)
    // Full deflection once the cursor is ~half a portrait width away.
    const k = Math.min(dist / (rect.width * 0.6), 1) / (dist || 1)
    shiftTarget.set(dx * k * MAX_SHIFT.x, dy * k * MAX_SHIFT.y)
    easing.damp2(uniforms.uShift.value, shiftTarget, 0.12, delta)

    // uv space has y pointing up, screen space has y pointing down.
    lightTarget.set(dx, -dy).normalize()
    easing.damp2(uniforms.uLight.value, lightTarget, 0.3, delta)
    uniforms.uLight.value.normalize()

    // Subtle parallax toward the cursor.
    const tx = Math.max(-1, Math.min(1, dx / window.innerWidth))
    const ty = Math.max(-1, Math.min(1, dy / window.innerHeight))
    el.style.transform = `translate3d(${tx * 8}px, ${ty * 5}px, 0)`
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent />
    </mesh>
  )
}

export default function Portrait() {
  const [container, inView] = useInView<HTMLDivElement>()

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
      <Canvas frameloop={inView ? 'always' : 'never'} orthographic camera={{ position: [0, 0, 5], zoom: 1 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <Face container={container} />
      </Canvas>
    </div>
  )
}
