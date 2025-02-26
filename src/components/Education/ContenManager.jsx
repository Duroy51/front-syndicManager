
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, Radio, Mail } from 'lucide-react';

// Définition des composants de contenu 
const BlogContent = () => {
    return (
        <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 pb-3 border-b border-gray-200">
        Actualités syndicales
        </h2>
          {/* Article à la une */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="md:flex">
            <div className="md:w-2/5 h-64 md:h-auto bg-blue-100">
            <img 
                src="/api/placeholder/600/400" 
                alt="Article à la une" 
                className="w-full h-full object-cover"
            />
            </div>
            <div className="p-6 md:w-3/5">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full mb-4">
                À la une
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Avancées des négociations sectorielles
            </h3>
            <p className="text-gray-500 text-sm mb-4">
                Publié le 20 février 2025 • Par Marie Dupont
            </p>
            <p className="text-gray-600 mb-6">
                Les représentants syndicaux ont obtenu des avancées significatives concernant les conditions de travail et les compensations pour les heures supplémentaires lors des dernières négociations...
            </p>
            <a href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                Lire l'article complet
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
            </div>
        </div>
        </div>

           {/* Grille d'articles */}
        <h3 className="text-xl font-semibold text-gray-700 mt-10 mb-6">
        Articles récents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 bg-gray-200">
                <img 
                src={`/api/placeholder/400/${300 + index*10}`} 
                alt={`Article ${index}`}
                className="w-full h-full object-cover" 
                />
            </div>
            <div className="p-5">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mb-3">
                Droits des travailleurs
                </span>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Guide pratique : connaître vos droits {index}
                </h4>
                <p className="text-gray-500 text-sm mb-3">
                {18 - index} février 2025
                </p>
                <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                Lire l'article
                </a>
            </div>
            </div>
        ))}
        </div>
          {/* Pagination */}
            <div className="flex justify-center items-center mt-10">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-white cursor-not-allowed" disabled>
            &larr; Précédent
        </button>
        <span className="mx-6 text-gray-500">Page 1 sur 5</span>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
            Suivant &rarr;
        </button>
        </div>
    </div>
    );};

const PodcastContent = () => {
    return (
    <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 pb-3 border-b border-gray-200">
        Nos podcasts
        </h2>

      {/* Podcast à la une */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-50 p-6">
            <div className="flex flex-col md:flex-row items-center">
            <div className="w-48 h-48 flex-shrink-0 mb-6 md:mb-0 md:mr-6 rounded-lg shadow-md overflow-hidden">
                <img 
                src="/api/placeholder/300/300" 
                alt="Artwork du podcast" 
                className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start">
                <button className="w-16 h-16 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg mb-6 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
                </button>

                <div className="w-full">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: '35%' }}></div>
                </div>

                <div className="flex justify-end mt-2">
                    <span className="text-sm text-gray-500">14:25 / 41:30</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Épisode 24 : L'avenir du télétravail
            </h3>
            <p className="text-gray-500 text-sm mb-4">
            Animé par Thomas Lefebvre
            </p>
            <p className="text-gray-600 mb-6">
            Dans cet épisode, nous explorons les implications à long terme du télétravail pour les droits des employés et les nouvelles pratiques managériales qui émergent dans ce contexte.
            </p>
            <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                Télétravail
            </span>
            <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                Droits numériques
            </span>
            <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                Équilibre vie pro/perso
            </span>
            </div>
        </div>
        </div>

      {/* Liste d'épisodes */}
        <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Épisodes récents
        </h3>

        <div className="space-y-4">
            {[
            { num: 23, title: "Négociations collectives : stratégies gagnantes", duration: "38 min • 14 février 2025" },
            { num: 22, title: "Bien-être au travail : vers un nouveau paradigme", duration: "42 min • 7 février 2025" },
            { num: 21, title: "La reconversion professionnelle : témoignages", duration: "35 min • 31 janvier 2025" }
            ].map(episode => (
            <div key={episode.num} className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-700 rounded-full font-bold mr-4">
                {episode.num}
                </div>
                <div className="flex-1">
                <h4 className="font-medium text-gray-800">{episode.title}</h4>
                <p className="text-sm text-gray-500">{episode.duration}</p>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-50 rounded-full transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                </svg>
                </button>
            </div>
            ))}
        </div>
        </div>

      {/* Liens d'abonnement */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">
            Abonnez-vous sur
        </h4>
        <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center px-5 py-3 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors duration-200">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.52 17.52c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.16-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.36c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.44-.48.12-.96-.18-1.08-.66-.12-.48.18-.96.66-1.08 4.38-1.32 9.78-.66 13.5 1.62.36.24.54.78.24 1.26zm.12-3.36c-3.84-2.28-10.2-2.5-13.86-1.38-.6.12-1.2-.24-1.32-.84-.12-.6.24-1.2.84-1.32 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36H19.08z"/>
            </svg>
            Spotify
            </a>
            <a href="#" className="flex items-center px-5 py-3 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors duration-200">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-8h2v8zm-1-9.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm8 9.5h-2v-4c0-1.5-3-1.5-3 0v4h-2v-8h2v1.25c1.75-2.25 5-1.25 5 2.25V16z"/>
            </svg>
            Apple Podcasts
            </a>
            <a href="#" className="flex items-center px-5 py-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 17V7l8 5.047L11 17z"/>
            </svg>
            Google Podcasts
            </a>
            <a href="#" className="flex items-center px-5 py-3 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg transition-colors duration-200">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6,21.5C5.172,21.5 4.5,20.828 4.5,20C4.5,19.172 5.172,18.5 6,18.5C6.828,18.5 7.5,19.172 7.5,20C7.5,20.828 6.828,21.5 6,21.5M6,16.5C3.243,16.5 1,18.744 1,21.5H3C3,19.846 4.346,18.5 6,18.5V16.5M6,13.5C1.29,13.5 -2,16.79 -2,21.5H0C0,17.895 2.694,15.5 6,15.5V13.5M19,3L15,7L19,11V3M7,3V5H21V19H7V21H23V3H7Z"/>
            </svg>
            RSS
            </a>
        </div>
        </div>
    </div>
    );
};

const NewsletterContent = () => {
    return (
    <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 pb-3 border-b border-gray-200">
        Newsletter syndicale
        </h2>

      {/* Section héro */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
            <div className="md:w-2/5 h-64 md:h-auto bg-blue-50">
            <img 
                src="/api/placeholder/600/800" 
                alt="Newsletter illustration" 
                className="w-full h-full object-cover"
            />
            </div>
            <div className="p-8 md:w-3/5">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Restez informé des dernières avancées syndicales
            </h3>
            <p className="text-gray-600 mb-6">
                Notre newsletter hebdomadaire vous tient au courant des négociations en cours, des nouvelles réglementations et des actions syndicales importantes.
            </p>
            <ul className="space-y-2 mb-6">
                {[
                "Résumé hebdomadaire des actualités syndicales",
                "Analyse juridique des nouvelles réglementations",
                "Témoignages de membres et réussites",
                "Événements et formations à venir"
                ].map((item, index) => (
                <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>

      {/* Formulaire d'inscription */}
        <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
            S'inscrire à la newsletter
        </h3>

        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
                </label>
                <input
                type="text"
                id="firstname"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
                </label>
                <input
                type="text"
                id="lastname"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            </div>

            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
            </label>
            <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
          
            <div>
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                Secteur d'activité
            </label>
            <select
                id="sector"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                <option value="">Sélectionnez votre secteur</option>
                <option value="education">Éducation</option>
                <option value="health">Santé</option>
                <option value="industry">Industrie</option>
                <option value="services">Services</option>
                <option value="public">Fonction publique</option>
                <option value="other">Autre</option>
            </select>
            </div>

            <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                id="consent"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
                />
            </div>
            <div className="ml-3">
                <label htmlFor="consent" className="text-sm text-gray-600">
                J'accepte de recevoir la newsletter et comprends que je peux me désinscrire à tout moment.
                </label>
            </div>
            </div>
            <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
            S'abonner
            </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
            <p>
            Nous respectons votre vie privée. Vos données ne seront jamais partagées avec des tiers.
            <a href="#" className="text-blue-600 hover:underline ml-1">
                Politique de confidentialité
            </a>
            </p>
        </div>
        </div>

      {/* Aperçu newsletter */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Aperçu du dernier numéro
        </h3>

        <div className="max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-inner mb-6">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200">
            <img 
                src="/api/placeholder/400/500" 
                alt="Aperçu de la newsletter" 
                className="w-full h-full object-cover object-top" 
            />
            </div>
        </div>

        <a href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
            Consulter les archives
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
        </div>
    </div>
    );

};

// Utiliser React.memo avec displayName
const MemoizedBlogContent = React.memo(BlogContent);
MemoizedBlogContent.displayName = 'BlogContent';

const MemoizedPodcastContent = React.memo(PodcastContent);
MemoizedPodcastContent.displayName = 'PodcastContent';

const MemoizedNewsletterContent = React.memo(NewsletterContent);
MemoizedNewsletterContent.displayName = 'NewsletterContent';

// Configuration des sections
const SECTIONS = {
    BLOG: {
    id: 'blog',
    label: 'Blog',
    Icon: BookOpen,
    Component: MemoizedBlogContent
    },
    PODCAST: {
    id: 'podcast',
    label: 'Podcast',
    Icon: Radio,
    Component: MemoizedPodcastContent
    },
    NEWSLETTER: {
    id: 'newsletter',
    label: 'Newsletter',
    Icon: Mail,
    Component: MemoizedNewsletterContent
    }
};

// Composant d'erreur réutilisable
const ErrorMessage = ({ onRetry }) => (
    <div className="p-8 text-center bg-red-50 text-red-600 rounded-lg space-y-4">
    <p>Impossible de charger le contenu. Veuillez réessayer.</p>
    <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        aria-label="Réessayer le chargement"
    >
        Réessayer
    </button>
    </div>
);
ErrorMessage.displayName = 'ErrorMessage';

// Wrapper de transition
const TransitionWrapper = ({ children, isActive }) => (
    <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    {children}
    </div>
);
TransitionWrapper.displayName = 'TransitionWrapper';

// Hook personnalisé pour la gestion du contenu
const useContentLoader = (initialSection) => {
    const [state, setState] = useState({
    activeSection: initialSection,
    isLoading: true,
    content: null,
    contentCache: {},
    isTransitioning: false
    });

    const fetchSectionContent = useCallback(async (sectionId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        const SectionComponent = Object.values(SECTIONS).find(
            s => s.id === sectionId
        )?.Component || (() => <div>Contenu non disponible</div>);
        resolve(<SectionComponent />);
        }, 800);
    });
    }, []);

    const loadSectionContent = useCallback(async (sectionId) => {
    setState(prev => ({ ...prev, isLoading: true }));

    if (state.contentCache[sectionId]) {
        setState(prev => ({
        ...prev,
        content: prev.contentCache[sectionId],
        isLoading: false,
        isTransitioning: false
        }));
        return;
    }

    try {
        const fetchedContent = await fetchSectionContent(sectionId);
        setState(prev => ({
        ...prev,
        contentCache: { ...prev.contentCache, [sectionId]: fetchedContent },
        content: fetchedContent,
        isLoading: false,
        isTransitioning: false
        }));
    } catch (error) {
        console.error('Erreur de chargement:', error);
        setState(prev => ({
        ...prev,
        content: <ErrorMessage onRetry={() => loadSectionContent(sectionId)} />,
        isLoading: false,
        isTransitioning: false
        }));
    }
    }, [state.contentCache, fetchSectionContent]);

    const switchSection = useCallback((sectionId) => {
    if (state.activeSection === sectionId || state.isTransitioning) return;
    setState(prev => ({ ...prev, isTransitioning: true }));
    setTimeout(() => {
        setState(prev => ({ ...prev, activeSection: sectionId }));
        loadSectionContent(sectionId);
    }, 300);
    }, [state.activeSection, state.isTransitioning, loadSectionContent]);

    return { ...state, switchSection };
};

// Composant principal
const ContentManager = () => {
    const { activeSection, isLoading, content, switchSection, isTransitioning } = 
    useContentLoader(SECTIONS.BLOG.id);

    return (
    <div className="min-h-screen bg-gray-50">
        <nav role="navigation" aria-label="Sections principales" className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
            <div role="tablist" className="flex flex-wrap justify-center gap-2 py-4">
            {Object.values(SECTIONS).map((section) => (
                <button
                key={section.id}
                role="tab"
                aria-controls={`${section.id}-panel`}
                aria-selected={activeSection === section.id}
                onClick={() => switchSection(section.id)}
                className={`flex items-center px-3 py-1.5 mx-1 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === section.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onKeyDown={(e) => {
                    if (['Enter', ' '].includes(e.key)) {
                    switchSection(section.id);
                    }
                }}
                >
                <section.Icon className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{section.label}</span>
                </button>
            ))}
            </div>

            <div className="flex justify-center">
            <div className="relative h-1 w-full max-w-xl">
                <div
                className={`absolute h-1 w-1/3 bg-blue-600 rounded-t transition-all duration-300 ease-in-out ${
                    Object.values(SECTIONS).findIndex(s => s.id === activeSection) === 0 ? 'left-0' : 
                    Object.values(SECTIONS).findIndex(s => s.id === activeSection) === 1 ? 'left-1/3' : 'left-2/3'
                }`}
                aria-hidden="true"
                />
            </div>
            </div>
        </div>
        </nav>

        <main  
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-live="polite"
        className="max-w-7xl mx-auto px-4 py-8"
        >
        <TransitionWrapper isActive={!isTransitioning}>
            {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" 
                role="status" aria-label="Chargement en cours"/>
                <p className="text-gray-600">Chargement du contenu...</p>
            </div>
            ) : (
            content
            )}
        </TransitionWrapper>
        </main>
    </div>
    );
};
ContentManager.displayName = 'ContentManager';


export default ContentManager;

