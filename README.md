# test-nestjs

## Proof of work
Refer to [ENDPOINTS.md](ENDPOINTS.md) for example API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
# build image
docker build --rm -t be-nestjs -f Dockerfile .

# run image (test mode)
docker run -it --rm -p 3000:3000 -d be-nestjs

# run image
docker run -d -t -p 3000:3000 -d be-nestjs
```

## Docker Compose

```bash
# build image
docker build --rm -t be-nestjs -f Dockerfile .

# mount as compose (stack)
docker stack deploy -c docker-compose.yml app

# umount compose (stack)
docker stack rm app
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).