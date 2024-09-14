FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i react-icons && npm i jquery && npm i slick-carousel

COPY . .

# Comment the line below if you want to run the dev mode bbbbbbbb
RUN npm run build

EXPOSE 9011

CMD [ "npm", "run", "preview" ]

# Use the below command for local development if you want to see changes while working
# CMD [ "npm", "run", "dev" ]
