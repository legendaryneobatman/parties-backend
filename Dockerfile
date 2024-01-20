# Use a Node.js base image for development
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose the port your Nest.js app is listening on (default is 3000)
EXPOSE 9876

# Start the Nest.js application in watch mode
CMD ["npm", "run", "start:dev"]
