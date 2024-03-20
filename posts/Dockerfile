#Base Image configuring
FROM node:alpine

WORKDIR /usr/app

#Depenedency setup
COPY package.json .
RUN npm install
COPY . .

# command running 
CMD [ "npm","run","dev" ]