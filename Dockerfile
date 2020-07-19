# Define the docker hub image: https://hub.docker.com/_/node/
FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

RUN npm install

RUN npm run build

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]