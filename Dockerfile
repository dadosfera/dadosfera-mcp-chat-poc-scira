# Use Node.js 20 as the base image
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm i

# Copy the rest of the application
COPY . .

ARG DB_HOST=localhost
ARG DB_PORT=5432
ARG DB_NAME=chat
ARG DB_USER=chat-user
ARG DB_PASSWORD=my-secret

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD


RUN npm run db:push
RUN npm run build

FROM base AS dev

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm in production stage
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary files from base stage
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 