import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SyndicatCard({ syndicat }) {
    const navigate = useNavigate();

    return (
        <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/syndicat/${syndicat.id}`)}
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-blue-100">
                        <img 
                            src={syndicat.logo} 
                            alt={`Logo ${syndicat.name}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{syndicat.name}</h3>
                        <p className="text-sm text-gray-500">{syndicat.category}</p>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">{syndicat.members.toLocaleString()}</span> membres
                    </div>
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/syndicat/${syndicat.id}/join`);
                        }}
                    >
                        Rejoindre
                    </button>
                </div>
            </div>
        </motion.div>
    );
}