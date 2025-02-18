"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUploader } from "./file-uploader"
import { User, Phone, Mail, Camera, FileText, GraduationCap, Plus, Trash2, Save, ArrowLeft, Edit } from "lucide-react"
import {
    getEmailToken,
    getFirstNameToken,
    getLastNameToken,
    getProfilFromToken
} from "../../../services/AccountService.js";

export const ProfilUser = () => {
    const [currentUser, setCurrentUser] = useState({
        firstName: getFirstNameToken(),
        lastName: getLastNameToken(),
        email: getEmailToken(),
        phone: "+237 679 39 04 71",
        profilePicture: getProfilFromToken(),
    })

    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [phone, setPhone] = useState(currentUser.phone)
    const [email, setEmail] = useState(currentUser.email)
    const [profilePicture, setProfilePicture] = useState(null)
    const [cv, setCv] = useState(null)
    const [formations, setFormations] = useState([""])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Profil mis à jour", { firstName, lastName, phone, email, profilePicture, cv, formations })
    }

    const addFormation = () => setFormations([...formations, ""])
    const removeFormation = (index) => setFormations(formations.filter((_, i) => i !== index))
    const updateFormation = (index, value) => {
        const newFormations = [...formations]
        newFormations[index] = value
        setFormations(newFormations)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Configuration du profil
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-md mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <img
                                src={currentUser.profilePicture || "/placeholder.svg"}
                                alt="Photo de profil"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                            />
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                                onClick={() => document.getElementById("profilePictureInput")?.click()}
                            >
                                <Edit className="text-white" size={16} />
                            </motion.div>
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {currentUser.firstName} {currentUser.lastName}
                            </h3>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start mb-1">
                                <Mail className="mr-2 text-blue-500" size={18} />
                                {currentUser.email}
                            </p>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start">
                                <Phone className="mr-2 text-green-500" size={18} />
                                {currentUser.phone}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                <User className="inline-block mr-2 text-blue-500" />
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                required
                            />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                <User className="inline-block mr-2 text-purple-500" />
                                Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                required
                            />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                <Phone className="inline-block mr-2 text-green-500" />
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                required
                            />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                <Mail className="inline-block mr-2 text-red-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                required
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-2xl shadow-md col-span-1 md:col-span-2 lg:col-span-3"
                        >
                            <FileUploader
                                label="Photo de profil"
                                icon={<Camera className="text-blue-500" />}
                                accept="image/*"
                                onFileSelect={setProfilePicture}
                                bgColor="bg-blue-50"
                                borderColor="border-blue-200"
                            />
                        </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            <GraduationCap className="inline-block mr-2 text-indigo-500" />
                            Formations
                        </h3>
                        {formations.map((formation, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <input
                                    type="text"
                                    value={formation}
                                    onChange={(e) => updateFormation(index, e.target.value)}
                                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="Nom de la formation"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFormation(index)}
                                    className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFormation}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                        >
                            <Plus size={20} className="mr-2" />
                            Ajouter une formation
                        </button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-md">
                        <FileUploader
                            label="CV"
                            icon={<FileText className="text-orange-500" />}
                            accept=".pdf,.doc,.docx"
                            onFileSelect={setCv}
                            bgColor="bg-orange-50"
                            borderColor="border-orange-200"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                    >
                        <Save className="inline-block mr-2" />
                        Enregistrer les modifications
                    </motion.button>
                </form>
            </div>
        </div>
    )
}

