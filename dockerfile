FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the gRPC server port
EXPOSE 50051

# Start the application
CMD ["npm", "run", "start:prod"]