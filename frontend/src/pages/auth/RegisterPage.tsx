import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        // Redirect to login page which now handles both sign in and sign up
        navigate(`/login${search}`, { replace: true });
    }, [navigate, search]);

    return null;
};

export default RegisterPage;
