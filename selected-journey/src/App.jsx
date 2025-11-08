import { useMemo, useState } from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { phases, roles, steps } from './journey'

const laneHeight = 120
const phaseGap = 240
const nodeW = 210
const nodeH = 64
const padX = 160
const padY = 80

const phaseIndex = Object.fromEntries(phases.map((phase, index) => [phase.id, index]))
const roleIndex = Object.fromEntries(roles.map((role, index) => [role.id, index]))
const rolesById = Object.fromEntries(roles.map(role => [role.id, role]))
const phasesById = Object.fromEntries(phases.map(phase => [phase.id, phase]))

export default function App() {
  const [activeRoles, setActiveRoles] = useState(() => new Set(roles.map(role => role.id)))
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)

  const roleToggle = id => {
    const next = new Set(activeRoles)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setActiveRoles(next)
  }

  const { nodes, edges } = useMemo(() => {
    const visibleSteps = steps.filter(step => activeRoles.has(step.role))

    const nodes = visibleSteps.map(step => {
      const x = padX + phaseIndex[step.phase] * phaseGap
      const y = padY + roleIndex[step.role] * laneHeight
      const role = rolesById[step.role]
      const phase = phasesById[step.phase]

      return {
        id: step.id,
        type: 'default',
        position: { x, y },
        data: { step, role, phase },
      }
    })

    const ordered = [...visibleSteps].sort((a, b) => {
      if (roleIndex[a.role] !== roleIndex[b.role]) {
        return roleIndex[a.role] - roleIndex[b.role]
      }
      if (phaseIndex[a.phase] !== phaseIndex[b.phase]) {
        return phaseIndex[a.phase] - phaseIndex[b.phase]
      }
      return 0
    })

    const edges = []
    for (let i = 0; i < ordered.length - 1; i += 1) {
      const source = ordered[i]
      const target = ordered[i + 1]
      edges.push({
        id: `e-${source.id}-${target.id}`,
        source: source.id,
        target: target.id,
        animated: phaseIndex[target.phase] >= phaseIndex[source.phase],
      })
    }

    return { nodes, edges }
  }, [activeRoles])

  return (
    <div className="app">
      <div className="toolbar">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h1>SELECTED · MVP Journey Player</h1>
          <div className="row">
            {roles.map(role => (
              <span
                key={role.id}
                className={`badge ${activeRoles.has(role.id) ? 'active' : ''}`}
                onClick={() => roleToggle(role.id)}
                title={`Toggle ${role.name}`}
                style={{ borderColor: role.color }}
              >
                ● {role.name}
              </span>
            ))}
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          {phases.map(phase => (
            <span key={phase.id} className="badge" style={{ borderColor: phase.color }}>
              <span className="phase-dot" style={{ background: phase.color }} />
              {phase.name}
            </span>
          ))}
        </div>
      </div>

      <div className="legend">
        <div className="row">
          <span className="small">Badges:</span>
          <span className="badge">Trust</span>
          <span className="badge">24h</span>
          <span className="badge">48h</span>
          <span className="badge">AI</span>
          <span className="small" style={{ marginLeft: 12 }}>
            — hover a node for details, click for side panel
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: 12, border: '1px solid #1f2b47', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes.map(node => ({
            ...node,
            style: {
              width: nodeW,
              height: nodeH,
              background: '#101a33',
              border: `1px solid ${node.data.phase.color}`,
              borderRadius: 12,
              padding: 8,
              color: '#e9eefb',
            },
            data: {
              ...node.data,
              label: (
                <NodeCard
                  step={node.data.step}
                  phase={node.data.phase}
                  role={node.data.role}
                  onHover={open => setHover(open ? node.data.step : null)}
                  onClick={() => setSelected(node.data.step)}
                />
              ),
            },
          }))}
          edges={edges.map(edge => ({
            ...edge,
            style: { stroke: '#2a3b66' },
            markerEnd: { type: 'arrowclosed', color: '#2a3b66' },
          }))}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          {roles.map(role => (
            <Lane key={role.id} y={padY + roleIndex[role.id] * laneHeight - 20} label={role.name} color={role.color} />
          ))}
          {phases.map((phase, index) => (
            <PhaseHeader key={phase.id} x={padX + index * phaseGap} label={phase.name} color={phase.color} />
          ))}
          <Background gap={24} color="#1e2b4f" />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable nodeColor={() => '#2a3b66'} maskColor="rgba(11,18,32,.8)" />
        </ReactFlow>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="sidepanel"
              style={{ right: 16, top: 130 }}
            >
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{hover.label}</div>
              <div className="small" style={{ marginBottom: 8 }}>
                {hover.desc}
              </div>
              {hover.badge && (
                <div className="badge" style={{ display: 'inline-block' }}>
                  {hover.badge}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="sidepanel"
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{selected.label}</div>
              <div className="small" style={{ marginBottom: 10 }}>
                {selected.desc}
              </div>
              <ul className="small" style={{ paddingLeft: 18, lineHeight: 1.5 }}>
                <li>Phase: {phasesById[selected.phase].name}</li>
                <li>Role: {rolesById[selected.role].name}</li>
                <li>Events: {eventHint(selected)}</li>
              </ul>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginTop: 8,
                  background: '#213457',
                  color: '#e9eefb',
                  border: '1px solid #2a4a80',
                  borderRadius: 8,
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function NodeCard({ step, role, phase, onHover, onClick }) {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 8,
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer',
      }}
      title={step.desc}
    >
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: role.color }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.1 }}>{step.label}</div>
        <div style={{ fontSize: 11, color: '#98a7cc' }}>{role.name}</div>
      </div>
      <span
        style={{
          fontSize: 10,
          color: phase.color,
          border: `1px solid ${phase.color}`,
          padding: '2px 6px',
          borderRadius: 999,
        }}
      >
        {phase.name}
      </span>
    </div>
  )
}

function Lane({ y, label, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 8,
        top: y,
        height: 1,
        width: 'calc(100% - 16px)',
        borderTop: '1px dashed #2a3b66',
      }}
    >
      <span style={{ position: 'absolute', left: 8, top: -10, fontSize: 12, color }}>{label}</span>
    </div>
  )
}

function PhaseHeader({ x, label, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        left: x,
        transform: 'translateX(-50%)',
        background: '#0f1629',
        border: `1px solid ${color}`,
        color,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
      }}
    >
      {label}
    </div>
  )
}

function eventHint(step) {
  switch (step.phase) {
    case 'sl':
      return 'shortlist.dropped'
    case 'p1':
      return step.badge === '24h' ? 'timer.started (24h), timer.expiring' : 'application.submitted'
    case 'p2':
      return 'decision.requested, compare.recommended'
    case 'off':
      return step.label.includes('Accept') ? 'offer.accepted → match.committed' : 'offer.sent'
    case 'hov':
      return 'handover.started / handover.completed'
    default:
      return '—'
  }
}

export { eventHint }
