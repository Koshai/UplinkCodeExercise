FROM node:14

# Install OpenJDK
RUN apt-get update && apt-get install -y openjdk-11-jdk

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
