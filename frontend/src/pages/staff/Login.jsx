import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

export default function StaffLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await api.post("/auth/login", { email, password });
            localStorage.setItem("staff_token", data.access_token);
            // Handle role from backend response
            const responseRole = data.role || "doctor"; // Fallback
            localStorage.setItem("user_role", responseRole);
            if (data.name) localStorage.setItem("user_name", data.name);

            if (responseRole === "admin") {
                navigate("/staff/admin-dashboard");
            } else {
                navigate("/staff/dashboard");
            }
        } catch (err) {
            setError("Invalid Request or Credentials");
            console.error(err);
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Staff Login</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">{error}</div>}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Employee ID
                            </label>
                            <Input
                                type="text"
                                placeholder="e.g. admin or nurse"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Role Selector Removed - Handled by Backend */}
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
