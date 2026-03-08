import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firabase/firebase";

export async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            user: userCredential.user
        };

    } catch (error: any) {

        let message = "Login failed";

        if (error.code === "auth/invalid-credential") {
            message = "Email or password is incorrect";
        }

        if (error.code === "auth/user-not-found") {
            message = "User not found";
        }

        if (error.code === "auth/wrong-password") {
            message = "Wrong password";
        }

        return {
            success: false,
            message
        };
    }
}