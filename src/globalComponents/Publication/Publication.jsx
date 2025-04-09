import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle, Send, Image as ImageIcon, Smile, X, Plus, Camera, MapPin, Paperclip, Edit, Trash2 } from 'lucide-react';
import { Comment } from './Comment';
import { MediaUploader } from '../Media/MediaUploader';
import { CameraCapture } from '../Media/CameraCapture';

export const Publication = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Jean Dupont",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
      },
      content: "Aujourd'hui, nous avons eu une réunion productive sur les nouvelles mesures de sécurité. Qu'en pensez-vous ?",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop",
      timestamp: "Il y a 2 heures",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 15,
      comments: [
        {
          id: 1,
          author: {
            name: "Marie Martin",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
          },
          content: "Excellente initiative ! J'ai hâte de voir les résultats.",
          timestamp: "Il y a 1 heure",
          liked: false,
          likes: 0,
          replies: []
        },
        {
          id: 2,
          author: {
            name: "Luc Dubois",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
          },
          content: "Pouvons-nous avoir plus de détails sur ces mesures ?",
          timestamp: "Il y a 30 minutes",
          liked: false,
          likes: 0,
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Sophie Lefebvre",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
      },
      content: "Rappel : la formation sur les nouveaux outils de communication aura lieu demain à 14h. N'oubliez pas de vous inscrire !",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
      timestamp: "Il y a 5 heures",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 8,
      comments: []
    }
  ]);
  const [activePostId, setActivePostId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentImage, setCommentImage] = useState(null);
  const [replyToComment, setReplyToComment] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleCreatePost = () => {
    if (newPostContent.trim() || newPostImage) {
      const newPost = {
        id: Date.now(),
        author: {
          name: "Vous",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
        },
        content: newPostContent,
        image: newPostImage,
        timestamp: "À l'instant",
        createdAt: new Date(),
        likes: 0,
        comments: []
      };

      setPosts([newPost, ...posts]);
      handleCancelPost();
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(post);
      setNewPostContent(post.content);
      setNewPostImage(post.image);
      setShowNewPostModal(true);
    }
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id
          ? { ...post, content: newPostContent, image: newPostImage }
          : post
      );
      setPosts(updatedPosts);
      handleCancelPost();
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleCancelPost = () => {
    setNewPostContent('');
    setNewPostImage(null);
    setShowNewPostModal(false);
    setShowCamera(false);
    setEditingPost(null);
  };

  const handleCameraCapture = (image) => {
    setNewPostImage(image);
    setShowCamera(false);
  };

  const handleLike = () => {
    if (!activePostId) return;
    setLiked(!liked);
    setPosts(posts.map(p => 
      p.id === activePostId 
        ? { ...p, likes: p.likes + (liked ? -1 : 1) }
        : p
    ));
  };

  const handleSubmitComment = () => {
    if (!activePostId) return;
    if (newComment.trim() || commentImage) {
      const newCommentObj = {
        id: Date.now(),
        author: { 
          name: "Vous", 
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
        },
        content: newComment,
        image: commentImage,
        timestamp: "À l'instant",
        liked: false,
        likes: 0,
        replies: [],
        showReplies: false
      };

      if (replyToComment) {
        const updatedComments = posts.find(p => p.id === activePostId)?.comments.map(comment => {
          if (comment.id === replyToComment.id) {
            return {
              ...comment,
              replies: [...comment.replies, { ...newCommentObj, isReply: true }]
            };
          }
          return comment;
        });
        setPosts(posts.map(p => 
          p.id === activePostId 
            ? { ...p, comments: updatedComments }
            : p
        ));
        setReplyToComment(null);
      } else {
        setPosts(posts.map(p => 
          p.id === activePostId 
            ? { ...p, comments: [...p.comments, newCommentObj] }
            : p
        ));
      }
      
      setNewComment('');
      setCommentImage(null);
    }
  };

  const handleLikeComment = (commentId, isReply, parentCommentId) => {
    if (!activePostId) return;
    setPosts(posts.map(p => {
      if (p.id !== activePostId) return p;
      
      const updatedComments = p.comments.map(comment => {
      if (isReply && parentCommentId === comment.id) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId
              ? { ...reply, liked: !reply.liked, likes: reply.likes + (reply.liked ? -1 : 1) }
              : reply
          )
        };
      }
      if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.likes + (comment.liked ? -1 : 1)
        };
      }
      return comment;
    });
      
      return { ...p, comments: updatedComments };
    }));
  };

  const handleToggleReplies = (commentId) => {
    if (!activePostId) return;
    setPosts(posts.map(p => {
      if (p.id !== activePostId) return p;
      
      const updatedComments = p.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, showReplies: !comment.showReplies }
        : comment
    );
      
      return { ...p, comments: updatedComments };
    }));
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji);
    setEmojiPickerVisible(false);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform transition-all duration-200 "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowNewPostModal(true)}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingPost ? 'Modifier la publication' : 'Nouvelle publication'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelPost}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <MediaUploader
                onFileSelect={setNewPostImage}
                selectedFile={newPostImage}
                onClear={() => setNewPostImage(null)}
              />

              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Que voulez-vous partager ?"
                className="w-full px-4 py-3 mt-6 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 h-32 resize-none"
              />

              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                    onClick={() => setShowCamera(true)}
                  >
                    <Camera className="w-6 h-6 text-red-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <Paperclip className="w-6 h-6 text-orange-500" />
                  </motion.button>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelPost}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={editingPost ? handleUpdatePost : handleCreatePost}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2 inline-block" />
                    {editingPost ? 'Mettre à jour' : 'Publier'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCamera && (
          <CameraCapture
            isOpen={showCamera}
            onClose={() => setShowCamera(false)}
            onCapture={handleCameraCapture}
          />
        )}
      </AnimatePresence>

      {posts.map((post) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] mx-auto max-w-4xl"
          key={post.id}
        >
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-xl text-gray-800">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
              <div className="ml-auto flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditPost(post.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </motion.button>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

            {post.image && (
              <motion.div 
                className="rounded-xl overflow-hidden mb-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                    {post.likes}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                    <Heart className="w-3 h-3" />
                  </div>
                </div>
                <span className="ml-2">{post.likes} réactions</span>
              </div>
              <span>{post.comments.length} commentaires</span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center px-4 py-2 rounded-xl ${
                  liked 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-all duration-200`}
              >
                <Heart className="w-5 h-5 mr-2" fill={liked ? "currentColor" : "none"} />
                J'aime
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActivePostId(post.id);
                  setShowCommentModal(true);
                }}
                className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Commenter
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Partager
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {showCommentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => {
              setShowCommentModal(false);
              setActivePostId(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Commentaires</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCommentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto mb-6">
                {posts.find(p => p.id === activePostId)?.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={setReplyToComment}
                    onLike={handleLikeComment}
                    onToggleReplies={handleToggleReplies}
                  />
                ))}
              </div>

              {replyToComment && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center"
                >
                  <span className="text-sm text-blue-600">
                    Répondre à <strong>{replyToComment.author.name}</strong>
                  </span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setReplyToComment(null)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
                  alt="Your avatar" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div className="flex-1 flex items-center bg-gray-50 rounded-full px-6 py-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrivez un commentaire..."
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmitComment();
                      }
                    }}
                  />
                  <div className="flex gap-3 ml-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                    >
                      <Smile className="w-5 h-5 text-yellow-500" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ImageIcon className="w-5 h-5 text-green-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-blue-100 rounded-full"
                      onClick={handleSubmitComment}
                    >
                      <Send className="w-5 h-5 text-blue-500" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {emojiPickerVisible && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-24 left-4 bg-white shadow-xl rounded-xl p-4 grid grid-cols-4 gap-2"
                >
                  {["😊", "😂", "❤️", "👍", "😍", "🎉", "🔥", "👏"].map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl hover:bg-gray-100 p-2 rounded-lg"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};