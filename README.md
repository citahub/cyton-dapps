# CITA Dapps

## Initial Project

```shell
cp config/database.yml.default config/database.yml

rails db:create

rails db:migrate
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