FROM node:13-alpine

# set where the app will live in the container
WORKDIR /app

# move package.json and package-lock.json over
COPY package*.json ./

# install packages
RUN npm install

# copy the rest of the src files over and build prod files
COPY . .
RUN npm run build

# expose app port
EXPOSE 3000

# start the app
CMD ["node", "dist/index.js"]
