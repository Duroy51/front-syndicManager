import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Smile, Image as ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ChatBox2 = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Jean Dupont', content: 'Bonjour à tous !', timestamp: new Date(Date.now() - 300000) },
        { id: 2, sender: 'Vous', content: 'Salut Jean, comment ça va ?', timestamp: new Date(Date.now() - 240000) },
        { id: 3, sender: 'Marie Curie', content: 'Bonjour tout le monde ! J\'espère que vous allez bien.', timestamp: new Date(Date.now() - 180000) },
        { id: 4, sender: 'Jean Dupont', content: 'Très bien, merci ! Et vous ?', timestamp: new Date(Date.now() - 120000) },
        { id: 5, sender: 'Vous', content: 'Tout va bien de mon côté aussi !', timestamp: new Date(Date.now() - 60000) },
        { id: 6, sender: 'Marie Curie', content: 'Ok', timestamp: new Date(Date.now() - 30000) },
    ])
    const {t}=useTranslation;// Initialisation correcte du hook useTranslation
    
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, sender: 'Vous', content: newMessage, timestamp: new Date() }])
            setNewMessage('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleFileUpload = () => {
        fileInputRef.current.click()
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-4 h-[calc(100vh-80px)] flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 pr-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 ${message.sender === 'Vous' ? 'text-right' : ''}`}
                        >
                            <div className={`flex items-end ${message.sender === 'Vous' ? 'justify-end' : ''}`}>
                                {message.sender !== 'Vous' && (
                                    <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} alt={message.sender} className="w-8 h-8 rounded-full mr-2" />
                                )}
                                <div>
                                    <p className={`font-bold text-sm mb-1 ${message.sender === 'Vous' ? 'text-blue-600' : 'text-gray-700'}`}>{message.sender}</p>
                                    <div className={`p-2 rounded-lg inline-block max-w-[70%] min-w-[40px] break-words ${message.sender === 'Vous' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
                                        {message.content}
                                    </div>
                                </div>
                                {message.sender === 'Vous' && (
                                    <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} alt={message.sender} className="w-8 h-8 rounded-full ml-2" />
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-inner p-2">
                <button className="text-gray-500 hover:text-blue-500 transition-colors mr-2" aria-label={t(ajouterEmoji)}>
                    <Smile className="h-6 w-6" />
                </button>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('tapezMessage')}
                    className="flex-grow resize-none border-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    rows={1}
                    aria-label={t('champSaisieMessage')}
                />
                <button
                    onClick={handleFileUpload}
                    className="text-gray-500 hover:text-blue-500 transition-colors mx-2"
                    aria-label={t('joindreFichier')}
                >
                    <Paperclip className="h-6 w-6" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => console.log(e.target.files)}
                    aria-hidden="true"
                />
                <button
                    onClick={handleFileUpload}
                    className="text-gray-500 hover:text-blue-500 transition-colors mr-2"
                    aria-label={t('joindreImage')}
                >
                    <ImageIcon className="h-6 w-6" />
                </button>
                <button
                    onClick={handleSend}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-200 flex items-center justify-center"
                    disabled={!newMessage.trim()}
                    aria-label={t('envoyerMessage')}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}