FROM node:10.24.1-alpine3.11

WORKDIR /app
COPY ./package*.json /app/

RUN npm install

CMD ["npm", "run", "dev"];

