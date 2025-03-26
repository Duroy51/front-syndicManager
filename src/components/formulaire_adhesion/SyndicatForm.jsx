import React, { useState, useRef } from 'react'
import { Camera } from 'lucide-react'
import { useTranslation } from 'react-i18next'
const SyndicatForm = () => {
  const [photo, setPhoto] = useState(null)
  const [idFront, setIdFront] = useState(null)
  const [idBack, setIdBack] = useState(null)
  const [workCert, setWorkCert] = useState(null)
  const [motivation, setMotivation] = useState('')
  const videoRef = useRef(null)
  const [showCamera, setShowCamera] = useState(false)
  const {t}= useTranslation()
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setShowCamera(true)
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err)
    }
  }

  const takePhoto = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    const photoURL = canvas.toDataURL('image/jpeg')
    setPhoto(photoURL)
    setShowCamera(false)
    videoRef.current.srcObject.getTracks().forEach(track => track.stop())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ photo, idFront, idBack, workCert, motivation })
  }

  const renderFilePreview = (file) => {
    if (!file) return null
    return (
      <div className="mt-2">
        <img 
          src={typeof file === 'string' ? file : URL.createObjectURL(file)} 
          alt={t("apercu")} 
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">
            Formulaire d'Adhésion au Syndicat
          </h2>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className="flex gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Télécharger
              </label>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Camera size={20} />
                Prendre une photo
              </button>
            </div>
            {showCamera && (
              <div className="mt-4">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full max-w-md rounded-lg"
                />
                <button
                  type="button"
                  onClick={takePhoto}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Capturer
                </button>
              </div>
            )}
            {renderFilePreview(photo)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Pièce d'identité (Recto)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdFront(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {renderFilePreview(idFront)}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Pièce d'identité (Verso)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdBack(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {renderFilePreview(idBack)}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Motivation
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Expliquez votre motivation à rejoindre le syndicat..."
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Certificat de travail
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => setWorkCert(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {workCert && (
              <p className="mt-2 text-sm text-gray-500">
                Fichier sélectionné: {workCert.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Soumettre la demande
          </button>
        </form>
      </div>
    </div>
  )
}

export default SyndicatForm