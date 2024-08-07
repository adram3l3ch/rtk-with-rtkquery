ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-alpine
# ENV NODE_ENV production
WORKDIR /app
RUN npm i -g json-server
COPY ./package*.json ./
COPY ./yarn* ./
RUN yarn install
COPY . .
RUN chmod +x start.sh
EXPOSE 5173
EXPOSE 3000
CMD ["./start.sh"]
