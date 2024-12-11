# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application (if applicable, for frameworks like React/Vue)
RUN npm run build

# Final Stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start", "--host", "0.0.0.0", "--port", "3000"]
