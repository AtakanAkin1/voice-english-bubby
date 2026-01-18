import { Card, CardContent } from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

export function DailyGoal() {
    return (
        <Card className="rounded-xl h-full flex flex-col">
            <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                    <div>
                        <h3 className="font-semibold">Daily Goal</h3>
                        <p className="text-sm text-muted-foreground">
                            Speak for 45 minutes today
                        </p>
                    </div>
                    <span className="font-semibold text-xl text-[#4c78fa]">75%</span>
                </div>
                <Progress
                    value={75}
                    className="h-[10px] mt-4 bg-muted [&>div]:bg-[#4c78fa]"
                />
            </CardContent>
        </Card>
    );
}
