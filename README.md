# API

### Installation

Requiere [Node.js](https://nodejs.org/) v8+ para iniciar.

```sh
$ cd mangusback
$ npm install
$ npm run start:[env] (local | dev | prod | debug)
```

### Environments

Los siguientes parametros son requeridos para iniciar la aplicacion y deben estar ubicados de la siguiente forma:
/env/[environment].env

example:
/env/local.env
/env/prod.env
...


| Nombre | Tipo | Descripcion |
| ------ | ------ | ------ |
| DATABASE_HOST | string | host servidor de base de datos |
| DATABASE_NAME | string | nombre de la base de datos |
| DATABASE_PORT | number | puerto de la base de datos |
| DATABASE_USER | string | usuario de la base de datos |
| DATABASE_PASS | string | contraseña de la base de datos |
| MONGO_HOST | string | host del servidor de mongo |
| MONGO_DB | string | nombre de la base de datos en mongo |
| MONGO_PORT | number | puerto del servidor de mongo |
| TOKEN_SECRET | string | key token para autenticacion |
| TOKEN_SECRET_PASSWORDSREQ | string | key token para cambio de password |
| PORT | number | Puerto de la aplicacion (Solo de referencia) |
| QUEUE_HOST | string | Host de redis |
| QUEUE_PORT | string | Puerto de redis |
| URL_BACKEND | string | Url del backend |
| AWS_ACCESS_KEY_ID | string | AWS access key |
| AWS_SECRET_ACCESS_KEY | string | AWS secret key |
| AWS_BUCKET | string | AWS bucket name |

### Migrations

- Generar migracion 
  ```sh
  $ npm run typeorm migration:create -- -n 'name_migration' -d src/migrations/manager #Para procesos en manager (Public)
  $ npm run typeorm migration:create -- -n 'name_migration' -d src/migrations/tenancy #Para procesos en las tenencias
  ```
- Correr migraciones
  Las migraciones se corren mediante el endpoint, el cual correra en la tenencia actual de la solicitud
  GET [/migrations/run]
  GET [/tenancy/run]
