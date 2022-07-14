# Teslo Shop

To run the application locally, a docker image of a MongoDB database is required:

```
docker-compose up -d
```

 >  -d = __detached__

#### MongoDB local URL:

```
mongodb://localhost:27017/teslodb
```

## Setting environment variables
Rename the file __.env.template__ to __.env__.

## Filling the database with test data

```
http://localhost:3000/api/seed
```