import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <div className="flex flex-col items-center gap-4">
                <AlertTriangle className="w-20 h-20 text-red-500 animate-pulse" />
                <h1 className="text-5xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
                <Button onClick={() => navigate("/")} className="mt-4">
                    Go to Homepage
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
