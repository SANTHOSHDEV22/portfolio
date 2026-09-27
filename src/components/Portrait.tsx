import { useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'
import useInView from './useInView'

// Eye centres in portrait.webp pixel coordinates (1156x1156, origin top-left).
const IMAGE_SIZE = 1156
const EYES = [new THREE.Vector2(500, 377), new THREE.Vector2(651, 376)]
// How far the irises may travel, in image pixels.
const MAX_SHIFT = new THREE.Vector2(10, 4)

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
  uniform float uSize;
  uniform vec2 uEyeL;
  uniform vec2 uEyeR;
  uniform vec2 uShift;
  uniform vec2 uLight;   // unit direction (uv space) from the face toward the cursor
  varying vec2 vUv;

  const vec3 SHADOW = vec3(0.045, 0.035, 0.03);
  const vec3 COPPER = vec3(0.86, 0.6, 0.38);

  // Liquify-style warp: inside an ellipse around each eye, sample from an offset
  // so the iris moves; weight ~1 over the iris, 0 at the eye corners.
  float eyeWeight(vec2 p, vec2 eye) {
    vec2 d = (p - eye) / vec2(40.0, 26.0);
    return 1.0 - smoothstep(0.4, 1.0, length(d));
  }

  vec2 warp(vec2 uv) {
    vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
    float w = max(eyeWeight(p, uEyeL), eyeWeight(p, uEyeR));
    p -= uShift * w;
    return vec2(p.x / uSize, 1.0 - p.y / uSize);
  }

  void main() {
    vec4 tex = texture2D(uMap, warp(vUv));
    vec3 col = tex.rgb;

    // Warm, low-key grade so the photo sits in the dark copper palette.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 duo = mix(SHADOW, COPPER * 1.05, pow(lum, 1.15));
    col = mix(col * vec3(1.0, 0.9, 0.8), duo, 0.55) * 0.92;

    // Soft key light from the cursor side of the face.
    vec2 fromCenter = vUv - vec2(0.5, 0.62);
    col *= 1.0 + 0.25 * dot(normalize(fromCenter + 1e-4), uLight) * smoothstep(0.0, 0.35, length(fromCenter));

    // Rim light: bright where this pixel is opaque but its neighbour toward the light is not.
    // Averaging several distances gives a soft glow instead of a hard outline.
    float ahead = 0.0;
    for (int i = 1; i <= 4; i++) ahead += texture2D(uMap, vUv + uLight * 0.004 * float(i)).a;
    float rim = tex.a * (1.0 - ahead / 4.0);
    col += COPPER * rim * 0.4;

    // Melt into the background at the bottom and left edges.
    float alpha = tex.a;
    alpha *= smoothstep(0.0, 0.32, vUv.y);
    alpha *= smoothstep(0.0, 0.12, vUv.x);

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
    const ex = rect.left + ((EYES[0].x + EYES[1].x) / 2 / IMAGE_SIZE) * rect.width
    const ey = rect.top + ((EYES[0].y + EYES[1].y) / 2 / IMAGE_SIZE) * rect.height
    const dx = mouse.x - ex
    const dy = mouse.y - ey
    const dist = Math.hypot(dx, dy)
    // Full deflection once the cursor is ~half a portrait width away.
    const k = Math.min(dist / (rect.width * 0.5), 1) / (dist || 1)
    shiftTarget.set(dx * k * MAX_SHIFT.x, dy * k * MAX_SHIFT.y)
    easing.damp2(uniforms.uShift.value, shiftTarget, 0.12, delta)

    // uv space has y pointing up, screen space has y pointing down.
    lightTarget.set(dx, -dy).normalize()
    easing.damp2(uniforms.uLight.value, lightTarget, 0.3, delta)
    uniforms.uLight.value.normalize()

    // Subtle parallax toward the cursor.
    const tx = Math.max(-1, Math.min(1, dx / window.innerWidth))
    const ty = Math.max(-1, Math.min(1, dy / window.innerHeight))
    el.style.transform = `translate3d(${tx * 12}px, ${ty * 8}px, 0) perspective(1200px) rotateY(${tx * 4}deg)`
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
