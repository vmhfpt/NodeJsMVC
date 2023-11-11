FROM node:18-alpine
WORKDIR /app
COPY . .
COPY package.json yarn.lock ./
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000