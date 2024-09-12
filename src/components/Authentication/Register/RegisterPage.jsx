import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from "antd";
import {AppRoutesPaths} from "../../../router/appRouter";

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">Inscription</h1>
                    <p className="text-gray-600 mt-2">Rejoignez GestionSyndicat</p>
                </div>
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Form.Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                Prénom
                            </Form.Label>
                            <Input
                                id="firstName"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Form.Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                Nom
                            </Form.Label>
                            <Input
                                id="lastName"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Form.Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Adresse e-mail
                        </Form.Label>
                        <Input
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
                            <Input
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
                    <div className="flex items-center space-x-2">
                        <Form.Check id="terms" />
                        <Form.Label htmlFor="terms" className="text-sm text-gray-600">
                            J'accepte les{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                conditions d'utilisation
                            </a>{' '}
                            et la{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                politique de confidentialité
                            </a>
                        </Form.Label>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        S'inscrire
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <a href={AppRoutesPaths.loginPage} className="font-medium text-blue-600 hover:text-blue-700">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}