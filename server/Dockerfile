# Use Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "dist/index.js"]