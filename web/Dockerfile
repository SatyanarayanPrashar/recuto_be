# syntax=docker/dockerfile:1.4

# 1. For building the React app
FROM node:lts AS development

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json /app/

RUN npm ci

# Copy the rest of the application files
COPY . /app

ENV CI=true
ENV PORT=3000

# Build the app
CMD [ "npm", "build" ]

# 2. Create the build stage
FROM development AS build

RUN npm run build

# 3. Set up development environment
FROM development as dev-envs

# Install necessary packages (git)
RUN apt-get update && apt-get install -y --no-install-recommends git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up user and docker group
RUN useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

# Start the development server
CMD [ "npm", "run", "dev" ]
