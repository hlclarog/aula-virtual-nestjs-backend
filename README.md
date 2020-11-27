# MANGUS API

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
| PORT | number | Puerto de la aplicacion (Solo de referencia) |
