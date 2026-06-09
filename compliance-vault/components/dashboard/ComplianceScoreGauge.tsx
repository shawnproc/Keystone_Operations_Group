'use client'

interface ComplianceScoreGaugeProps {
  score: number
}

export function ComplianceScoreGauge({ score }: ComplianceScoreGaugeProps) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75
  const startAngle = -225

  const color =
    score >= 80 ? '#10b981' :
    score >= 60 ? '#f59e0b' :
    '#ef4444'

  const label =
    score >= 80 ? 'Strong' :
    score >= 60 ? 'Fair' :
    'Needs Attention'

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="160" height="120" viewBox="0 0 160 120">
        {/* Background arc */}
        <circle
          cx="80" cy="90" r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
          transform={`rotate(${startAngle}, 80, 90)`}
        />
        {/* Score arc */}
        <circle
          cx="80" cy="90" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75 * (score / 100)} ${circumference - circumference * 0.75 * (score / 100)}`}
          strokeLinecap="round"
          transform={`rotate(${startAngle}, 80, 90)`}
          style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
        />
        {/* Score text */}
        <text x="80" y="86" textAnchor="middle" className="text-2xl font-bold" fill="#0f172a" fontSize="28" fontWeight="700">
          {score}
        </text>
        <text x="80" y="104" textAnchor="middle" fill="#94a3b8" fontSize="11">
          / 100
        </text>
      </svg>
      <div className="text-center -mt-2">
        <p className="text-lg font-bold" style={{ color }}>{label}</p>
        <p className="text-xs text-slate-500">Compliance Score</p>
      </div>
    </div>
  )
}
