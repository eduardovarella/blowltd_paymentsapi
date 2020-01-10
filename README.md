# Blow Ltd payments API
A Payments API for blow LTD.

## Requirements

node v12

## Installation
```
git clone https://github.com/eduardovarella/blowltd_paymentsapi.git
cd blowltd_paymentsapi
npm install -g serverless
npm install
```

## Database access configuration

Edit file `config\config.json`. Current configuration:
```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "blowltd_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "blowltd_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}

```

## Starting the API

```
export NODE_ENV=development
npm start
```
This will start the API pointing to the `development` database.

Importante: the provided initial data is not loaded as default in the development environment. To load it run 

```
export NODE_ENV=development
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Running Automated Tests

On the first terminal:

```
export NODE_ENV=test
npm start
```

This will start the API pointing to the `test` database.

On the second terminal:

```
export NODE_ENV=test
npm test
```
