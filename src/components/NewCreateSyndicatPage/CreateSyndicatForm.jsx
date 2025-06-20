"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Palette, TextCursorInput, Building2, LayoutGrid, Image, Rocket, AtSign, Globe, Share2, UserRound,
    Type, Loader2, ChevronRight, ArrowLeft, Shield, Eye, CheckCircle, Users, Award, Lock, MapPin,
    Plus, Trash2, Map, Edit3
} from "lucide-react";

// Assurez-vous que ces chemins d'importation sont corrects pour votre projet
import { Notification } from "../../globalComponent/Notification.jsx";
import { FileUploader } from "./file-uploader";

// URL de l'API (constante)
const API_URL = "/api/organization-service/organizations";

// ======================================================================
// COMPOSANT UTILITAIRE : CARTE INTERACTIVE
// (Ce composant est déjà bien structuré, pas de changement majeur)
// ======================================================================
const InteractiveMap = ({ onLocationSelect, selectedLocation, height = "400px" }) => {
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'locationSelected') {
                onLocationSelect({ lat: event.data.lat, lng: event.data.lng });
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onLocationSelect]);

    const mapHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <style>
                body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
                #map { height: 100vh; }
                .map-instructions { position: absolute; top: 10px; left: 10px; background: white; padding: 10px 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; font-size: 14px; max-width: 250px; }
                .coordinates-display { position: absolute; bottom: 10px; left: 10px; background: #3b82f6; color: white; padding: 8px 12px; border-radius: 6px; z-index: 1000; font-size: 13px; font-weight: 500; }
            </style>
        </head>
        <body>
            <div class="map-instructions">📍 Cliquez sur la carte pour sélectionner l'emplacement</div>
            <div id="coordinates" class="coordinates-display">Latitude: -, Longitude: -</div>
            <div id="map"></div>
            <script>
                var map = L.map('map').setView([3.848, 11.502], 6);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
                var marker = null;
                var coordinatesDiv = document.getElementById('coordinates');
                map.on('click', function(e) {
                    var lat = e.latlng.lat.toFixed(6); var lng = e.latlng.lng.toFixed(6);
                    if (marker) { map.removeLayer(marker); }
                    marker = L.marker([lat, lng]).addTo(map);
                    coordinatesDiv.innerHTML = 'Lat: ' + lat + ', Lng: ' + lng;
                    window.parent.postMessage({ type: 'locationSelected', lat: parseFloat(lat), lng: parseFloat(lng) }, '*');
                });
                ${selectedLocation ? `
                    marker = L.marker([${selectedLocation.lat}, ${selectedLocation.lng}]).addTo(map);
                    map.setView([${selectedLocation.lat}, ${selectedLocation.lng}], 10);
                    coordinatesDiv.innerHTML = 'Lat: ${selectedLocation.lat.toFixed(6)}, Lng: ${selectedLocation.lng.toFixed(6)}';
                ` : ''}
            </script>
        </body>
        </html>`;

    return (
        <div className="relative">
            <div className="w-full rounded-xl overflow-hidden border-2 border-dashed border-blue-300 bg-blue-50" style={{ height }}>
                <iframe
                    src={`data:text/html;charset=utf-8,${encodeURIComponent(mapHTML)}`}
                    className="w-full h-full border-0"
                    onLoad={() => setIsMapReady(true)}
                    title="Carte interactive pour la sélection d'emplacement"
                />
            </div>
            {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 rounded-xl">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
                        <p className="text-blue-600 font-medium">Chargement de la carte...</p>
                    </div>
                </div>
            )}
        </div>
    );
};


// ======================================================================
// COMPOSANTS D'ÉTAPES (EXTRAITS POUR CORRIGER LE BUG)
// ======================================================================

// --- Étape 1 : Sélection du Type ---
const Step1 = ({ handleTypeSelection }) => (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">Créer votre syndicat</h1>
            <p className="text-xl text-gray-600 mb-8">Choisissez le type de syndicat qui correspond à vos besoins</p>
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"><Shield className="w-4 h-4 mr-2" />Étape 1 sur 3</div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div onClick={() => handleTypeSelection("anonymous")} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 shadow-xl border border-emerald-100 cursor-pointer group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6"><div className="p-3 bg-emerald-500 rounded-2xl shadow-lg"><Eye className="w-8 h-8 text-white" /></div><ChevronRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-2 transition-transform" /></div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Syndicat Anonyme</h3>
                    <p className="text-emerald-700 mb-6 leading-relaxed">Créez rapidement un syndicat sans vérification. Idéal pour commencer et rassembler vos collègues.</p>
                    <div className="space-y-3"><div className="flex items-center text-emerald-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Création immédiate</span></div><div className="flex items-center text-emerald-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Aucune vérification requise</span></div><div className="flex items-center text-emerald-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Fonctionnalités de base</span></div></div>
                    <div className="mt-6 pt-4 border-t border-emerald-200"><span className="inline-flex items-center text-sm font-medium text-emerald-700"><Users className="w-4 h-4 mr-2" />Parfait pour débuter</span></div>
                </div>
            </div>
            <div onClick={() => handleTypeSelection("accredited")} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 p-8 shadow-xl border border-violet-100 cursor-pointer group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6"><div className="p-3 bg-violet-500 rounded-2xl shadow-lg"><Award className="w-8 h-8 text-white" /></div><ChevronRight className="w-6 h-6 text-violet-600 group-hover:translate-x-2 transition-transform" /></div>
                    <h3 className="text-2xl font-bold text-violet-800 mb-4">Syndicat Accrédité</h3>
                    <p className="text-violet-700 mb-6 leading-relaxed">Processus de vérification complet pour un syndicat officiel avec toutes les fonctionnalités.</p>
                    <div className="space-y-3"><div className="flex items-center text-violet-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Vérification complète</span></div><div className="flex items-center text-violet-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Statut officiel</span></div><div className="flex items-center text-violet-600"><CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm">Fonctionnalités avancées</span></div></div>
                    <div className="mt-6 pt-4 border-t border-violet-200"><span className="inline-flex items-center text-sm font-medium text-violet-700"><Lock className="w-4 h-4 mr-2" />Reconnaissance officielle</span></div>
                </div>
            </div>
        </div>
    </div>
);

// --- Étape 2 : Formulaire Anonyme ---
const Step2Anonymous = ({ formData, setFormData, goBackToStep1, goToStep3 }) => {

    const syndicatTypes = [{ value: "SOLE_PROPRIETORSHIP", label: "Entreprise individuelle" }, { value: "LIMITED_LIABILITY_COMPANY", label: "SARL" }, { value: "CORPORATION", label: "Société anonyme" }, { value: "COOPERATIVE", label: "Coopérative" }, { value: "ASSOCIATION", label: "Association" }];
    const activityDomains = [{ id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Technologie" }, { id: "4fa85f64-5717-4562-b3fc-2c963f66afa7", name: "Santé" }, { id: "5fa85f64-5717-4562-b3fc-2c963f66afa8", name: "Éducation" }, { id: "6fa85f64-5717-4562-b3fc-2c963f66afa9", name: "Construction" }, { id: "7fa85f64-5717-4562-b3fc-2c963f66afaa", name: "Transport" }, { id: "8fa85f64-5717-4562-b3fc-2c963f66afab", name: "Agriculture" }, { id: "9fa85f64-5717-4562-b3fc-2c963f66afac", name: "Artisanat" }];

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name === "business_domains") {
            const selectedDomain = value;
            if (selectedDomain && !formData.business_domains.includes(selectedDomain)) {
                setFormData(prev => ({ ...prev, business_domains: [...prev.business_domains, selectedDomain] }));
            }
        } else if (type === "number") {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRemoveDomain = (domainId) => {
        setFormData(prev => ({ ...prev, business_domains: prev.business_domains.filter(id => id !== domainId) }));
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8"><button onClick={goBackToStep1} className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium mb-6 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" />Retour au choix du type</button><div className="text-center mb-10"><h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Informations du syndicat</h1><p className="text-gray-600 text-lg">Remplissez les informations de base pour créer votre syndicat</p><div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mt-4"><Shield className="w-4 h-4 mr-2" />Étape 2 sur 3 - Informations principales</div></div></div>
            <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"><h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Building2 className="w-6 h-6 mr-3 text-emerald-500" />Informations principales</h2><div className="grid gap-6 md:grid-cols-2"><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><TextCursorInput className="w-4 h-4 mr-2 text-emerald-500" />Nom complet du syndicat *</label><input name="long_name" value={formData.long_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Ex: Syndicat National des Développeurs" required /></div><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><Type className="w-4 h-4 mr-2 text-emerald-500" />Nom court / Acronyme *</label><input name="short_name" value={formData.short_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Ex: SND" required /></div></div><div className="grid gap-6 md:grid-cols-2 mt-6"><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><AtSign className="w-4 h-4 mr-2 text-emerald-500" />Email de contact *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="contact@syndicat.com" required /></div><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><Building2 className="w-4 h-4 mr-2 text-emerald-500" />Type d'organisation *</label><select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white" required>{syndicatTypes.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}</select></div></div><div className="mt-6 space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><Palette className="w-4 h-4 mr-2 text-emerald-500" />Description *</label><textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" rows={4} placeholder="Décrivez les objectifs et la mission de votre syndicat..." required></textarea></div></div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"><h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><LayoutGrid className="w-6 h-6 mr-3 text-emerald-500" />Domaines d'activité</h2><div className="space-y-4"><select name="business_domains" onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white" required={formData.business_domains.length === 0} value=""><option value="" disabled>Sélectionnez un domaine à ajouter</option>{activityDomains.map((domain) => (<option key={domain.id} value={domain.id}>{domain.name}</option>))}</select>{formData.business_domains.length > 0 && (<div className="flex flex-wrap gap-3">{formData.business_domains.map(domainId => { const domain = activityDomains.find(d => d.id === domainId); return domain ? (<div key={domainId} className="flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">{domain.name}<button type="button" onClick={() => handleRemoveDomain(domainId)} className="ml-2 text-emerald-600 hover:text-emerald-800 transition-colors">×</button></div>) : null; })}</div>)}</div></div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"><h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Globe className="w-6 h-6 mr-3 text-emerald-500" />Présence en ligne</h2><div className="grid gap-6 md:grid-cols-2"><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><Globe className="w-4 h-4 mr-2 text-emerald-500" />Site web</label><input type="url" name="web_site_url" value={formData.web_site_url} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="https://www.votresyndicat.com" /></div><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><Share2 className="w-4 h-4 mr-2 text-emerald-500" />Réseaux sociaux</label><input name="social_network" value={formData.social_network} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="@syndicat_officiel" /></div></div></div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"><h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><UserRound className="w-6 h-6 mr-3 text-emerald-500" />Informations du dirigeant</h2><div className="space-y-2"><label className="flex items-center text-sm font-semibold text-gray-700"><UserRound className="w-4 h-4 mr-2 text-emerald-500" />Nom du dirigeant *</label><input name="ceo_name" value={formData.ceo_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Prénom et Nom" required /></div></div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"><h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Image className="w-6 h-6 mr-3 text-emerald-500" />Logo du syndicat</h2><FileUploader label="Télécharger le logo" icon={<Image className="text-emerald-500" />} accept="image/*" onFileSelect={(file) => setFormData(prev => ({ ...prev, logo_url: file }))} bgColor="bg-emerald-50" borderColor="border-emerald-200" preview /><p className="mt-3 text-sm text-gray-500">Format recommandé : carré, 512x512 pixels minimum, JPG ou PNG</p></div>
                <button onClick={goToStep3} className="w-full py-4 px-8 rounded-2xl font-bold text-white text-lg shadow-lg transition-all bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:from-emerald-600 hover:to-teal-600"><span className="flex items-center justify-center"><Map className="w-5 h-5 mr-3" />Continuer vers les antennes<ChevronRight className="w-5 h-5 ml-3" /></span></button>
            </div>
        </div>
    );
};

// --- Étape 3 : Gestion des Antennes ---
const Step3Antennes = ({ goBackToStep2, handleSubmit, antennes, setAntennes, isLoading, apiResponse, showNotification }) => {

    const [currentAntenne, setCurrentAntenne] = useState({ name: "", latitude: null, longitude: null });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingAntenneIndex, setEditingAntenneIndex] = useState(null);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setCurrentAntenne(prev => ({ ...prev, latitude: location.lat, longitude: location.lng }));
    };

    const resetAntenneForm = () => {
        setCurrentAntenne({ name: "", latitude: null, longitude: null });
        setSelectedLocation(null);
        setEditingAntenneIndex(null);
    };

    const addOrUpdateAntenne = () => {
        if (!currentAntenne.name || !currentAntenne.latitude) {
            showNotification("Veuillez nommer l'antenne et sélectionner un emplacement.", "error");
            return;
        }

        if (editingAntenneIndex !== null) {
            const updatedAntennes = [...antennes];
            updatedAntennes[editingAntenneIndex] = { ...currentAntenne };
            setAntennes(updatedAntennes);
            showNotification("Antenne modifiée avec succès!", "success");
        } else {
            setAntennes([...antennes, { ...currentAntenne }]);
            showNotification("Antenne ajoutée avec succès!", "success");
        }
        resetAntenneForm();
    };

    const editAntenne = (index) => {
        const antenneToEdit = antennes[index];
        setCurrentAntenne(antenneToEdit);
        setSelectedLocation({ lat: antenneToEdit.latitude, lng: antenneToEdit.longitude });
        setEditingAntenneIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteAntenne = (index) => {
        setAntennes(antennes.filter((_, i) => i !== index));
        showNotification("Antenne supprimée", "warning");
        if (editingAntenneIndex === index) {
            resetAntenneForm();
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8"><button onClick={goBackToStep2} className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium mb-6 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" />Retour aux informations</button><div className="text-center mb-10"><h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Gérer vos antennes</h1><p className="text-gray-600 text-lg">Ajoutez des antennes locales pour étendre la présence de votre syndicat (optionnel)</p><div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mt-4"><MapPin className="w-4 h-4 mr-2" />Étape 3 sur 3 - Antennes du syndicat</div></div></div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8"><div className="grid lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Map className="w-5 h-5 mr-2 text-blue-500" />Sélectionnez l'emplacement sur la carte</h2><InteractiveMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} height="450px" /></div><div className="space-y-6"><div><h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2 text-blue-500" />{editingAntenneIndex !== null ? 'Modifier l\'antenne' : 'Nouvelle antenne'}</h2></div><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'antenne *</label><input value={currentAntenne.name} onChange={(e) => setCurrentAntenne({ ...currentAntenne, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" placeholder="Ex: Antenne de Douala" /></div>{currentAntenne.latitude && currentAntenne.longitude ? (<div className="bg-green-50 p-3 rounded-lg border border-green-200"><div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /><span className="text-sm font-medium text-green-800">Position sélectionnée</span></div><p className="text-xs text-green-600 mt-1">{currentAntenne.latitude?.toFixed(6)}, {currentAntenne.longitude?.toFixed(6)}</p></div>) : (<div className="bg-gray-50 p-3 rounded-lg border border-gray-200"><p className="text-sm text-gray-500">👆 Cliquez sur la carte pour définir l'emplacement</p></div>)}<div className="space-y-2"><button onClick={addOrUpdateAntenne} disabled={!currentAntenne.name || !currentAntenne.latitude} className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${!currentAntenne.name || !currentAntenne.latitude ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg'}`}>{editingAntenneIndex !== null ? '✓ Modifier l\'antenne' : '+ Ajouter l\'antenne'}</button>{editingAntenneIndex !== null && (<button onClick={resetAntenneForm} className="w-full py-2 px-4 rounded-lg font-medium text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Annuler</button>)}</div></div><div className="pt-4 border-t border-gray-200"><div className="flex items-center justify-between text-sm"><span className="text-gray-600">Antennes créées</span><span className="font-semibold text-blue-600">{antennes.length}</span></div></div></div></div></div>
            {antennes.length > 0 && (<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8"><h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><MapPin className="w-5 h-5 mr-2 text-green-500" />Vos antennes ({antennes.length})</h2><div className="space-y-3">{antennes.map((antenne, index) => (<div key={`antenne-${index}-${antenne.name}`} className={`p-4 rounded-xl border-2 transition-all ${editingAntenneIndex === index ? 'border-blue-300 bg-blue-50' : 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-sm'}`}><div className="flex items-center justify-between"><div className="flex-1"><h3 className="font-semibold text-gray-800">{antenne.name}</h3><p className="text-sm text-gray-600">📍 {antenne.latitude?.toFixed(4)}°, {antenne.longitude?.toFixed(4)}°</p></div><div className="flex gap-1"><button onClick={() => editAntenne(index)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Modifier"><Edit3 className="w-4 h-4" /></button><button onClick={() => deleteAntenne(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Supprimer"><Trash2 className="w-4 h-4" /></button></div></div></div>))}</div></div>)}
            {apiResponse && (<div className="bg-emerald-50 rounded-3xl p-8 shadow-lg border border-emerald-100 mb-8"><h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center"><CheckCircle className="w-6 h-6 mr-2" />Syndicat créé avec succès !</h3><div className="bg-white rounded-xl p-6 text-sm space-y-2"><p><strong>ID Organisation:</strong> {apiResponse.organization_id}</p><p><strong>Nom:</strong> {apiResponse.long_name}</p><p><strong>Acronyme:</strong> {apiResponse.short_name}</p><p><strong>Statut:</strong> {apiResponse.status}</p><p><strong>Type:</strong> {apiResponse.type}</p><p><strong>Antennes créées:</strong> {antennes.length}</p></div></div>)}
            <div className="text-center"><button onClick={handleSubmit} disabled={isLoading} className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${isLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-xl hover:from-emerald-600 hover:to-teal-600'}`}>{isLoading ? (<span className="flex items-center"><Loader2 className="w-5 h-5 mr-3 animate-spin" />Création en cours...</span>) : (<span className="flex items-center"><Rocket className="w-5 h-5 mr-3" />{antennes.length > 0 ? `Créer le syndicat avec ${antennes.length} antenne${antennes.length > 1 ? 's' : ''}` : 'Créer le syndicat'}</span>)}</button>{antennes.length === 0 && (<p className="text-sm text-gray-500 mt-3">Vous pouvez créer le syndicat sans antenne et en ajouter plus tard</p>)}</div>
        </div>
    );
};

// --- Étape 2 : Placeholder pour Accrédité ---
const Step2Accredited = ({ goBackToStep1 }) => (
    <div className="max-w-4xl mx-auto text-center">
        <button onClick={goBackToStep1} className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" />Retour au choix du type</button>
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-12 shadow-xl border border-violet-100">
            <div className="p-6 bg-violet-500 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center"><Award className="w-12 h-12 text-white" /></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">Syndicat Accrédité</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Le processus de création pour les syndicats accrédités est en cours de développement. Cette fonctionnalité sera bientôt disponible.</p>
            <div className="bg-white rounded-2xl p-8 text-left max-w-2xl mx-auto"><h3 className="text-xl font-bold text-gray-800 mb-4">Fonctionnalités à venir :</h3><div className="space-y-3 text-gray-600"><div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-violet-500" /><span>Vérification d'identité renforcée</span></div><div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-violet-500" /><span>Documents officiels requis</span></div><div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-violet-500" /><span>Processus de validation par étapes</span></div><div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-violet-500" /><span>Statut officiel reconnu</span></div></div></div>
        </div>
    </div>
);


// ======================================================================
// COMPOSANT PRINCIPAL / CHEF D'ORCHESTRE
// ======================================================================
export const CreateSyndicatForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [syndicatType, setSyndicatType] = useState("");
    const [formData, setFormData] = useState({ long_name: "", short_name: "", email: "", description: "", business_domains: [], logo_url: null, type: "SOLE_PROPRIETORSHIP", web_site_url: "", social_network: "", business_registration_number: "", tax_number: "", capital_share: 0, registration_date: new Date().toISOString().split('T')[0], ceo_name: "", year_founded: new Date().toISOString().split('T')[0] });
    const [antennes, setAntennes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [notification, setNotification] = useState({ isVisible: false, message: "", type: "success" });

    const showNotification = (message, type = "success") => setNotification({ isVisible: true, message, type });
    const closeNotification = () => setNotification(prev => ({ ...prev, isVisible: false }));

    const handleTypeSelection = (type) => { setSyndicatType(type); setCurrentStep(2); };
    const goBackToStep1 = () => { setCurrentStep(1); setSyndicatType(""); };
    const goToStep3 = () => setCurrentStep(3);
    const goBackToStep2 = () => setCurrentStep(2);

    const handleSubmit = async () => {
        setIsLoading(true);
        setApiResponse(null);
        try {
            const apiPayload = { ...formData, registration_date: new Date(formData.registration_date).toISOString(), year_founded: new Date(formData.year_founded).toISOString(), website_url: formData.web_site_url, antennes: antennes };
            delete apiPayload.web_site_url;
            console.log("Payload envoyé à l'API:", apiPayload);
            const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiPayload) });
            const responseData = await response.json();
            if (!response.ok) throw new Error(responseData.message || `Erreur HTTP: ${response.status}`);
            setApiResponse(responseData);
            showNotification("Syndicat créé avec succès! 🎉", "success");
        } catch (err) {
            console.error("Erreur lors de la création du syndicat:", err);
            showNotification(err.message || "Une erreur est survenue lors de la création.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const animationProps = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.4, ease: "easeInOut" }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <Notification {...notification} onClose={closeNotification} autoClose={notification.type === "success"} duration={5000} />
            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div key="step1" {...animationProps}>
                        <Step1 handleTypeSelection={handleTypeSelection} />
                    </motion.div>
                )}
                {currentStep === 2 && syndicatType === "anonymous" && (
                    <motion.div key="step2-anon" {...animationProps}>
                        <Step2Anonymous formData={formData} setFormData={setFormData} goBackToStep1={goBackToStep1} goToStep3={goToStep3} />
                    </motion.div>
                )}
                {currentStep === 2 && syndicatType === "accredited" && (
                    <motion.div key="step2-accred" {...animationProps}>
                        <Step2Accredited goBackToStep1={goBackToStep1} />
                    </motion.div>
                )}
                {currentStep === 3 && syndicatType === "anonymous" && (
                    <motion.div key="step3-antennes" {...animationProps}>
                        <Step3Antennes goBackToStep2={goBackToStep2} handleSubmit={handleSubmit} antennes={antennes} setAntennes={setAntennes} isLoading={isLoading} apiResponse={apiResponse} showNotification={showNotification} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};