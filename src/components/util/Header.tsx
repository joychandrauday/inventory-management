import { useEffect, useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString(); // hh:mm:ss AM/PM
            setCurrentTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="bg-blue-700 text-white p-3 sm:p-4 flex justify-between items-center shadow-md">
            <h2 className="text-lg sm:text-xl font-bold select-none">
                📦 Product Inventory Management
            </h2>
            <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Notification Bell */}
                <button
                    aria-label="Notifications"
                    className="relative group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full"
                >
                    <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-blue-300 transition" />
                    {/* Notification badge */}
                    <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </button>

                {/* Current Time */}
                <div className="font-mono text-xs sm:text-sm select-none whitespace-nowrap">
                    {currentTime}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Hide user name on small screens */}
                    <div className="text-xs sm:text-sm select-none hidden sm:block">
                        User: <strong>Admin</strong>
                    </div>

                    {/* Dummy Avatar */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
