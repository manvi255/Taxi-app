import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast"; // For a real toast system

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <AuthForm
            title="Welcome Back 🚖"
            footer={
                <>
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Signup here</Link>
                </>
            }
        >
            {error && <Toast message={error} type="error" />}
            <Input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-6" />
            <Button onClick={handleLogin} className="w-full">Login</Button>
        </AuthForm>
    );
}

export default Login;