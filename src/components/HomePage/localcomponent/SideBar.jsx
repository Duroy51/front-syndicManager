import {motion} from "framer-motion";
import {LogOut} from "lucide-react";
import {navItems} from "./navItems.js";

export const Sidebar = ({ isOpen, activeSection, onSectionChange, onLogout }) => (
    <motion.nav
        initial={{ width: isOpen ? 256 : 64 }}
        animate={{ width: isOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl flex flex-col z-20"
    >
        <div className="flex-grow overflow-y-auto p-6">
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSectionChange(item.id)}
                        className={`w-full p-3 rounded-xl transition-all duration-300 group ${
                            activeSection === item.id
                                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                : "bg-white text-gray-600 hover:bg-gray-50"
                        } ${isOpen ? "flex items-center" : "flex justify-center"}`}
                    >
                        <item.icon className={`w-5 h-5 ${isOpen ? "mr-3" : ""}`} />
                        {isOpen && (
                            <div className="text-left">
                                <div className="font-medium">{item.label}</div>
                                <div className={`text-xs ${activeSection === item.id ? "text-white/80" : "text-gray-500"}`}>
                                    {item.description}
                                </div>
                            </div>
                        )}
                    </motion.button>
                ))}
            </nav>
        </div>

        <div className="p-6 border-t border-gray-100">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                onClick={onLogout}
            >
                <LogOut className="w-5 h-5" />
                {isOpen && <span className="font-medium ml-2">Déconnexion</span>}
            </motion.button>
        </div>
    </motion.nav>
)