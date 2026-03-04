# --- Build stage ---
FROM node:18.18-alpine as build

WORKDIR /app

# Copy các file cấu hình trước để tận dụng cache
COPY package*.json ./
COPY tsconfig*.json ./

# Cài đặt dependency
RUN npm install

# Copy toàn bộ mã nguồn (nên dùng .dockerignore để loại trừ thư mục node_modules nếu có)
COPY . .

# Build ứng dụng
RUN npm run build

# --- Run stage ---
FROM nginx:alpine

# Copy bản build vào nginx để chạy
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
