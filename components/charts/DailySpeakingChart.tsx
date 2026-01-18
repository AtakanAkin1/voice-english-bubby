import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DailySpeakingChart() {
    const speakingData = [
        { day: "Mon", minutes: 28 },
        { day: "Tue", minutes: 35 },
        { day: "Wed", minutes: 30 },
        { day: "Thu", minutes: 33 },
        { day: "Fri", minutes: 20 },
        { day: "Sat", minutes: 45 },
        { day: "Sun", minutes: 38 },
    ];

    return (
        <Card className="rounded-xl h-full flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">Daily Speaking Activity</h3>
                        <p className="text-sm text-muted-foreground">
                            Average 32m / day
                        </p>
                    </div>

                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
            ↑ 10% vs last week
          </span>
                </div>
            </CardHeader>

            <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={speakingData}>
                        <XAxis dataKey="day" />
                        <YAxis hide />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="minutes"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
