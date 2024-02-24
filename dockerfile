FROM node:20.11

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ /app

EXPOSE 3000

CMD ["node", "server.js"]

# docker build -t zywa-card-status .
# docker run -p 3000:80 zywa-card-status