

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Building, Download, Upload, Eye, EyeOff, Phone, Mail, FileText, Users, MapPin, FileSignature, Book, ChevronDown, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next';
export const Profile = () =>  {
const { t } = useTranslation();
    return (
        <h1>{t("profil")}</h1>
    )
}