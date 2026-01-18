import {
    BarChart,
    Bar,
    XAxis,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkillBreakdownChart() {
    const skillData = [
        { name: "Pronun.", value: 80 },
        { name: "Grammar", value: 55 },
        { name: "Fluency", value: 85 },
        { name: "Vocab", value: 65 },
    ];

    return (
        <Card className="rounded-xl h-full flex flex-col">
            <CardHeader>
                <h3 className="font-semibold">Skill Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                    Level: High Fluency
                </p>
            </CardHeader>

            <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        responsive
                        data={skillData}
                    >
                        <XAxis dataKey="name" />
                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            barSize={48}
                            fill="#4c78fa"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
