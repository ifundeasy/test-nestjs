FROM node:16.13.2

LABEL maintainer="com.devops"
LABEL description="be-nestjs"

# Create app directory
WORKDIR /opt/app

COPY package*.json ./
# RUN npm config set registry http://${NPM_REGISTRY}/ --> no artifactory yet
# RUN WITH_SASL=0 npm install --production --verbose

RUN npm install

# Bundle App Source
COPY . .

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Run layers
RUN sed -i "s|localhost|host.docker.internal|g" /opt/app/.env

EXPOSE 3000

CMD ["npm", "start"]