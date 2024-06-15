# Menggunakan image dasar Node.js
FROM node:22

# Menentukan direktori kerja dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin seluruh source code ke direktori kerja, termasuk key.json
COPY . .

# Menentukan port aplikasi
ENV PORT 8080

# Mengekspos port 8080
EXPOSE 8080

# Menjalankan aplikasi
CMD ["node", "server.js"]
