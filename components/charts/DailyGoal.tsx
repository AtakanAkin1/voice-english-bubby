import { Card, CardContent } from "@/components/ui/card";
import {Progress} from "@radix-ui/react-progress";


export function DailyGoal() {
    return (
        <Card className="rounded-xl">
            <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                    <div>
                        <h3 className="font-semibold">Daily Goal</h3>
                        <p className="text-sm text-muted-foreground">
                            Speak for 45 minutes today
                        </p>
                    </div>
                    <span className="font-semibold text-lg">75%</span>
                </div>

                <Progress value={75} />
            </CardContent>
        </Card>
    );
}
