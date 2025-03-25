
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageCircle, Users, Search, Plus, ArrowLeft, Send,
    Paperclip, Image as ImageIcon, Mic, Smile, MoreVertical,
    Phone, Video, ChevronRight, Check, CheckCheck, Lock, UserPlus
} from 'lucide-react'

// Reusable components
const Button = ({ children, onClick, className = '', variant = 'default' }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            variant === 'primary'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : variant === 'ghost'
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } ${className}`}
    >
        {children}
    </button>
)

const Input = ({ value, onChange, placeholder, className = '' }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
)

const ScrollArea = ({ children, className = '' }) => {
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [children])

    return (
        <div ref={scrollRef} className={`overflow-y-auto ${className}`}>
            {children}
        </div>
    )
}

// Chat List Item component
const ChatListItem = ({ chat, onClick, isActive, isGroup = false }) => (
    <div
        onClick={onClick}
        className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg mb-2 transition-colors duration-200 ${
            isActive ? 'bg-blue-100' : ''
        }`}
    >
        <div className="relative">
            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
            {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
        </div>
        <div className="ml-3 flex-grow">
            <div className="flex justify-between items-center">
                <h3 className={`font-semibold text-gray-800 ${isGroup ? 'text-lg' : 'text-base'}`}>{chat.name}</h3>
                <span className="text-sm text-gray-500">{chat.lastMessageTime}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
        </div>
        {isGroup && <ChevronRight className="w-5 h-5 text-gray-400" />}
    </div>
)

// Message component
const Message = ({ message, isSent, isGroup }) => (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isSent && (
            <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full mr-2" />
        )}
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}>
            {!isSent && isGroup && (
                <div className="flex flex-col mb-1">
                    <p className="text-xs font-semibold">{message.sender}</p>
                    <p className="text-xs text-gray-600">{message.phone}</p>
                </div>
            )}
            <p>{message.text}</p>
            <div className={`text-xs mt-1 flex justify-end items-center ${
                isSent ? 'text-blue-100' : 'text-gray-500'
            }`}>
                {message.time}
                {isSent && (
                    message.read ? <CheckCheck className="w-4 h-4 ml-1" /> : <Check className="w-4 h-4 ml-1" />
                )}
            </div>
        </div>
    </div>
)

// Main Chat Interface component
export const ChatBox = () => {
    const [view, setView] = useState('list') // 'list', 'chat', 'search'
    const [chats, setChats] = useState([
        { id: 'group', name: 'Chat de Groupe du Syndicat', avatar: '/placeholder.svg?height=48&width=48', lastMessage: 'Alice: Bonjour à tous !', lastMessageTime: '10:30', online: true, isGroup: true },
        { id: 1, name: 'Jean Dupont', avatar: '/placeholder.svg?height=48&width=48', lastMessage: 'Merci pour l\'information', lastMessageTime: '09:45', online: true, phone: '+33 1 23 45 67 89' },
        { id: 2, name: 'Marie Martin', avatar: '/placeholder.svg?height=48&width=48', lastMessage: 'À quelle heure est la réunion ?', lastMessageTime: 'Hier', online: false, phone: '+33 9 87 65 43 21' },
    ])
    const [activeChat, setActiveChat] = useState(null)
    const [messages, setMessages] = useState({
        group: [
            { id: 1, text: 'Bonjour à tous !', time: '10:30', sender: 'Alice', phone: '+33 6 12 34 56 78', read: true, avatar: '/placeholder.svg?height=32&width=32' },
            { id: 2, text: 'Bienvenue dans le chat de groupe du syndicat.', time: '10:31', sender: 'Bob', phone: '+33 6 23 45 67 89', read: true, avatar: '/placeholder.svg?height=32&width=32' },
            { id: 3, text: 'N\'hésitez pas à poser vos questions ici.', time: '10:32', sender: 'Charlie', phone: '+33 6 34 56 78 90', read: false, avatar: '/placeholder.svg?height=32&width=32' },
        ],
        1: [
            { id: 1, text: 'Bonjour Jean, comment allez-vous ?', time: '09:30', sender: 'Vous', read: true },
            { id: 2, text: 'Très bien, merci ! Et vous ?', time: '09:35', sender: 'Jean Dupont', read: true, avatar: '/placeholder.svg?height=32&width=32' },
        ],
        2: [
            { id: 1, text: 'Marie, pouvez-vous me rappeler l\'heure de la réunion ?', time: '14:00', sender: 'Vous', read: true },
            { id: 2, text: 'Bien sûr, c\'est à 15h demain.', time: '14:05', sender: 'Marie Martin', read: true, avatar: '/placeholder.svg?height=32&width=32' },
        ],
    })
    const [newMessage, setNewMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const [syndicateMembers, setSyndicateMembers] = useState([
        { id: 3, name: 'Pierre Durand', avatar: '/placeholder.svg?height=48&width=48', online: true, phone: '+33 6 11 22 33 44' },
        { id: 4, name: 'Sophie Lefebvre', avatar: '/placeholder.svg?height=48&width=48', online: false, phone: '+33 6 55 66 77 88' },
        // Add more members as needed
    ])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMessageObj = {
                id: messages[activeChat.id].length + 1,
                text: newMessage,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                sender: 'Vous',
                read: false
            }
            setMessages(prevMessages => ({
                ...prevMessages,
                [activeChat.id]: [...prevMessages[activeChat.id], newMessageObj]
            }))
            setNewMessage('')
        }
    }

    const startNewChat = (member) => {
        const existingChat = chats.find(chat => chat.id === member.id)
        if (existingChat) {
            setActiveChat(existingChat)
        } else {
            const newChat = {
                id: member.id,
                name: member.name,
                avatar: member.avatar,
                lastMessage: '',
                lastMessageTime: '',
                online: member.online,
                phone: member.phone
            }
            setChats(prevChats => [...prevChats, newChat])
            setMessages(prevMessages => ({...prevMessages, [member.id]: []}))
            setActiveChat(newChat)
        }
        setView('chat')
    }

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredMembers = syndicateMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !chats.some(chat => chat.id === member.id)
    )

    return (
        <div className="container mx-auto p-4 bg-white min-h-screen flex flex-col rounded-lg shadow-xl">
            <AnimatePresence mode="wait">
                {view === 'list' && (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-grow overflow-hidden flex flex-col"
                    >
                        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center">
                            <MessageCircle className="w-10 h-10 mr-3 text-blue-600" />
                            {t("signaler")}
                        </h1>
                        <div className="mb-4 relative">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t("recherher_une_conversation")}
                                className="pl-10"
                            />
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <ScrollArea className="flex-grow">
                            <h2 className="text-xl font-semibold mb-3 text-blue-600 border-b-2 border-blue-200 pb-2">{t("chat_de_groupe")}</h2>
                            {filteredChats.filter(chat => chat.isGroup).map(chat => (
                                <ChatListItem
                                    key={chat.id}
                                    chat={chat}
                                    onClick={() => {
                                        setActiveChat(chat)
                                        setView('chat')
                                    }}
                                    isGroup={chat.isGroup}
                                    isActive={activeChat && activeChat.id === chat.id}
                                />
                            ))}
                            <div className="my-4 border-t border-gray-200"></div>
                            <h2 className="text-xl font-semibold mb-3 text-blue-600 border-b-2 border-blue-200 pb-2">Chats Privés</h2>
                            {filteredChats.filter(chat => !chat.isGroup).map(chat => (
                                <ChatListItem
                                    key={chat.id}
                                    chat={chat}
                                    onClick={() => {
                                        setActiveChat(chat)
                                        setView('chat')
                                    }}
                                    isActive={activeChat && activeChat.id === chat.id}
                                />
                            ))}
                        </ScrollArea>
                    </motion.div>
                )}

                {view === 'chat' && activeChat && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="flex-grow overflow-hidden flex flex-col h-[calc(100vh-2rem)]"
                    >
                        <div className="flex items-center justify-between mb-4 bg-blue-600 text-white p-4 rounded-t-lg sticky top-0 z-10">
                            <div className="flex items-center">
                                <Button variant="ghost" onClick={() => setView('list')} className="mr-2 text-white hover:bg-blue-700">
                                    <ArrowLeft className="w-6 h-6" />
                                </Button>
                                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="ml-3">
                                    <h2 className="font-semibold">{activeChat.name}</h2>
                                    {activeChat.online && <p className="text-xs">En ligne</p>}
                                    {!activeChat.isGroup && <p className="text-xs">{activeChat.phone}</p>}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" className="text-white hover:bg-blue-700">
                                    <Phone className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" className="text-white hover:bg-blue-700">
                                    <Video className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" className="text-white hover:bg-blue-700">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        {!activeChat.isGroup && (
                            <div className="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded-md flex items-center">
                                <Lock className="w-4 h-4 mr-2" />
                                <span className="text-sm">{t("les_messages_sont_chiffres_de_bout_en_bout")}</span>
                            </div>
                        )}
                        <ScrollArea className="flex-grow  px-4">
                            {messages[activeChat.id].map(message => (
                                <Message key={message.id} message={message} isSent={message.sender === 'Vous'} isGroup={activeChat.isGroup} />
                            ))}
                        </ScrollArea>
                        <div className="border-t border-gray-200 p-3 flex items-center sticky bottom-0 bg-white">
                            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                                <Smile className="w-6 h-6" />
                            </Button>
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Tapez un message..."
                                className="flex-grow mx-2"
                            />
                            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                                <Paperclip className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                                <ImageIcon className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                                <Mic className="w-6 h-6" />
                            </Button>
                            <Button onClick={handleSendMessage} variant="primary" className="rounded-full p-2 ml-2">
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {view === 'search' && (
                    <motion.div
                        key="search"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.2 }}
                        className="flex-grow overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center mb-4">
                            <Button variant="ghost" onClick={() => setView('list')} className="mr-2">
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                            <h2 className="text-xl font-semibold">Nouvelle discussion</h2>
                        </div>
                        <div className="mb-4 relative">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t("rechercher_un_membre")}
                                className="pl-10"
                            />
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <ScrollArea className="flex-grow">
                            {filteredMembers.map(member => (
                                <div
                                    key={member.id}
                                    onClick={() => startNewChat(member)}
                                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg mb-2 transition-colors duration-200"
                                >
                                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                                        <p className="text-sm text-gray-600">{member.phone}</p>
                                    </div>
                                    <UserPlus className="ml-auto text-blue-600" />
                                </div>
                            ))}
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>

            {view === 'list' && (
                <motion.button
                    className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setView('search')}
                >
                    <Plus className="w-6 h-6" />
                </motion.button>
            )}
        </div>
    )
}