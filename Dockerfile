# Stage 1: Build the frontend
FROM node:21-alpine AS frontend-builder
WORKDIR /app/frontend
COPY sheet-api-fe/package.json sheet-api-fe/package-lock.json ./
RUN npm install
COPY sheet-api-fe/ . 
RUN npm run generate

# Stage 2: Build the backend
FROM node:21-alpine AS backend-builder
WORKDIR /app/backend
COPY sheet-api-be/package.json sheet-api-be/package-lock.json ./
RUN npm install
COPY sheet-api-be/ . 

# Copy frontend build output into backend public folder
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/.output/public ./public

# Stage 3: Create a minimal runtime image
FROM node:21-alpine
WORKDIR /app
COPY --from=backend-builder /app/backend ./
EXPOSE 3000
CMD ["npm", "run", "start"]
