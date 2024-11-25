import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import { SliverText } from "../ui/silver-text";
import { useState } from "react";
import { auth } from "@/firebaseConfig"; // Adjust this import path based on your firebase config file location
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Assuming you're using Firestore

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setError("");
            setLoading(true);
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in user:", userCredential.user);

            // Retrieve user role from Firestore (assuming the role is stored in a 'users' collection)
            const userRef = doc(db, "users", userCredential.user.uid); // Adjust collection name as needed
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userRole = userDoc.data()?.role; // Assuming 'role' field exists in the user document

                // Redirect based on user role
                if (userRole === "admin") {
                    navigate("/roles"); // Redirect to roles page for admins
                } else if (userRole === "moderator") {
                    navigate("/home2"); // Redirect to home2 page for moderators
                } else {
                    navigate("/"); // Default redirect for other users
                }
            } else {
                setError("User role not found");
            }
        } catch (error) {
            console.error("Login error:", error);
            switch (error.code) {
                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;
                case "auth/user-disabled":
                    setError("This account has been disabled");
                    break;
                case "auth/user-not-found":
                    setError("No account found with this email");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password");
                    break;
                default:
                    setError("Failed to log in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
            <Nav />
            <div className="max-w-[1700px] mx-auto text-center items-center justify-center relative xl:px-[80px] mt-0 sm:px-[40px] px-4 min-h-[calc(100vh-60px)] flex flex-col h-full">
                <SliverText className="text-4xl font-bold">Login</SliverText>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mt-4 max-w-[600px] w-full">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="flex flex-col space-y-4 mt-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-mono text-[20px] mb-1">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-mono text-[20px] mb-1">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="mr-2"
                                disabled={loading}
                            />
                            <label htmlFor="rememberMe" className="font-mono text-[16px]">
                                Remember Me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="text-emerald-500 font-mono text-[16px] hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            name="LoginBtn"
                            disabled={loading}
                            className={`transition-all py-2 text-[16px] px-10 font-sans font-semibold rounded-md shadow-[0px_0px_20px_#05966988] bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white hover:from-neutral-300 hover:to-neutral-400 hover:text-black ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <button
                            name="ResetBtn"
                            type="reset"
                            disabled={loading}
                            className="text-neutral-200 bg-gray-500 active:scale-100 transition-all bg-gradient-to-tr from-gray-600 to-gray-700 py-2 text-[16px] px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black shadow-[0px_0px_20px_#6b728088]"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="mt-6">
                        <p className="font-mono text-[16px]">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-emerald-500 hover:underline"
                            >
                                Register here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}
