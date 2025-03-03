
import { useState } from "react"
import { motion } from "framer-motion"
import { Users, MapPin, Building, ShoppingBag } from "lucide-react"
import {MembersManagement} from "./Members/MemberManagement.jsx";
import {BranchManagement} from "./Branches/BranchManagement.jsx";
import {ProductsServicesManagement} from "./Product-Services/ProductServiceManagement.jsx";


export const OrganisationNavigationTabs = () => {
    // État initial : le premier onglet est actif
    const [activeTab, setActiveTab] = useState("members")

    const tabs = [
        { key: "members", icon: <Users className="inline-block mr-2" />, label: "Members" },
        { key: "branches", icon: <MapPin className="inline-block mr-2" />, label: "Branches" },
        { key: "agencies", icon: <Building className="inline-block mr-2" />, label: "Agencies" },
        { key: "products", icon: <ShoppingBag className="inline-block mr-2" />, label: "Products" },
    ]

    // Fonction qui renvoie le composant à afficher selon l'onglet actif
    const renderComponent = (tabKey) => {
        switch (tabKey) {
            case "members":
                return <MembersManagement/>
            case "branches":
                return <BranchManagement/>
            case "agencies":
                return <div>agencies</div>
            case "products":
                return <ProductsServicesManagement/>
            default:
                return null
        }
    }

    return (
        <div className="pt-6">
            {/* Barre de navigation */}
            <div className="flex justify-center gap-6 relative">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.key}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md ${
                            activeTab === tab.key
                                ? "bg-indigo-600 text-white"
                                : "bg-white/30 backdrop-blur-md text-gray-700 hover:bg-indigo-100"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                        aria-selected={activeTab === tab.key}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-1/2 w-5 h-1 bg-indigo-600 rounded-full"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "60%", x: "-50%" }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Zone de contenu qui change selon l'onglet actif */}
            <div className="mt-8">
                {renderComponent(activeTab)}
            </div>
        </div>
    )
}
