import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from "antd";
import Swal from 'sweetalert2'; // Pop-up de succès ou d'erreur

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // État pour gérer les erreurs

    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rafraîchissement de la page

        // Préparation des données à envoyer au backend
        const userData = {
            firstName,
            secondName,
            email,
            password
        };

        try {
            // Envoi de la requête POST au backend
            const response = await fetch('http://syndicmanager-production.up.railway.app:9010/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json(); // Récupération de l'objet ApiError

            if (response.ok) {
                // Cas de succès (code 201)
                await Swal.fire({
                    title: 'Succès',
                    text: data.text || "Inscription réussie. Bienvenue !",
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setError(''); // Effacer les erreurs en cas de succès
            } else if (response.status === 409) {
                // Cas de conflit (e-mail déjà utilisé)
                setError(data.text || "L'adresse e-mail est déjà utilisée.");
            } else {
                // Cas d'échec général
                await Swal.fire({
                    title: 'Erreur',
                    text: data.text || "Quelque chose s'est mal passé.",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setError('');
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données : ", error);
            await Swal.fire({
                title: 'Erreur',
                text: "Une erreur est survenue lors de la communication avec le serveur.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">Inscription</h1>
                    <p className="text-gray-600 mt-2">Rejoignez SyndicatManager</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} // Mise à jour de l'état
                            />
                        </div>
                        <div className="space-y-2">
                            <Form.Label htmlFor="secondName" className="text-sm font-medium text-gray-700">
                                Nom
                            </Form.Label>
                            <Input
                                id="secondName"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)} // Mise à jour de l'état
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Affichage de l'erreur */}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
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
                            <a href="/login" className="text-blue-600 hover:underline">
                                conditions d'utilisation
                            </a>{' '}
                            et la{' '}
                            <a href="/login" className="text-blue-600 hover:underline">
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
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
