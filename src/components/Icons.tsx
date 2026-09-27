import type { SVGProps } from 'react'

// Minimal 24px line icons (stroke uses currentColor).
const paths = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17L17 7M8 7h9v9',
  download: 'M12 4v11m0 0l-4-4m4 4l4-4M5 20h14',
  check: 'M20 6L9 17l-5-5',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  web: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',
  api: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16',
  desktop: 'M3 4h18v12H3zM8 20h8M12 16v4',
  cloud: 'M7 18a4.5 4.5 0 01-.5-9 6 6 0 0111.6 1.5A3.8 3.8 0 0117.5 18z',
  briefcase: 'M3 8h18v11H3zM8 8V5h8v3M3 13h18',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  cpu: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
  commit: 'M12 8a4 4 0 100 8 4 4 0 000-8zM2 12h6M16 12h6',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  factory: 'M3 21V10l5 3.5V10l5 3.5V5h4l1 8h3v8zM3 21h18M7 17h2M12 17h2M17 17h2',
  award: 'M12 15a6 6 0 100-12 6 6 0 000 12zM8.5 14L7 22l5-3 5 3-1.5-8',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin: 'M4 9h4v11H4zM6 4.5a2 2 0 110 4 2 2 0 010-4zM11 9h3.8v1.6c.6-1 1.9-1.9 3.7-1.9 3.3 0 3.5 2.2 3.5 5V20h-4v-5.1c0-1.3-.1-2.7-1.8-2.7-1.8 0-2.2 1.3-2.2 2.6V20h-3z',
  quote: 'M7 7H4v6h3l-2 4M17 7h-3v6h3l-2 4',
} as const

export type IconName = keyof typeof paths

export default function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}
