"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Mapping simple pour démonstration (les codes de ville attendus par l'API Amadeus)
const cityMapping = {
    France: {
        Paris: "PAR",
        Lyon: "LYO",
    },
    USA: {
        "New York": "NYC",
        "Los Angeles": "LAX",
    },
}

export const ReservationManagement = () => {
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const countries = Object.keys(cityMapping)
    const cities = selectedCountry ? Object.keys(cityMapping[selectedCountry]) : []

    // Dès qu'un pays et une ville sont sélectionnés, on interroge l'API via le proxy
    useEffect(() => {
        if (selectedCountry && selectedCity) {
            fetchHotels(cityMapping[selectedCountry][selectedCity])
        }
    }, [selectedCountry, selectedCity])

    const fetchHotels = async (cityCode) => {
        setLoading(true)
        setError(null)
        try {
            // Récupération du token d'accès via OAuth2 en passant par le proxy
            const formData = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "kNZaijo1zbaEtsK8nV8gr3AZnTIAjSDB",
                client_secret: "adpi3i0GEBO1JQfy",
            })

            const tokenResponse = await fetch("/api/amadeus/v1/security/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            })

            if (!tokenResponse.ok) {
                throw new Error(`Erreur lors de la récupération du token: ${tokenResponse.status}`)
            }

            const tokenData = await tokenResponse.json()
            const accessToken = tokenData.access_token

            // Appel de l'API pour récupérer les offres hôtelières pour la ville choisie via le proxy
            const hotelsResponse = await fetch(`/api/amadeus/v2/shopping/hotel-offers?cityCode=${cityCode}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (!hotelsResponse.ok) {
                throw new Error(`Erreur lors de la récupération des hôtels: ${hotelsResponse.status}`)
            }

            const hotelsData = await hotelsResponse.json()
            setHotels(hotelsData.data || [])
        } catch (err) {
            console.error(err)
            setError(err.message || "Erreur lors du chargement des hôtels.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Réservations</h1>

            <div className="max-w-7xl mx-auto">
                {/* Section Filtres */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700">Pays</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => {
                                setSelectedCountry(e.target.value)
                                setSelectedCity("")
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        >
                            <option value="">Tous les pays</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700">Ville</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedCountry}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        >
                            <option value="">Toutes les villes</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Affichage des hôtels */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-2">Chargement des hôtels...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>
                )}

                {!loading && !error && hotels.length === 0 && selectedCity && (
                    <div className="text-center py-8 text-slate-600">Aucun hôtel trouvé pour cette destination.</div>
                )}

                {!loading && !error && hotels.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotelOffer) => {
                            // Chaque "hotelOffer" contient les informations sur l'hôtel et ses offres
                            const hotel = hotelOffer.hotel
                            const firstOffer = hotelOffer.offers && hotelOffer.offers[0]
                            return (
                                <motion.div
                                    key={hotel.hotelId}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-xl shadow overflow-hidden"
                                >
                                    <img
                                        src={hotel.hotelImage?.url || "https://via.placeholder.com/300x200?text=Hotel"}
                                        alt={hotel.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-slate-800">{hotel.name}</h2>
                                        <p className="text-sm text-slate-500">
                                            {selectedCity}, {selectedCountry}
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-slate-700">
                                            {firstOffer && firstOffer.price && firstOffer.price.total
                                                ? `${firstOffer.price.total} ${firstOffer.price.currency}`
                                                : "Tarif indisponible"}
                                        </p>
                                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                            Réserver
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

