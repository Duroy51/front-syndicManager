import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Facebook,
    Twitter, Linkedin, Mail
} from 'lucide-react'
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <footer className="bg-blue-600 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <p className="text-sm">&copy; {t("SyndicManagerTousDroitsRéservés")}</p>
                    <div className="flex space-x-4">
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Facebook className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Twitter className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Linkedin className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Mail className="h-5 w-5" />
                        </motion.a>
                    </div>
                </div>
            </footer>
        </div>
    )
}