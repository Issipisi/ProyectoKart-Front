# Dockerfile para frontend con Vite
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Establece las variables de entorno en tiempo de build
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# O si prefieres inyectarlas al correr el contenedor:
# ENV VITE_API_URL=/api