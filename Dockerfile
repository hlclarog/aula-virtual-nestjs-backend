FROM node:12.19.0
WORKDIR /app
COPY . ./
RUN npm install
RUN npm build
CMD ["npm","run","start:dev"]
