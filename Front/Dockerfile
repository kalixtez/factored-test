FROM node:alpine

WORKDIR /client

COPY . /client/

WORKDIR /client/front-factored

RUN npm install;
CMD [ "npm", "run", "dev", "--", "--host" ] 

EXPOSE 5173