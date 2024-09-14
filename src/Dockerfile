FROM node:18-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Nettoyer le cache npm pour éviter les problèmes
RUN npm cache clean --force

# Installer toutes les dépendances en une seule commande
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Construire l'application uniquement si la commande build existe
RUN npm run build --if-present

# Exposer le port pour accéder à l'application
EXPOSE 9010

# Lancer l'application en mode "preview"
CMD [ "npm", "run", "preview" ]

# Utiliser cette commande pour le mode développement local si tu souhaites voir les changements en temps réel
# CMD [ "npm", "run", "dev" ]
