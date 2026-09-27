import type { Project } from '../data/profile'

// Procedural cover art for project cards, so no screenshots are needed.
export default function ProjectArt({ kind }: { kind: Project['art'] }) {
  if (kind === 'json') {
    return (
      <pre className="art art-code" aria-hidden>
        <span className="t-p">{'{'}</span>
        {'\n  '}<span className="t-k">"name"</span>: <span className="t-s">"Jsonify"</span>,
        {'\n  '}<span className="t-k">"offline"</span>: <span className="t-n">true</span>,
        {'\n  '}<span className="t-k">"themes"</span>: <span className="t-n">8</span>,
        {'\n  '}<span className="t-k">"tools"</span>: [<span className="t-s">"diff"</span>, <span className="t-s">"query"</span>, <span className="t-s">"mask"</span>]
        {'\n'}<span className="t-p">{'}'}</span>
      </pre>
    )
  }
  if (kind === 'saas') {
    const bars = [40, 65, 52, 80, 70, 92, 60, 85]
    return (
      <div className="art art-dash" aria-hidden>
        <div className="dash-tiles">
          {['Tenants', 'Users', 'Uptime'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="dash-bars">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    )
  }
  // Neural-net style node graph.
  const layers = [3, 5, 5, 2]
  const nodes = layers.flatMap((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: 30 + li * 80, y: 100 + (i - (n - 1) / 2) * 32, li })),
  )
  return (
    <svg className="art art-graph" viewBox="0 0 300 200" aria-hidden>
      {nodes.map((a, i) =>
        nodes
          .filter((b) => b.li === a.li + 1)
          .map((b, j) => <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />),
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={5} />
      ))}
    </svg>
  )
}
