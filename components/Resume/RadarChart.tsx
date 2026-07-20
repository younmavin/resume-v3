'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const discData = [
  { subject: 'D (주도형)', value: 85 },
  { subject: 'I (사교형)', value: 90 },
  { subject: 'S (안정형)', value: 70 },
  { subject: 'C (신중형)', value: 80 },
]

const ncsData = [
  { subject: '성실성', value: 85 },
  { subject: '책임감', value: 95 },
  { subject: '대인관계', value: 90 },
  { subject: '도전정신', value: 95 },
  { subject: '조직적응력', value: 80 },
]

const PersonalityChart = () => {
  return (
    <div className="chart-wrap">
      <div className="chart-item">
        <p className="chart-tit">NCS</p>

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={ncsData}>
            <PolarGrid stroke="var(--line-color)" />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: 'var(--text-secondary)',
                fontSize: 13,
              }}
            />

            <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="line" />

      <div className="chart-item">
        <p className="chart-tit">DISC</p>

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={discData}>
            <PolarGrid stroke="var(--line-color)" />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: 'var(--text-secondary)',
                fontSize: 13,
              }}
            />

            <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PersonalityChart
