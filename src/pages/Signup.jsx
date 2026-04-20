import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast"; // For a real toast system

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // For a real app, use a toast notification here
            // alert("Signup successful!");
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthForm
            title="Create Account"
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login here</Link>
                </>
            }
        >
            {error && <Toast message={error} type="error" />}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-6" />
            <Button onClick={handleSignup} className="w-full">Signup</Button>
        </AuthForm>
    );
}

export default Signup;