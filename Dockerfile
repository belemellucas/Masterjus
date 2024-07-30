# Use a imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de definição do projeto
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Gere o Prisma Client e aplique as migrações do banco de dados (descomente se necessário)
# RUN npx prisma generate
# RUN npx prisma db push

# Construa o aplicativo
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
