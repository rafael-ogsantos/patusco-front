# Usar uma imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Instalar o Vue CLI globalmente
RUN npm install -g @vue/cli

# Copiar os arquivos do projeto para o contêiner
COPY . .

# Expor a porta padrão do servidor Vue.js
EXPOSE 8080

# Definir o comando para iniciar o servidor
CMD ["sh", "-c", "npm run serve"]