# CITA Dapps

## Docker

If you just want to run this project, just use [docker 🐳](https://docs.docker.com/install)

Remember to run `rails secret` to generate secret key and write in .env.local(read .env for more info)

⚠️ IMPORTANT: your database data will save at docker/data

App will run at http://localhost:8080

```shell
$ make setup # run this when you first run this app
$ make up # this command will run docker daemon.
$ make update # when you update the app.
```

you can get more info from Makefile

## Initial Project

```shell
touch .env.local # rewrite you database username, password and so on...

rails db:create

rails db:migrate

rails db:seed
```

## Running Test

```shell
rails test
```

## Run Project

```shell
rails s
rails s -b 0.0.0.0
./bin/webpack-dev-server
```

## build

```shell
mina dev deploy
mina dev puma:start
```
