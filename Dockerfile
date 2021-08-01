# set image
FROM node:16.6.0-alpine
# set directory
WORKDIR /app
# copy file to path workdir
COPY package.json .
# build image
RUN npm install
# copy file to path
COPY . ./
# port docker
EXPOSE 3000
# command runtime
CMD [ "node", "index.js" ]