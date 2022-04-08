FROM node:16-alpine as build-step
RUN mkdir /app/
RUN mkdir /app/node_modules
RUN chown -R node:node /app/node_modules          
WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts
COPY . ./
#USER node
FROM nginx:1-alpine
CMD ["npm", "start"]
