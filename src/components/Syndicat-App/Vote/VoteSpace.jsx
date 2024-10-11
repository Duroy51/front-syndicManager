
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Calendar, Plus } from 'lucide-react'

const VoteCard = ({ vote }) => {
    const [userVote, setUserVote] = useState(null)
    const totalVotes = vote.votesFor + vote.votesAgainst
    const forPercentage = totalVotes > 0 ? (vote.votesFor / totalVotes) * 100 : 0

    const handleVote = (voteType) => {
        if (userVote === null) {
            setUserVote(voteType)
            if (voteType === 'for') {
                vote.votesFor++
            } else {
                vote.votesAgainst++
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-200 rounded-lg p-4 transition-shadow duration-300 hover:shadow-md"
        >
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{vote.description}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Clôture le {vote.closingDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => handleVote('for')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition duration-200 ${
                        userVote === 'for' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={userVote !== null}
                >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{vote.votesFor}</span>
                </button>
                <button
                    onClick={() => handleVote('against')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition duration-200 ${
                        userVote === 'against' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={userVote !== null}
                >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{vote.votesAgainst}</span>
                </button>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${forPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-0 h-full bg-blue-500"
                />
            </div>
        </motion.div>
    )
}

 export const VotesList = () => {
    const votes = [
        {
            id: 1,
            description: "Proposition de nouvelle convention collective",
            closingDate: new Date("2023-07-01T23:59:59"),
            votesFor: 45,
            votesAgainst: 15
        },
        {
            id: 2,
            description: "Augmentation des cotisations syndicales de 2%",
            closingDate: new Date("2023-06-15T23:59:59"),
            votesFor: 30,
            votesAgainst: 25
        },
        {
            id: 3,
            description: "Mise en place d'un comité pour l'amélioration des conditions de travail",
            closingDate: new Date("2023-07-31T23:59:59"),
            votesFor: 60,
            votesAgainst: 5
        }
    ]

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Votes en cours</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-flex items-center text-sm transition duration-200"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau vote
                </motion.button>
            </div>
            <div className="space-y-4">
                <AnimatePresence>
                    {votes.map((vote) => (
                        <VoteCard key={vote.id} vote={vote} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

