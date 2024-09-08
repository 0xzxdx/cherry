# base node image
FROM node:20-alpine as base

# set for base and all layer that inherit from it
ENV NODE_ENV production
ENV HOST 127.0.0.1
ENV PORT 15173
EXPOSE 15173

# Install all node_modules, including dev dependencies
FROM base as deps
WORKDIR /app
ADD package.json ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
ADD package.json .
CMD ["npm", "start"]