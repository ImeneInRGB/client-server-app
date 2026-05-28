FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Création du dossier qui va recevoir le volume
RUN mkdir -p /app/data 
EXPOSE 80
CMD ["node", "server.js"]
