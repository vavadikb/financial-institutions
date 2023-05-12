FROM node

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY /src /app

EXPOSE 3000
EXPOSE 3001
EXPOSE 5432

CMD ["node", "index.js"]