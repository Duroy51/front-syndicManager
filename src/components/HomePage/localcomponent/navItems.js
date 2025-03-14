import {Compass, Home, Settings, Users} from "lucide-react";

export const navItems = [
    {
        id: "dashboard",
        icon: Home,
        label: "Accueil",
        gradient: "from-blue-500 to-indigo-600",
        description: "Actualité",
    },
    {
        id: "syndicats",
        icon: Users,
        label: "Mes Syndicats",
        gradient: "from-blue-500 to-indigo-600",
        description: "Gérer vos organisations",
    },
    {
        id: "explorer",
        icon: Compass,
        label: "Explorer",
        gradient: "from-blue-500 to-indigo-600",
        description: "Découvrir de nouveaux syndicats",
    },
    {
        id: "parametres",
        icon: Settings,
        label: "Paramètres",
        gradient: "from-blue-500 to-indigo-600",
        description: "Configuration du compte",
    },
]