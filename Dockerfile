############################################
# build the production version of the webapp
############################################

# pull the official base image
FROM node:16-alpine as build
# set work directory
WORKDIR /app
# set environment variables
ENV PATH /app/node_modules/.bin:$PATH
# install dependencies
COPY ./package.json /app/
RUN npm install
# copy projects
COPY . ./
# build the production version
RUN npm run build


############################################
# deploy build to nginx
############################################

# pull the official base image
FROM nginx:1.20-alpine
# copy build to webroot
COPY --from=build /app/build /usr/share/nginx/html
# copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# copy start script
COPY ./docker-start.sh ./docker-start.sh
RUN chmod +x ./docker-start.sh
# open port 80
EXPOSE 80
# start server
CMD ["./docker-start.sh"]
