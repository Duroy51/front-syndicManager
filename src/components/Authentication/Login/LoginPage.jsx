import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppRoutesPaths} from "../../../router/appRouter";


export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)


    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">Connexion</h1>
                    <p className="text-gray-600 mt-2">Bienvenue sur SyndicManager</p>
                </div>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Form.Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Adresse e-mail
                        </Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            placeholder="vous@exemple.com"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Form.Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Mot de passe
                        </Form.Label>
                        <div className="relative">
                            <Form.Control
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <Form.Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Se souvenir de moi
                            </Form.Label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Se connecter
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous n'avez pas de compte ?{' '}
                        <a href={AppRoutesPaths.registerPage} className="font-medium text-blue-600 hover:text-blue-700">
                            S'inscrire
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}