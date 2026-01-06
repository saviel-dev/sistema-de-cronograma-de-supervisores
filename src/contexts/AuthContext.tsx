/**
 * AuthContext.tsx
 * 
 * Contexto de autenticación para gestionar el estado de sesión del usuario.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'panel-central-auth';
const CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    // Verificar sesión al cargar
    useEffect(() => {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                if (authData.isAuthenticated && authData.user) {
                    setIsAuthenticated(true);
                    setUser(authData.user);
                }
            } catch (error) {
                localStorage.removeItem(AUTH_KEY);
            }
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            setIsAuthenticated(true);
            setUser(username);
            localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, user: username }));
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
