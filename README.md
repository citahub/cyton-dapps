# CITA Dapps

## Docker

We recommend that you use [Docker 🐳](https://docs.docker.com/install) if you just want to run this project.

Remember to run `rails secret` to generate secret key and write it to .env.local(read .env for more info).

⚠️ IMPORTANT: your database data will save at docker/data

App will run at http://localhost:8080.

```shell
$ make setup # run this when you first run this app
$ make up # this command will run docker daemon.
$ make update # when you update the app.
```

Refer to `Makefile` for more info.

## Initialize Project

```shell
touch .env.local # Configure you database username, password, etc.

bundle

yarn install

rails db:create

rails db:migrate

rails db:seed
```

## Run Tests

```shell
rails test
```

## Run Project

```shell
rails s
rails s -b 0.0.0.0
./bin/webpack-dev-server
```

## Deploy

```shell
mina dev deploy
mina dev puma:start
```
