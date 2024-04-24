import React, { useContext, createContext, useState, useEffect } from "react";
import useRefreshToken from "./refresh";

type AuthStateType = {
    access_token: string | null;
    role: string | null;
    user_id?: string;
}

type AuthContextType = {
    authState: AuthStateType | null;
    setAuthState: React.Dispatch<React.SetStateAction<AuthStateType | null>>
    logout: () => void;
    getAccessToken: () => void;
    authInitialized: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

const { Provider } = AuthContext;
interface ProviderProps {
    children: React.ReactNode;
}

const AuthProvider = (props: ProviderProps) => {
    const [authState, setAuthState] = useState<AuthStateType | null>(null)
    const logout = () => {
        setAuthState(null);
    }
    const getAccessToken = () => {
        return authState?.access_token;
    }
    const [authInitialized, setAuthInitialized] = useState<boolean>(false);
    const useProtectedRoute = () => {
        const refresh = useRefreshToken();
        useEffect(() => {
            async function authenticate() {
                try {
                    const auth = await refresh()
                    setAuthState(auth)
                } catch (error) {
                    console.error(error);
                    setAuthState(null);
                }
            }
            authenticate();
        }, [])
    }
    useProtectedRoute();

    return (
        <Provider
            value={{ authState, setAuthState, logout, getAccessToken, authInitialized }}>
            {props.children}
        </Provider>
    )
}

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within AuthContextProvider");
    }
    return authContext;

}

export default AuthProvider;


