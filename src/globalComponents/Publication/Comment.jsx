import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Edit, Trash2, MoreVertical, Clock, Flag } from 'lucide-react';

export const Comment = ({
  comment,
  onReply,
  onLike,
  onToggleReplies,
  onEdit,
  onDelete,
  onReport,
  parentCommentId
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleEdit = () => {
    onEdit(comment.id, editedContent, parentCommentId);
    setIsEditing(false);
    setShowOptions(false);
  };

  const handleReport = (reason) => {
    onReport(comment.id, reason);
    setShowReportModal(false);
    setShowOptions(false);
  };

  const OptionsMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 top-8 bg-white rounded-xl shadow-lg py-2 min-w-[160px] z-10"
    >
      <motion.button
        whileHover={{ backgroundColor: '#F3F4F6' }}
        onClick={() => {
          setIsEditing(true);
          setShowOptions(false);
        }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <Edit className="w-4 h-4 mr-2" />
        Modifier
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: '#F3F4F6' }}
        onClick={() => onDelete(comment.id, parentCommentId)}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Supprimer
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: '#F3F4F6' }}
        onClick={() => setShowReportModal(true)}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <Flag className="w-4 h-4 mr-2" />
        Signaler
      </motion.button>
    </motion.div>
  );

  const ReportModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowReportModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Signaler ce commentaire</h3>
        <div className="space-y-2">
          {[
            'Contenu inapproprié',
            'Harcèlement',
            'Spam',
            'Fausse information',
            'Autre'
          ].map((reason) => (
            <motion.button
              key={reason}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReport(reason)}
              className="w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              {reason}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex space-x-4">
      <img 
        src={comment.author.avatar} 
        alt={comment.author.name} 
        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
      />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-2xl px-6 py-4 relative group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">{comment.author.name}</p>
              <div className="flex items-center ml-3 text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{comment.timestamp}</span>
              </div>
            </div>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </motion.button>
              <AnimatePresence>
                {showOptions && <OptionsMenu />}
              </AnimatePresence>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Enregistrer
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600">{comment.content}</p>
              {comment.image && (
                <img 
                  src={comment.image} 
                  alt="Comment" 
                  className="mt-3 rounded-lg max-w-full h-auto"
                />
              )}
            </>
          )}
        </div>

        <div className="flex gap-6 mt-2 text-sm text-gray-500 px-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center space-x-1 ${comment.liked ? 'text-blue-500 font-medium' : ''}`}
            onClick={() => onLike(comment.id, !!comment.isReply, parentCommentId)}
          >
            <Heart className="w-4 h-4" fill={comment.liked ? "currentColor" : "none"} />
            <span>J'aime {comment.likes > 0 && `(${comment.likes})`}</span>
          </motion.button>

          {!comment.isReply && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1"
              onClick={() => onReply(comment)}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Répondre</span>
            </motion.button>
          )}

          {comment.replies && comment.replies.length > 0 && !comment.isReply && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1"
              onClick={() => onToggleReplies(comment.id)}
            >
              <span>{comment.showReplies ? 'Masquer' : `${comment.replies.length} réponses`}</span>
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {comment.showReplies && comment.replies && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-8 mt-4 space-y-4"
            >
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onToggleReplies={onToggleReplies}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReport={onReport}
                  parentCommentId={comment.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReportModal && <ReportModal />}
        </AnimatePresence>
      </div>
    </div>
  );
};