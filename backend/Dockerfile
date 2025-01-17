# Use a lightweight Node.js image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

RUN npm install -g ts-node-dev

# Copy the rest of the application code
COPY . .

# Expose the application port (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
