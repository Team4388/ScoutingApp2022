FROM node:16-alpine as build-step
RUN mkdir /app/
WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts
COPY . ./
# USER node
CMD ["npm", "start"]
