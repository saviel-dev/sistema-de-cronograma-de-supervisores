/**
 * Login.tsx
 * 
 * Página de inicio de sesión con diseño estilo Microsoft.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Calendar } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor, completa todos los campos');
            return;
        }

        setIsSubmitting(true);
        try {
            const success = login(username, password);
            if (success) {
                navigate('/', { replace: true });
            } else {
                setError('Usuario o contraseña incorrectos');
                setPassword('');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            {/* Toggle de tema en esquina superior derecha */}
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>

            {/* Card de login */}
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                    {/* Header con logo */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 p-6">
                        <div className="flex items-center gap-3 text-white">
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Calendar className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Panel Central</h1>
                                <p className="text-sm text-blue-100">Sistema de Cronogramas</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Iniciar sesión
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Usa tu cuenta de administrador
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Campo de usuario */}
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Usuario
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Usuario"
                                    className="w-full px-4 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
                                    autoFocus
                                />
                            </div>

                            {/* Campo de contraseña */}
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    className="w-full px-4 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Mensaje de error */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 animate-fade-in">
                                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                                </div>
                            )}

                            {/* Botón de inicio de sesión */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-600/60 disabled:to-indigo-600/60 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span>{isSubmitting ? 'INICIANDO...' : 'INICIAR SESIÓN'}</span>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>

                        {/* Credenciales de ayuda (solo para desarrollo) */}
                        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
                                Credenciales de acceso:
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                Usuario: <code className="bg-white dark:bg-gray-700 px-1 py-0.5 rounded">admin</code>
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                Contraseña: <code className="bg-white dark:bg-gray-700 px-1 py-0.5 rounded">admin123</code>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        © 2024 Panel Central - Sistema de Gestión de Cronogramas
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
