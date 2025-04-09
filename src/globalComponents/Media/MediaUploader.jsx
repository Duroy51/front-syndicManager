import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, X } from 'lucide-react';

export const MediaUploader = ({ onFileSelect, selectedFile, onClear }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {selectedFile ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden shadow-lg"
        >
          <img 
            src={selectedFile} 
            alt="Preview" 
            className="w-full h-64 object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClear}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 flex flex-col items-center justify-center gap-4"
        >
          <div className="p-4 bg-blue-50 rounded-full">
            <ImageIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-medium">Cliquez pour ajouter une image</p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG jusqu'à 10MB</p>
          </div>
        </motion.button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};