# Teletronics

Application allows you to get current prices for Crypto assets and watch market changes online. You can select preferable assets among 2000 available. Selected assets list will be stored locally to be available after reload.

## Running in Docker container

- Build docker image:

`docker build -t teletronics .`

- Run image:

`docker run -d -p 8080:80 teletronics`

- Now project is available on http://localhost:8080/

- To stop container run `docker ps` and get <CONTAINER ID> for created image. Then run `docker stop <CONTAINER ID>`

All process (cloning repo, building artifacts...) are set to be done in Docker image. Also you can build application locally and copy artifacts to image (use commented lines in Dockerfile).

## Development server

Run `ng serve` for a dev server. Now you can change source code and check your changes at Navigate to `http://localhost:4200/`

## Build

Run `npm run build:prod` to build the project for production. The build artifacts will be stored in the `dist/teletronics` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --code-coverage` to execute tests with coverage. You can see results at `http://localhost:63342/teletronics/coverage/teletronics/`
