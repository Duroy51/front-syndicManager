import {motion} from "framer-motion";



export const PartnershipsList = () => {
    const partnerships = [
        { id: 1, name: "Entreprise A", description: "Réductions sur les fournitures de bureau" },
        { id: 2, name: "Entreprise B", description: "Tarifs préférentiels sur les formations professionnelles" },
        // Ajoutez d'autres partenariats ici
    ]

    return (
        <div className="space-y-4">
            {partnerships.map((partnership) => (
                <motion.div
                    key={partnership.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <h3 className="font-bold text-lg mb-2">{partnership.name}</h3>
                    <p>{partnership.description}</p>
                </motion.div>
            ))}
        </div>
    )
}