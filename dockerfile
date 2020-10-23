## Reading Env file using Docker-compose docker-compose --env-file ./config/.env.dev up 

FROM node:current-slim As development
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm i -g @nestjs/cli 
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install
RUN npm run build
RUN ls -a


FROM node:current-slim as production
ENV FIREBASE_APPLICATION_CREDENTIALS=/usr/src/app/google-credentials.json
WORKDIR /usr/src/app
RUN ls -a
RUN pwd

COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules 
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/google-credentials.json ./google-credentials.json
RUN ls -a
COPY  .env ./
CMD ["node", "dist/main"]
