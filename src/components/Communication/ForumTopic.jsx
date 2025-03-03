import React, { useState } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark, MessageSquare, ThumbsUp, Flag, Award, Send, Paperclip, Smile } from 'lucide-react';

// Configuration
const CONFIG = {
  AVATARS: {
    USER: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    FEMALE1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    FEMALE2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    MALE1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    MALE2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
};

const ForumTopic = () => {
  const { id } = useParams();
  const [replyContent, setReplyContent] = useState('');
  
  // Données de démonstration pour un sujet de forum
  const topic = {
    id: 1,
    title: "Comment aborder la négociation sur le télétravail ?",
    content: `
      <p>Bonjour à tous,</p>
      
      <p>Notre entreprise souhaite mettre en place une politique de télétravail suite à la période COVID. La direction nous a informés qu'elle souhaitait ouvrir des négociations sur ce sujet le mois prochain.</p>
      
      <p>En tant que délégué syndical, je souhaiterais préparer au mieux cette négociation. Quels sont selon vous les points essentiels à aborder et à négocier ? Avez-vous des retours d'expérience sur des accords similaires ?</p>
      
      <p>Je suis particulièrement intéressé par :</p>
      <ul>
        <li>Le nombre de jours de télétravail à négocier</li>
        <li>La prise en charge des frais (équipement, internet, électricité)</li>
        <li>Le droit à la déconnexion</li>
        <li>Les modalités de contrôle du temps de travail</li>
      </ul>
      
      <p>Merci d'avance pour vos conseils !</p>
    `,
    author: { name: "Marie Dupont", avatar: CONFIG.AVATARS.FEMALE1, role: "Délégué syndical", posts: 47 },
    date: "Il y a 2 heures",
    category: "Négociation",
    tags: ["Télétravail", "Négociation", "Accord d'entreprise"],
    views: 89,
    likes: 12
  };
  
  // Réponses de démonstration
  const replies = [
    {
      id: 1,
      content: `
        <p>Bonjour Marie,</p>
        
        <p>J'ai récemment participé à une négociation similaire dans mon entreprise. Voici les points qui ont été particulièrement importants :</p>
        
        <ol>
          <li><strong>Volontariat</strong> : Nous avons insisté pour que le télétravail reste sur la base du volontariat.</li>
          <li><strong>Réversibilité</strong> : Possibilité pour le salarié de revenir sur sa décision avec un préavis raisonnable.</li>
          <li><strong>Équipement</strong> : Nous avons obtenu une prime d'équipement de 500€ pour l'achat de matériel ergonomique, plus une allocation mensuelle de 50€ pour les frais courants.</li>
          <li><strong>Horaires</strong> : Maintien des mêmes horaires qu'en présentiel, avec une flexibilité encadrée.</li>
          <li><strong>Droit à la déconnexion</strong> : Mise en place d'un système bloquant les emails en dehors des heures de travail.</li>
        </ol>
        
        <p>Je vous conseille également de prévoir des clauses sur :</p>
        <ul>
          <li>La prévention des risques psychosociaux liés à l'isolement</li>
          <li>L'égalité de traitement entre télétravailleurs et non-télétravailleurs</li>
          <li>Les modalités de communication avec les représentants du personnel</li>
        </ul>
        
        <p>N'hésitez pas si vous avez des questions spécifiques !</p>
      `,
      author: { name: "Thomas Leroy", avatar: CONFIG.AVATARS.MALE1, role: "Expert juridique", posts: 156 },
      date: "Il y a 1 heure",
      likes: 8,
      isExpert: true
    },
    {
      id: 2,
      content: `
        <p>Dans notre accord, nous avons également négocié :</p>
        
        <ul>
          <li>Un maximum de 3 jours de télétravail par semaine</li>
          <li>Une journée fixe de présence obligatoire pour tous (le jeudi) pour maintenir la cohésion d'équipe</li>
          <li>Une assurance spécifique pour couvrir les accidents du travail à domicile</li>
          <li>Un droit à la formation sur les outils numériques et l'organisation du travail à distance</li>
        </ul>
        
        <p>Attention au piège de la surveillance excessive : la direction voulait mettre en place un logiciel de suivi d'activité, nous avons réussi à l'éviter en proposant plutôt un management par objectifs.</p>
      `,
      author: { name: "Sophie Martin", avatar: CONFIG.AVATARS.FEMALE2, role: "Délégué syndical", posts: 73 },
      date: "Il y a 45 minutes",
      likes: 5
    },
    {
      id: 3,
      content: `
        <p>Un point souvent négligé mais important : l'impact du télétravail sur les tickets restaurant.</p>
        
        <p>Nous avons obtenu le maintien des tickets restaurant pour les jours télétravaillés, ce qui n'était pas gagné d'avance car la jurisprudence n'est pas très claire sur ce point.</p>
        
        <p>Autre élément : prévoyez des dispositions spécifiques pour les salariés en situation de handicap ou ayant des contraintes familiales particulières.</p>
      `,
      author: { name: "Lucas Bernard", avatar: CONFIG.AVATARS.MALE2, role: "Membre CSSCT", posts: 29 },
      date: "Il y a 30 minutes",
      likes: 3
    }
  ];
  
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      // Ici, vous ajouteriez la logique pour envoyer la réponse
      setReplyContent('');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back button */}
      <Link to="/communication/forum" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Retour au forum</span>
      </Link>
      
      {/* Topic header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {topic.category}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {topic.date}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500 flex items-center">
              <User className="w-4 h-4 mr-1" />
              {topic.views} vues
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {topic.title}
          </h1>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="relative">
                <img
                  src={topic.author.avatar}
                  alt={topic.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  {topic.author.posts}
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{topic.author.name}</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {topic.author.role}
                </span>
              </div>
              <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }} />
              
              <div className="flex flex-wrap gap-2 mt-4 mb-4">
                {topic.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    <span>J'aime ({topic.likes})</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Share2 className="w-5 h-5 mr-2" />
                    <span>Partager</span>
                  </button>
                </div>
                <button className="flex items-center text-gray-600 hover:text-red-600">
                  <Flag className="w-5 h-5 mr-2" />
                  <span>Signaler</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Replies */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Réponses ({replies.length})
        </h2>
        
        <div className="space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {reply.isExpert && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                          <Award className="w-4 h-4" />
                        </div>
                      )}
                      {!reply.isExpert && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                          {reply.author.posts}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{reply.author.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reply.isExpert 
                          ? 'bg-yellow-50 text-yellow-700' 
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {reply.author.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        {reply.date}
                      </span>
                    </div>
                    <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: reply.content }} />
                    
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                      <div className="flex space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-blue-600">
                          <ThumbsUp className="w-5 h-5 mr-2" />
                          <span>J'aime ({reply.likes})</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-600">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          <span>Répondre</span>
                        </button>
                      </div>
                      <button className="flex items-center text-gray-600 hover:text-red-600">
                        <Flag className="w-5 h-5 mr-2" />
                        <span>Signaler</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reply form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Votre réponse
          </h3>
          
          <form onSubmit={handleSubmitReply}>
            <div className="mb-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Partagez votre expertise ou posez une question..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg ${
                  replyContent.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500'
                } transition-colors`}
                disabled={!replyContent.trim()}
              >
                Publier la réponse
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Related topics */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Discussions similaires
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              <Link to="/communication/forum/topic/2">Négocier les frais de télétravail : quels montants ?</Link>
            </h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">15 réponses</span>
              <span className="text-gray-500">Il y a 1 semaine</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              <Link to="/communication/forum/topic/3">Droit à la déconnexion : exemples de clauses efficaces</Link>
            </h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">23 réponses</span>
              <span className="text-gray-500">Il y a 2 semaines</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              <Link to="/communication/forum/topic/4">Contrôle du temps de travail en télétravail : quelles limites ?</Link>
            </h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">9 réponses</span>
              <span className="text-gray-500">Il y a 3 jours</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              <Link to="/communication/forum/topic/5">Télétravail et égalité professionnelle : points de vigilance</Link>
            </h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">7 réponses</span>
              <span className="text-gray-500">Il y a 5 jours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTopic;