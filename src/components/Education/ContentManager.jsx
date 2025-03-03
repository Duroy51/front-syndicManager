import React, { useState, useEffect, useCallback, memo } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Radio, Mail, Calendar, Download, Share2 } from 'lucide-react';
import { AppRoutesPaths } from '../../router/appRouter';

// Composant de pagination réutilisable
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center">
      <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="sr-only">Précédent</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
              currentPage === i + 1
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="sr-only">Suivant</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

// Configuration pour les images et autres ressources
const CONFIG = {
  BLOG_IMAGES: {
    FEATURED: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    THUMBNAIL: "https://images.unsplash.com/photo-1557804506-669a67965ba0"
  },
  PODCAST_IMAGES: {
    FEATURED: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
    THUMBNAIL: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"
  },
  NEWSLETTER_IMAGES: {
    FEATURED: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3",
    ARCHIVE: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3"
  }
};

// Mois pour les dates
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Contenu du Blog
const BlogContent = () => {
  const navigate = useNavigate();
  
  // Articles à la une
  const featuredArticles = [
    {
      id: 1,
      title: "Les nouvelles réformes du droit syndical en 2025",
      excerpt: "Découvrez les changements majeurs qui impactent les organisations syndicales cette année.",
      image: `${CONFIG.BLOG_IMAGES.FEATURED}?sig=1`,
      category: "Législation",
      date: "15 mars 2025",
      author: "Marie Dupont"
    },
    {
      id: 2,
      title: "Comment organiser efficacement une assemblée générale",
      excerpt: "Guide pratique pour préparer et animer une assemblée générale qui engage vos membres.",
      image: `${CONFIG.BLOG_IMAGES.FEATURED}?sig=2`,
      category: "Organisation",
      date: "2 février 2025",
      author: "Thomas Leroy"
    },
    {
      id: 3,
      title: "Les stratégies de négociation collective en période d'inflation",
      excerpt: "Analyse des approches efficaces pour défendre les intérêts des travailleurs face à la hausse du coût de la vie.",
      image: `${CONFIG.BLOG_IMAGES.FEATURED}?sig=3`,
      category: "Négociation",
      date: "20 janvier 2025",
      author: "Sophie Martin"
    }
  ];
  
  // Articles récents
  const recentArticles = [
    {
      id: 4,
      title: "L'impact de l'intelligence artificielle sur les relations de travail",
      excerpt: "Comment les syndicats peuvent-ils anticiper et accompagner les transformations liées à l'IA ?",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=4`,
      category: "Technologie",
      date: "5 mars 2025",
      author: "Jean Dubois"
    },
    {
      id: 5,
      title: "Santé au travail : les nouvelles obligations des employeurs",
      excerpt: "Décryptage des mesures renforcées pour la protection de la santé physique et mentale des salariés.",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=5`,
      category: "Santé",
      date: "18 février 2025",
      author: "Claire Moreau"
    },
    {
      id: 6,
      title: "Représentativité syndicale : les critères évoluent",
      excerpt: "Les nouvelles règles qui déterminent la capacité d'un syndicat à négocier des accords collectifs.",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=6`,
      category: "Législation",
      date: "10 février 2025",
      author: "Paul Lefèvre"
    },
    {
      id: 7,
      title: "Communication syndicale : tirer parti des réseaux sociaux",
      excerpt: "Stratégies et bonnes pratiques pour une présence efficace sur les plateformes numériques.",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=7`,
      category: "Communication",
      date: "25 janvier 2025",
      author: "Émilie Blanc"
    },
    {
      id: 8,
      title: "Gestion des conflits au sein des instances représentatives",
      excerpt: "Techniques de médiation et de résolution pour maintenir un dialogue social constructif.",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=8`,
      category: "Management",
      date: "12 janvier 2025",
      author: "Antoine Girard"
    },
    {
      id: 9,
      title: "Les enjeux du syndicalisme face au changement climatique",
      excerpt: "Comment intégrer les préoccupations environnementales dans l'action syndicale ?",
      image: `${CONFIG.BLOG_IMAGES.THUMBNAIL}?sig=9`,
      category: "Environnement",
      date: "5 janvier 2025",
      author: "Lucie Mercier"
    }
  ];
  
  // Catégories populaires
  const popularCategories = [
    { name: "Législation", count: 24 },
    { name: "Négociation", count: 18 },
    { name: "Organisation", count: 15 },
    { name: "Communication", count: 12 },
    { name: "Santé", count: 10 },
    { name: "Technologie", count: 8 }
  ];

  return (
    <div  className="max-w-7xl mx-auto">
      {/* Section des articles à la une */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Articles à la une</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                  <Link to={`/education/blog/article/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                      {article.author.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{article.author}</span>
                  </div>
                  <Link
                    to={`/education/blog/article/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section principale avec articles récents et sidebar */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Articles récents (2/3 de la largeur) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles récents</h2>
          <div className="space-y-8">
            {recentArticles.map((article) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                whileHover={{ y: -3 }}
              >
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    <Link to={`/education/blog/article/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                        {article.author.charAt(0)}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{article.author}</span>
                    </div>
                    <Link
                      to={`/education/blog/article/${article.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              currentPage={1}
              totalPages={3}
              onPageChange={() => {}}
            />
          </div>
        </div>
        
        {/* Sidebar (1/3 de la largeur) */}
        <div className="md:col-span-1">
          {/* Recherche */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rechercher</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Mots-clés..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Catégories */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Catégories</h3>
            <ul className="space-y-2">
              {popularCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Abonnez-vous à notre newsletter</h3>
            <p className="mb-4 text-blue-100">
              Recevez nos derniers articles et actualités directement dans votre boîte mail.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                S'abonner
              </button>
            </form>
            <p className="mt-3 text-xs text-blue-100">
              En vous inscrivant, vous acceptez notre{" "}
              <Link to="/education/privacy" className="underline hover:text-white">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contenu du Podcast
const PodcastContent = () => {
  // Épisodes à la une
  const featuredEpisodes = [
    {
      id: 1,
      title: "Dialogue social et télétravail : les nouveaux défis",
      description: "Comment adapter les pratiques syndicales à l'ère du travail à distance ? Discussion avec des experts du droit social.",
      image: `${CONFIG.PODCAST_IMAGES.FEATURED}?sig=1`,
      duration: "45:18",
      date: "10 mars 2025",
      hosts: ["Marie Dupont", "Thomas Leroy"]
    },
    {
      id: 2,
      title: "La reconversion professionnelle : quel rôle pour les syndicats ?",
      description: "Analyse des dispositifs d'accompagnement et du rôle des représentants du personnel dans les transitions de carrière.",
      image: `${CONFIG.PODCAST_IMAGES.FEATURED}?sig=2`,
      duration: "38:42",
      date: "24 février 2025",
      hosts: ["Sophie Martin", "Jean Dubois"]
    },
    {
      id: 3,
      title: "Négocier efficacement : techniques et stratégies",
      description: "Masterclass sur l'art de la négociation collective avec des témoignages de négociateurs expérimentés.",
      image: `${CONFIG.PODCAST_IMAGES.FEATURED}?sig=3`,
      duration: "52:05",
      date: "15 février 2025",
      hosts: ["Paul Lefèvre", "Claire Moreau"]
    }
  ];
  
  // Épisodes récents
  const recentEpisodes = [
    {
      id: 4,
      title: "Bien-être au travail : au-delà des mots",
      description: "Quelles actions concrètes pour améliorer réellement la qualité de vie au travail ? Retour d'expériences et bonnes pratiques.",
      image: `${CONFIG.PODCAST_IMAGES.THUMBNAIL}?sig=4`,
      duration: "41:23",
      date: "5 février 2025",
      category: "Santé",
      hosts: ["Émilie Blanc"]
    },
    {
      id: 5,
      title: "Les comités sociaux et économiques : bilan après 5 ans",
      description: "Analyse du fonctionnement des CSE et perspectives d'évolution pour renforcer leur efficacité.",
      image: `${CONFIG.PODCAST_IMAGES.THUMBNAIL}?sig=5`,
      duration: "49:37",
      date: "28 janvier 2025",
      category: "Institutions",
      hosts: ["Antoine Girard", "Marie Dupont"]
    },
    {
      id: 6,
      title: "Syndicats et transition écologique : un nouveau terrain d'action",
      description: "Comment les organisations syndicales s'emparent des enjeux environnementaux et les intègrent dans leurs revendications.",
      image: `${CONFIG.PODCAST_IMAGES.THUMBNAIL}?sig=6`,
      duration: "44:15",
      date: "15 janvier 2025",
      category: "Environnement",
      hosts: ["Lucie Mercier", "Thomas Leroy"]
    },
    {
      id: 7,
      title: "L'égalité professionnelle en pratique",
      description: "Décryptage des outils et indicateurs pour mesurer et faire progresser l'égalité femmes-hommes en entreprise.",
      image: `${CONFIG.PODCAST_IMAGES.THUMBNAIL}?sig=7`,
      duration: "39:48",
      date: "8 janvier 2025",
      category: "Égalité",
      hosts: ["Sophie Martin", "Claire Moreau"]
    },
    {
      id: 8,
      title: "Réforme des retraites : comprendre les enjeux",
      description: "Analyse détaillée des dernières évolutions du système de retraite et de leurs impacts sur les travailleurs.",
      image: `${CONFIG.PODCAST_IMAGES.THUMBNAIL}?sig=8`,
      duration: "55:21",
      date: "20 décembre 2024",
      category: "Législation",
      hosts: ["Jean Dubois", "Paul Lefèvre"]
    }
  ];
  
  // Tags populaires
  const popularTags = [
    "Négociation", "Droit social", "CSE", "Formation", "Santé au travail",
    "Égalité", "Retraites", "Télétravail", "Environnement", "Salaires"
  ];

  return (
    <div>
      {/* Section des épisodes à la une */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Épisodes à la une</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredEpisodes.map((episode) => (
            <motion.div
              key={episode.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center text-white mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{episode.duration}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {episode.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                  <a href={`/education/podcast/${episode.id}`}>{episode.title}</a>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{episode.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {episode.hosts.map((host, index) => (
                        <div key={index} className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold border-2 border-white">
                          {host.charAt(0)}
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {episode.hosts.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section principale avec épisodes récents et sidebar */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Épisodes récents (2/3 de la largeur) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Épisodes récents</h2>
          <div className="space-y-6">
            {recentEpisodes.map((episode) => (
              <motion.div
                key={episode.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                whileHover={{ y: -3 }}
              >
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center text-white">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{episode.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {episode.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {episode.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    <a href={`/education/podcast/${episode.id}`}>{episode.title}</a>
                  </h3>
                  <p className="text-gray-600 mb-4">{episode.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {episode.hosts.map((host, index) => (
                          <div key={index} className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold border-2 border-white">
                            {host.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {episode.hosts.join(', ')}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              currentPage={1}
              totalPages={3}
              onPageChange={() => {}}
            />
          </div>
        </div>
        
        {/* Sidebar (1/3 de la largeur) */}
        <div className="md:col-span-1">
          {/* Recherche */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rechercher</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Mots-clés..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags populaires</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <a
                  key={index}
                  href={`/education/podcast/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
          
          {/* S'abonner */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Écoutez-nous sur</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-6h2v6zm-1-6.5c-.828 0-1.5-.672-1.5-1.5S8.172 7 9 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm8 6.5h-2v-4c0-.552-.448-1-1-1s-1 .448-1 1v4h-2v-6h2v1.241c.412-.566 1.044-.958 1.75-.958 1.36 0 2.25 1.054 2.25 2.25V16z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-6h2v6zm-1-6.5c-.828 0-1.5-.672-1.5-1.5S8.172 7 9 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm8 6.5h-2v-4c0-.552-.448-1-1-1s-1 .448-1 1v4h-2v-6h2v1.241c.412-.566 1.044-.958 1.75-.958 1.36 0 2.25 1.054 2.25 2.25V16z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-6h2v6zm-1-6.5c-.828 0-1.5-.672-1.5-1.5S8.172 7 9 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm8 6.5h-2v-4c0-.552-.448-1-1-1s-1 .448-1 1v4h-2v-6h2v1.241c.412-.566 1.044-.958 1.75-.958 1.36 0 2.25 1.054 2.25 2.25V16z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-6h2v6zm-1-6.5c-.828 0-1.5-.672-1.5-1.5S8.172 7 9 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm8 6.5h-2v-4c0-.552-.448-1-1-1s-1 .448-1 1v4h-2v-6h2v1.241c.412-.566 1.044-.958 1.75-.958 1.36 0 2.25 1.054 2.25 2.25V16z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Restez informé</h3>
            <p className="mb-4 text-blue-100">
              Recevez nos nouveaux épisodes et contenus exclusifs directement dans votre boîte mail.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contenu de la Newsletter
const NewsletterContent = () => {
  // Témoignages
  const testimonials = [
    {
      name: "Thomas Leroy",
      role: "Délégué syndical, secteur bancaire",
      quote: "La newsletter de SyndicManager est devenue ma source d'information privilégiée. Des analyses juridiques claires et des conseils pratiques qui m'aident au quotidien.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Marie Dupont",
      role: "Secrétaire de CSE, grande distribution",
      quote: "Je recommande cette newsletter à tous mes collègues. Elle nous permet de rester à jour sur les évolutions législatives et de découvrir des bonnes pratiques inspirantes.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Jean Dubois",
      role: "Représentant syndical, secteur public",
      quote: "Un contenu de qualité, bien documenté et accessible. La newsletter m'aide à préparer efficacement mes réunions et à anticiper les évolutions du dialogue social.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              La newsletter des acteurs du dialogue social
            </h2>
            <p className="text-blue-100 mb-6">
              Chaque mois, recevez une analyse approfondie de l'actualité syndicale, des décryptages juridiques et des conseils pratiques pour renforcer votre action.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Adresse email"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700">
                  <option value="">Sélectionnez votre secteur d'activité</option>
                  <option value="public">Secteur public</option>
                  <option value="prive">Secteur privé</option>
                  <option value="sante">Santé</option>
                  <option value="education">Éducation</option>
                  <option value="industrie">Industrie</option>
                  <option value="services">Services</option>
                  <option value="commerce">Commerce</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <motion.button
                className="w-full bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                S'abonner gratuitement
              </motion.button>
            </form>
            <p className="mt-4 text-xs text-blue-200">
              En vous inscrivant, vous acceptez notre{" "}
              <Link to="/education/privacy" className="underline hover:text-white">
                politique de confidentialité
              </Link>
              . Vous pourrez vous désabonner à tout moment.
            </p>
          </div>
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
            <img
              src={CONFIG.NEWSLETTER_IMAGES.FEATURED}
              alt="Newsletter SyndicManager"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ce que vous recevrez */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Ce que vous recevrez chaque mois
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Analyses juridiques
            </h3>
            <p className="text-gray-600">
              Décryptage des nouvelles lois, jurisprudences et réformes qui impactent le monde syndical et les relations sociales.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Conseils pratiques
            </h3>
            <p className="text-gray-600">
              Méthodologies, outils et bonnes pratiques pour renforcer votre efficacité dans vos missions de représentation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Interviews exclusives
            </h3>
            <p className="text-gray-600">
              Témoignages et retours d'expérience de syndicalistes, experts et acteurs du dialogue social.
            </p>
          </div>
        </div>
      </section>

      {/* Aperçu du contenu */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Aperçu de nos dernières éditions
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative min-h-[250px] md:min-h-0">
              <img
                src={`${CONFIG.NEWSLETTER_IMAGES.ARCHIVE}?sig=10`}
                alt="Édition de mars 2025"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Édition #12
                </span>
                <span className="ml-3 text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Mars 2025
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Spécial : Les nouvelles formes de mobilisation collective
              </h3>
              <p className="text-gray-600 mb-6">
                Dans cette édition, nous explorons comment les syndicats réinventent leurs modes d'action face aux mutations du monde du travail. Au sommaire : l'utilisation des réseaux sociaux comme levier de mobilisation, les nouvelles formes de grève adaptées au télétravail, et un entretien exclusif avec la sociologue Marie Dupont sur l'évolution des mouvements sociaux.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Mobilisation
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Réseaux sociaux
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Télétravail
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Interview
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>16 pages</span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/education/newsletter/archives"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                  >
                    <span>Voir les archives</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Ce qu'en disent nos abonnés
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Page Politique de confidentialité
const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Politique de confidentialité
      </h1>
      <p className="text-gray-600">Dernière mise à jour : 25 février 2025</p>
    </div>

    <div className="prose prose-blue max-w-none">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          1. Collecte des informations
        </h2>
        <p className="text-gray-600 mb-4">
          Nous recueillons les informations que vous nous fournissez volontairement lors de votre inscription à notre newsletter, notamment votre nom, prénom, adresse email et secteur d'activité. Ces informations sont nécessaires pour vous fournir le service demandé et personnaliser votre expérience.
        </p>
        <p className="text-gray-600">
          Nous collectons également des données d'utilisation anonymes pour améliorer nos services, comme les taux d'ouverture des emails, les clics sur les liens et les préférences de contenu.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          2. Utilisation des données
        </h2>
        <p className="text-gray-600 mb-4">
          Les informations que nous collectons sont utilisées pour :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Fournir et maintenir notre service de newsletter</li>
          <li>Personnaliser votre expérience utilisateur</li>
          <li>Améliorer nos contenus et services</li>
          <li>Vous informer des mises à jour et nouvelles fonctionnalités</li>
          <li>Analyser l'utilisation de nos services pour les optimiser</li>
        </ul>
        <p className="text-gray-600">
          Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers, sauf si nous vous en informons préalablement et obtenons votre consentement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3. Protection des données
        </h2>
        <p className="text-gray-600 mb-4">
          Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisés. Ces mesures incluent :
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Le chiffrement des données sensibles</li>
          <li>Des sauvegardes régulières</li>
          <li>Des contrôles d'accès stricts</li>
          <li>Des audits de sécurité périodiques</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          4. Vos droits
        </h2>
        <p className="text-gray-600 mb-4">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification des informations inexactes</li>
          <li>Droit à l'effacement de vos données</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          5. Cookies et technologies similaires
        </h2>
        <p className="text-gray-600">
          Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être averti lorsqu'un cookie est envoyé. Cependant, certaines fonctionnalités du site peuvent ne pas fonctionner correctement sans cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          6. Modifications de la politique de confidentialité
        </h2>
        <p className="text-gray-600">
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          7. Nous contacter
        </h2>
        <p className="text-gray-600 mb-6">
          Si vous avez des questions concernant cette politique de confidentialité ou vos données personnelles, veuillez nous contacter à l'adresse suivante : privacy@syndicmanager.com
        </p>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Délégué à la protection des données</h3>
          <p className="text-gray-600">
            SyndicManager<br />
            À l'attention du DPO<br />
            123 Avenue de la République<br />
            75011 Paris, France
          </p>
        </div>
      </section>
    </div>
  </div>
);

// Page Archives
const NewsletterArchives = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Archives des newsletters
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Consultez toutes nos éditions précédentes et accédez à l'ensemble de nos analyses, guides et interviews.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="md:flex justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Filtrer les archives</h2>
            <p className="text-sm text-gray-500">Trouvez rapidement les informations que vous recherchez</p>
          </div>
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Rechercher par mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Année</h3>
            <div className="flex flex-wrap gap-2">
              {[2025, 2024, 2023].map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Catégorie</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="legislation">Législation</option>
              <option value="negotiation">Négociation</option>
              <option value="rights">Droits des travailleurs</option>
              <option value="health">Santé au travail</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Format</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">PDF</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg">HTML</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg">Audio</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="aspect-[3/4] bg-gray-100 rounded-t-xl overflow-hidden relative">
              <img
                src={`${CONFIG.NEWSLETTER_IMAGES.ARCHIVE}?sig=${index}`}
                alt={`Newsletter ${months[index]} ${selectedYear}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-2">
                    Édition #{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {months[index]} {selectedYear}
                </h3>
                <div className="flex items-center text-blue-100 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Publié le {Math.min(28, index + 1)} {months[index]} {selectedYear}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-gray-800 mb-4">
                Thèmes principaux
              </h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Négociations salariales dans le secteur public",
                  "Réforme des retraites : les points clés",
                  "Droits des télétravailleurs : ce qui change"
                ].map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>12 pages</span>
                </div>
                <div className="flex space-x-2">
                  <a 
                    href="#"
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Lire en ligne"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  <a 
                    href="#"
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <a 
                    href="#"
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Partager"
                  >
                    <Share2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
};

// Configuration des sections
const SECTIONS = [
  {
    id: 'blog',
    label: 'Blog',
    Icon: BookOpen,
  },
  {
    id: 'podcast',
    label: 'Podcast',
    Icon: Radio,
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    Icon: Mail,
  }
];

// Hook personnalisé pour la gestion du contenu
const useContentLoader = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const switchSection = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);
  return { isTransitioning, switchSection };
};

// Composants mémorisés
export const MemoizedBlogContent = memo(BlogContent);
export const MemoizedPodcastContent = memo(PodcastContent);
export const MemoizedNewsletterContent = memo(NewsletterContent);
export const MemoizedPrivacyPolicy = memo(PrivacyPolicy);
export const MemoizedNewsletterArchives = memo(NewsletterArchives);

// Composant principal
const ContentManager = () => {
  const { '*': section } = useParams();
  const navigate = useNavigate();
  const activeSection = section || 'blog';
  const { isTransitioning, switchSection } = useContentLoader();

  // Rediriger vers /education/blog si l'URL est juste /education
  useEffect(() => {
    if (!section || section === '/') {
      navigate('/education/blog', { replace: true });
    }
  }, [section, navigate]);

  useEffect(() => {
    switchSection();
  }, [activeSection, switchSection]);

  // Fonction pour changer de section et mettre à jour l'URL
  const handleSectionChange = (sectionId) => {
    navigate(`/education/${sectionId}`);
  };

  // Rendu conditionnel basé sur la section active
  const renderContent = () => {
    if (section === 'privacy') {
      return <MemoizedPrivacyPolicy />;
    } else if (section === 'archives') {
      return <MemoizedNewsletterArchives />;
    } else if (section === 'blog/article/1' || section === 'blog/article/2' || section === 'blog/article/3') {
      const BlogArticle = React.lazy(() => import('../education/BlogArticle'));
      return <React.Suspense fallback={<div>Chargement...</div>}><BlogArticle /></React.Suspense>;
    } else {
      switch(activeSection) {
        case 'blog':
          return <MemoizedBlogContent />;
        case 'podcast':
          return <MemoizedPodcastContent />;
        case 'newsletter':
          return <MemoizedNewsletterContent />;
        default:
          return <MemoizedBlogContent />;
      }
    }
  };
   
  return (
    <div className="min-h-screen bg-gray-50">
      {section !== 'privacy' && section !== 'archives' && !section?.startsWith('blog/article/') && (
        <nav role="navigation" aria-label="Sections principales" className="sticky top-0 bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div role="tablist" className="flex flex-wrap justify-center gap-2 py-4">
              {SECTIONS.map((sectionItem) => (
                <motion.button
                  key={sectionItem.id}
                  role="tab"
                  aria-controls={`${sectionItem.id}-panel`}
                  aria-selected={activeSection === sectionItem.id}
                  onClick={() => handleSectionChange(sectionItem.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === sectionItem.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <sectionItem.Icon className="w-5 h-5 mr-2" />
                  <span>{sectionItem.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="relative h-1 w-full max-w-xl">
                <motion.div
                  className="absolute h-1 bg-blue-600 rounded-t"
                  initial={false}
                  animate={{
                    left: `${SECTIONS.findIndex(s => s.id === activeSection) * 33.33}%`,
                    width: '33.33%'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection || section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default memo(ContentManager);