# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
ENV CI=false
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
