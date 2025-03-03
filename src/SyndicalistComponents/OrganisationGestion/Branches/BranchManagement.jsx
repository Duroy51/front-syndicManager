"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Plus, Trash2, MapPin, X, Check, Compass } from "lucide-react"

// Définition de l'icône personnalisée en ligne
const customMarkerIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
})

const LocationSelector = ({ onLocationSelected }) => {
    const [position, setPosition] = useState(null)

    useMapEvents({
        click(e) {
            setPosition(e.latlng)
            onLocationSelected(e.latlng.lat, e.latlng.lng)
        },
    })

    return position ? (
        <Marker position={position} icon={customMarkerIcon}>
            <Popup className="font-medium text-lg">📍 Nouvelle position sélectionnée</Popup>
        </Marker>
    ) : null
}

export const BranchManagement = () => {
    // Centre de la carte recentré sur le Cameroun
    const [mapCenter] = useState([4.5, 11.5])
    const [branches, setBranches] = useState([])
    const [newBranch, setNewBranch] = useState({})
    const [isAddingBranch, setIsAddingBranch] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const mapRef = useRef(null)

    useEffect(() => {
        // Fake data adaptées au contexte du transport camerounais
        const fakeBranches = [
            { id: "1", name: "Douala", description: "Terminal de transport maritime", latitude: 4.0511, longitude: 9.7679 },
            { id: "2", name: "Yaoundé", description: "Centre de logistique routière", latitude: 3.8480, longitude: 11.5021 },
            { id: "3", name: "Bamenda", description: "Plateforme de transport interurbain", latitude: 5.964, longitude: 10.159 },
        ]
        setBranches(fakeBranches)
    }, [])

    const handleAddBranch = () => {
        if (newBranch.name && selectedLocation) {
            setBranches([
                ...branches,
                {
                    id: Date.now().toString(),
                    name: newBranch.name,
                    description: newBranch.description || "",
                    latitude: selectedLocation[0],
                    longitude: selectedLocation[1],
                },
            ])
            setNewBranch({})
            setIsAddingBranch(false)
            setSelectedLocation(null)
        }
    }

    const handleDeleteBranch = (id) => {
        setBranches(branches.filter(branch => branch.id !== id))
    }

    const handleLocationSelected = (lat, lng) => {
        setSelectedLocation([lat, lng])
        setNewBranch(prev => ({ ...prev, latitude: lat, longitude: lng }))
    }

    const focusOnBranch = (latitude, longitude) => {
        mapRef.current?.setView([latitude, longitude], 13)
    }

    return (
        // Wrapper externe avec padding bleu foncé léger pour un meilleur rendu
        <div className="p-4 bg-blue-900/5 h-screen">
            <div className="flex h-full bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                {/* Carte interactive */}
                <div className="w-2/3 h-full p-4">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full border-4 border-white">
                        <MapContainer center={mapCenter} zoom={6} className="h-full w-full" ref={mapRef}>
                            {/* Utilisation d'OpenStreetMap et attribution incluant la description de Yowyob */}
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - Yowyob est un service de localisation proposant des solutions précises et innovantes pour le transport au Cameroun.'
                            />
                            {branches.map(branch => (
                                <Marker
                                    key={branch.id}
                                    position={[branch.latitude, branch.longitude]}
                                    icon={customMarkerIcon}
                                >
                                    <Popup className="min-w-[200px]">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-blue-800">{branch.name}</h3>
                                            <p className="text-gray-600">{branch.description}</p>
                                            <div className="flex items-center text-blue-600 text-sm">
                                                <MapPin size={14} className="mr-1" />
                                                {branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            {isAddingBranch && <LocationSelector onLocationSelected={handleLocationSelected} />}
                        </MapContainer>
                    </div>
                </div>

                {/* Panneau de gestion */}
                <div className="w-1/3 h-full p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
                        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Gestion des Succursales
                        </h1>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {branches.map(branch => (
                                <div key={branch.id} className="group relative mb-4">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                                    <div className="relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{branch.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{branch.description}</p>
                                                <div className="mt-2 flex items-center text-sm text-blue-600">
                                                    <MapPin size={14} className="mr-2" />
                                                    <span>{branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => focusOnBranch(branch.latitude, branch.longitude)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Compass size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBranch(branch.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!isAddingBranch ? (
                            <button
                                onClick={() => setIsAddingBranch(true)}
                                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center transition-all transform hover:scale-[1.02]"
                            >
                                <Plus size={20} className="mr-2" />
                                Ajouter une succursale
                            </button>
                        ) : (
                            <div className="mt-4 bg-white border-2 border-blue-100 rounded-xl p-4 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Nouvelle succursale</h2>
                                    <button
                                        onClick={() => setIsAddingBranch(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                        <input
                                            type="text"
                                            placeholder="Nom de la succursale"
                                            value={newBranch.name || ""}
                                            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            placeholder="Description de la succursale"
                                            value={newBranch.description || ""}
                                            onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={2}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                                        {selectedLocation ? (
                                            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 font-medium">
                          {selectedLocation[0].toFixed(4)}, {selectedLocation[1].toFixed(4)}
                        </span>
                                                <button
                                                    onClick={() => setSelectedLocation(null)}
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 p-4 rounded-lg text-center border-2 border-dashed border-gray-200">
                                                <p className="text-gray-500 text-sm">
                                                    Cliquez sur la carte pour sélectionner l'emplacement
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleAddBranch}
                                        disabled={!newBranch.name || !selectedLocation}
                                        className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
                                            newBranch.name && selectedLocation
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                                : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                    >
                                        <Check size={20} className="mr-2 inline-block" />
                                        Confirmer l'ajout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
