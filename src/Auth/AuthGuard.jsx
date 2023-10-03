import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            navigate("/login");
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    return isLoggedIn ? children : null;
};
export default AuthGuard;
