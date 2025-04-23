import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users,  TrendingUp,  Calendar,  MessageSquare,  CreditCard,  Vote,  BarChart2,  PieChart,  Activity, 
  ArrowUp,  ArrowDown, DollarSign, Clock, CheckCircle, AlertTriangle} from 'lucide-react';

// Composant pour les cartes de statistiques
const StatCard = ({ icon: Icon, title, value, trend, color, percentage }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
        <Icon className={`h-6 w-6 ${color.replace('border-', 'text-')}`} />
      </div>
      {trend && (
        <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </motion.div>
);

// Composant pour les graphiques
const Chart = ({ title, type, data, height = 300 }) => {
  // Simulation de graphiques avec des barres ou des cercles colorés
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {type === 'bar' ? (
          <BarChart2 className="h-5 w-5 text-blue-500" />
        ) : type === 'pie' ? (
          <PieChart className="h-5 w-5 text-purple-500" />
        ) : (
          <Activity className="h-5 w-5 text-green-500" />
        )}
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        {type === 'bar' && (
          <div className="flex items-end justify-between h-full">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div 
                  className={`w-12 ${item.color} rounded-t-lg`} 
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs mt-2 text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {type === 'pie' && (
          <div className="flex justify-center items-center h-full">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {data.map((item, index) => {
                  const startAngle = index > 0 
                    ? data.slice(0, index).reduce((sum, d) => sum + d.value, 0) / 100 * 360 
                    : 0;
                  const endAngle = startAngle + (item.value / 100 * 360);
                  
                  // Convertir les angles en coordonnées pour l'arc SVG
                  const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                  const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                  const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                  const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                  
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                  
                  return (
                    <path 
                      key={index}
                      d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={item.color}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">100%</span>
              </div>
            </div>
          </div>
        )}
        
        {type === 'line' && (
          <div className="h-full flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={data.map((point, i) => `${i * (100 / (data.length - 1))},${100 - point.value}`).join(' ')}
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {data.map((point, i) => (
                <circle
                  key={i}
                  cx={i * (100 / (data.length - 1))}
                  cy={100 - point.value}
                  r="2"
                  fill="#4F46E5"
                />
              ))}
            </svg>
          </div>
        )}
      </div>
      
      {type === 'pie' && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-xs text-gray-600">{item.label} ({item.value}%)</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Composant pour les événements récents
const RecentActivity = () => {
  const activities = [
    { 
      id: 1, 
      title: "Nouvelle adhésion", 
      description: "Jean Dupont a rejoint le syndicat", 
      time: "Il y a 2 heures",
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    { 
      id: 2, 
      title: "Cotisation reçue", 
      description: "Marie Martin a payé sa cotisation mensuelle", 
      time: "Il y a 5 heures",
      icon: <CreditCard className="h-5 w-5 text-green-500" />
    },
    { 
      id: 3, 
      title: "Nouvel événement", 
      description: "Assemblée générale programmée pour le 15 juin", 
      time: "Il y a 1 jour",
      icon: <Calendar className="h-5 w-5 text-purple-500" />
    },
    { 
      id: 4, 
      title: "Vote terminé", 
      description: "La proposition sur les horaires a été acceptée", 
      time: "Il y a 2 jours",
      icon: <Vote className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Activités récentes</h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-gray-100 rounded-lg mr-3">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Composant pour les tâches à venir
const UpcomingTasks = () => {
  const tasks = [
    { 
      id: 1, 
      title: "Réunion du bureau", 
      date: "Demain, 10:00", 
      status: "pending",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Préparation des documents financiers", 
      date: "15 Juin, 14:00", 
      status: "pending",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "Rencontre avec les autorités", 
      date: "20 Juin, 09:00", 
      status: "pending",
      priority: "high"
    }
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tâches à venir</h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              {task.priority === "high" ? (
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              ) : (
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
              )}
              <div>
                <h4 className="font-medium text-gray-800">{task.title}</h4>
                <p className="text-xs text-gray-500">{task.date}</p>
              </div>
            </div>
            <div>
              {task.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <div className={`px-2 py-1 rounded-full text-xs ${
                  task.priority === "high" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {task.priority === "high" ? "Urgent" : "Normal"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const DashboardStats = () => {
  // Données pour les graphiques
  const barChartData = [
    { label: 'Jan', value: 65, color: 'bg-blue-500' },
    { label: 'Fév', value: 40, color: 'bg-blue-500' },
    { label: 'Mar', value: 75, color: 'bg-blue-500' },
    { label: 'Avr', value: 55, color: 'bg-blue-500' },
    { label: 'Mai', value: 60, color: 'bg-blue-500' },
    { label: 'Juin', value: 80, color: 'bg-blue-500' }
  ];

  const pieChartData = [
    { label: 'Cotisations', value: 45, color: 'fill-blue-500' },
    { label: 'Dons', value: 25, color: 'fill-green-500' },
    { label: 'Services', value: 20, color: 'fill-purple-500' },
    { label: 'Autres', value: 10, color: 'fill-yellow-500' }
  ];

  const lineChartData = [
    { value: 20 }, { value: 40 }, { value: 30 }, 
    { value: 70 }, { value: 50 }, { value: 80 }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble des statistiques et activités du syndicat</p>
      </motion.div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
            icon={Users} 
            title="Membres actifs" 
            value="156" 
            trend="up" 
            percentage="12" 
            color="border-blue-500" 
        />
        <StatCard 
            icon={CreditCard} 
            title="Cotisations" 
            value="1.2M FCFA" 
            trend="up" 
            percentage="8" 
            color="border-green-500" 
        />
        <StatCard 
            icon={Calendar} 
            title="Événements" 
            value="12" 
            trend="up" 
            percentage="5" 
            color="border-purple-500" 
        />
        <StatCard 
            icon={Vote} 
            title="Votes actifs" 
            value="3" 
            trend="down" 
            percentage="2" 
            color="border-orange-500" 
        />
        </div>

      {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart 
            title="Évolution des adhésions" 
            type="bar" 
            data={barChartData} 
        />
        <Chart 
            title="Répartition des revenus" 
            type="pie" 
            data={pieChartData} 
        />
      </div>

      {/* Activités récentes et tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingTasks />
      </div>
    </div>
  );
};