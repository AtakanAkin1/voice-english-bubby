"use client"

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"

export function RadialProgress({
                                   value,
                                   max = 100,
                               }: {
    value: number
    max?: number
}) {
    const percent = (value / max) * 100

    const data = [
        {
            name: "Progress",
            value: percent,
            fill: "#4c78fa",
        },
    ]

    return (
        <div className="relative flex items-center justify-center">
            <RadialBarChart
                width={200}
                height={200}
                cx={100}
                cy={100}
                innerRadius={80}
                outerRadius={100}
                barSize={15}
                startAngle={90}
                endAngle={-270}
                data={data}
            >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} />
            </RadialBarChart>

            <div className="absolute flex flex-col items-center">
                <span className="font-inter text-2xl">{value}</span>
                <span className="text-sm text-gray-400">Visitors</span>
            </div>
        </div>
    )
}
