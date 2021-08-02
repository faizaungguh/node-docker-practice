# set image
FROM node:16.6.0-alpine
# set directory
WORKDIR /app
# copy file to path workdir
COPY package.json .
# build image
RUN npm install
# change dev-prod
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
            then npm install; \
            else npm install --only=production; \
            fi
# copy file to path
COPY . ./
# envirornment variable
ENV PORT 3000
# port docker
EXPOSE $PORT
# command runtime
CMD [ "node", "index.js" ]