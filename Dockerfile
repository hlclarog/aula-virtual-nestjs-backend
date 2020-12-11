FROM node:12.19.0
WORKDIR /app
COPY . ./
RUN npm install
RUN npm build
EXPOSE 80
CMD ["npm","run","start:local"]

