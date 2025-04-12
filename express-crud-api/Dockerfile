# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Install system dependencies (if needed for native modules)
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Environment variables
ENV PORT=3000
EXPOSE 3000

# Start command
CMD ["npm", "start"]