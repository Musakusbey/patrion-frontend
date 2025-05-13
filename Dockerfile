# build aşaması
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production aşaması (serve ile static dosyaları sunuyoruz)
FROM node:18 AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
  