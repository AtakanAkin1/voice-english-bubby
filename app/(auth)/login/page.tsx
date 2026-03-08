"use client"
import React, {useState} from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {toast} from "sonner";
import {loginUser} from "@/lib/auth/loginUser";
import {useRouter} from "next/navigation";

const Login =  () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const submitForm = async () => {
        if (!email) {
            toast.error("Please enter a valid email address");
            return;
        }
        if(!password) {
            toast.error("Please enter a password");
            return;
        }
        setLoading(true);
        const result = await loginUser(email, password);
        if(!result.success){
            setLoading(false);
            toast.error(result.message);
            return;
        }
        else{
            router.push("/");
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="font-inter text-xl font-bold">
                Welcome back again <span className="text-2xl pl-2">👋</span>
            </h3>
            <span className="font-inter text-muted-foreground">
                Continue your English journey from where you left off
            </span>

            <Card className="w-full max-w-sm mt-5">
                <CardHeader></CardHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        void submitForm();
                    }}
                >
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        {/*<Button variant="outline" className="w-full">*/}
                        {/*    Login with Google*/}
                        {/*</Button>*/}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;