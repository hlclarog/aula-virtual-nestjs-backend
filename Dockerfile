FROM node:10
WORKDIR /APP
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]
