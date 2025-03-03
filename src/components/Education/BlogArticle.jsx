import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark, MessageSquare, ThumbsUp } from 'lucide-react';

const BlogArticle = () => {
  const { id } = useParams();
  
  // Mock data for a single article
  const article = {
    id: 1,
    title: "Les nouvelles réformes du droit syndical en 2025",
    content: `
      <p class="mb-4">La législation encadrant les activités syndicales connaît une évolution significative en 2025, avec l'adoption de plusieurs réformes majeures qui visent à moderniser le dialogue social et à renforcer la protection des représentants syndicaux.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Renforcement du statut des représentants syndicaux</h2>
      
      <p class="mb-4">La première avancée notable concerne la protection juridique des représentants syndicaux. Le nouveau cadre législatif étend la période de protection contre le licenciement à 24 mois après la fin du mandat, contre 12 mois auparavant. Cette mesure vise à prévenir les représailles potentielles et à garantir une plus grande liberté d'action aux représentants.</p>
      
      <p class="mb-4">Par ailleurs, les heures de délégation sont désormais considérées comme du temps de travail effectif pour tous les droits liés à l'ancienneté et à la progression de carrière, ce qui constitue une avancée significative pour éviter les discriminations indirectes.</p>
      
      <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6">
        "Cette réforme reconnaît enfin pleinement l'engagement des représentants syndicaux et leur contribution essentielle au dialogue social dans l'entreprise." - Marie Dupont, experte en droit social
      </blockquote>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Digitalisation du dialogue social</h2>
      
      <p class="mb-4">La seconde innovation majeure concerne l'intégration des outils numériques dans le fonctionnement des instances représentatives du personnel. La loi autorise désormais explicitement :</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>La tenue de réunions à distance, avec un encadrement strict des conditions techniques garantissant la confidentialité et la qualité des échanges</li>
        <li>La mise en place de plateformes numériques sécurisées pour la communication entre les représentants et les salariés</li>
        <li>L'utilisation de la signature électronique pour la validation des accords collectifs</li>
        <li>L'accès à des formations spécifiques aux outils numériques pour les représentants du personnel</li>
      </ul>
      
      <div class="bg-blue-50 p-6 rounded-lg my-6">
        <h3 class="font-semibold text-gray-800 mb-2">Point d'attention</h3>
        <p class="text-gray-700">
          Ces nouvelles modalités numériques restent soumises à un accord préalable entre l'employeur et les organisations syndicales représentatives. En l'absence d'accord, les modalités traditionnelles continuent de s'appliquer.
        </p>
      </div>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Élargissement du champ de la négociation collective</h2>
      
      <p class="mb-4">La troisième évolution concerne l'élargissement des thématiques obligatoires de négociation collective. Aux sujets traditionnels (rémunération, temps de travail, égalité professionnelle) s'ajoutent désormais :</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>La transition écologique et son impact sur les conditions de travail</li>
        <li>La prévention des risques psychosociaux et la santé mentale au travail</li>
        <li>L'adaptation des compétences face aux évolutions technologiques</li>
        <li>Les modalités du télétravail et du travail hybride</li>
      </ul>
      
      <p class="mb-4">Ces nouvelles thématiques reflètent les préoccupations contemporaines et visent à adapter le dialogue social aux enjeux actuels du monde du travail.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Implications pratiques pour les syndicats</h2>
      
      <p class="mb-4">Ces réformes entraînent plusieurs conséquences pratiques pour les organisations syndicales :</p>
      
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li>Nécessité de former les représentants aux nouvelles thématiques de négociation</li>
        <li>Adaptation des stratégies de communication pour intégrer les outils numériques</li>
        <li>Révision des accords existants pour les mettre en conformité avec le nouveau cadre légal</li>
        <li>Opportunité de renforcer la présence syndicale sur des sujets émergents comme la transition écologique</li>
      </ol>
      
      <p class="mb-4">Les syndicats qui sauront s'adapter rapidement à ce nouveau cadre pourront en tirer un avantage stratégique dans la représentation des intérêts des salariés.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">Les réformes de 2025 marquent une étape importante dans la modernisation du droit syndical en France. Elles répondent à plusieurs défis contemporains : l'adaptation aux nouvelles formes de travail, la prise en compte des enjeux environnementaux et la protection renforcée des acteurs du dialogue social.</p>
      
      <p>Pour les organisations syndicales, ces évolutions représentent à la fois des opportunités et des défis. Leur capacité à s'approprier ce nouveau cadre sera déterminante pour renforcer leur légitimité et leur efficacité dans la défense des intérêts des travailleurs.</p>
    `,
    author: "Marie Dupont",
    date: "15 mars 2025",
    readTime: "8 min",
    category: "Législation",
    tags: ["Droit syndical", "Réformes", "Dialogue social", "Protection syndicale"],
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

  // Related articles
  const relatedArticles = [
    {
      id: 2,
      title: "Comment organiser efficacement une assemblée générale",
      excerpt: "Guide pratique pour préparer et animer une assemblée générale qui engage vos membres et produit des résultats concrets.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      author: "Thomas Leroy",
      date: "2 février 2025",
      category: "Organisation"
    },
    {
      id: 3,
      title: "Les stratégies de négociation collective en période d'inflation",
      excerpt: "Analyse des approches efficaces pour défendre les intérêts des travailleurs face à la hausse du coût de la vie.",
      image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      author: "Sophie Martin",
      date: "20 janvier 2025",
      category: "Négociation"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back button */}
      <Link to="/education/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Retour aux articles</span>
      </Link>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {article.date}
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime} de lecture
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold mr-3">
            {article.author.charAt(0)}
          </div>
          <div>
            <div className="text-gray-800 font-medium">{article.author}</div>
            <div className="text-sm text-gray-500">Expert en droit syndical</div>
          </div>
        </div>
        
        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article content */}
      <article className="prose prose-blue max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* Article actions */}
      <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 mb-12">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <ThumbsUp className="w-5 h-5 mr-2" />
            <span>J'aime</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <MessageSquare className="w-5 h-5 mr-2" />
            <span>Commenter</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <Bookmark className="w-5 h-5 mr-2" />
            <span>Sauvegarder</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <Share2 className="w-5 h-5 mr-2" />
            <span>Partager</span>
          </button>
        </div>
      </div>

      {/* Author bio */}
      <div className="bg-blue-50 rounded-xl p-6 mb-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">À propos de l'auteur</h3>
        <div className="flex items-start">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xl mr-4">
            {article.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{article.author}</h4>
            <p className="text-gray-600 mb-4">
              Marie Dupont est avocate spécialisée en droit social et ancienne conseillère prud'homale. 
              Elle accompagne depuis plus de 15 ans les organisations syndicales dans leurs démarches juridiques 
              et contribue régulièrement à des publications spécialisées sur le droit du travail.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Voir tous ses articles →
            </a>
          </div>
        </div>
      </div>

      {/* Related articles */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Articles similaires</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedArticles.map((article) => (
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
                  <Link to={`/education/blog/${article.id}`}>{article.title}</Link>
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
                    to={`/education/blog/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Restez informé</h3>
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
  );
};

export default BlogArticle;