# Star Wars API

## Requisitos

- [Node.js](https://nodejs.org/en/) v18.x o superior
- npm v9.x o superior
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://aws.amazon.com/cli/)

## Instalación

```bash
npm install
```

## Despliegue

```bash
npm run deploy
```

## Endpoints

### GET /character

Devuelve a los personajes de Star Wars guardados en la base de datos.

**Ruta:** https://4ro7qjw1ei.execute-api.us-west-2.amazonaws.com/dev/character

**Respuesta:**

```json
[
  {
    "id": "string",
    "nombre": "string",
    "navesEstelares": ["string"],
    "vehiculos": ["string"],
    "altura": "number",
    "createdAt": "string",
    "planetaNatal": "string",
    "genero": "string"
  }
]
```

### GET /character/global/{id}

Devuelve a un personaje de Star Wars de la API de Star Wars.

**Ruta:** https://4ro7qjw1ei.execute-api.us-west-2.amazonaws.com/dev/character/global/{id}

**Parámetros:**

```json
"id": "string"
```

**Respuesta:**

```json
{
  "id": "string",
  "nombre": "string",
  "navesEstelares": ["string"],
  "vehiculos": ["string"],
  "altura": "number",
  "createdAt": "string",
  "planetaNatal": "string",
  "genero": "string"
}
```

### GET /character/{id}

Devuelve a un personaje de Star Wars guardado en la base de datos.

**Ruta:** https://4ro7qjw1ei.execute-api.us-west-2.amazonaws.com/dev/character/{id}

**Parámetros:**

```json
"id": "string"
```

**Respuesta:**

```json
{
  "id": "string",
  "nombre": "string",
  "navesEstelares": ["string"],
  "vehiculos": ["string"],
  "altura": "number",
  "createdAt": "string",
  "planetaNatal": "string",
  "genero": "string"
}
```

### POST /character

Guarda a un personaje con los parámetros enviados en la base de datos.

**Ruta:** https://4ro7qjw1ei.execute-api.us-west-2.amazonaws.com/dev/character

**Parámetros:**

```json
{
  "nombre": "string",
  "navesEstelares": ["string"],
  "vehiculos": ["string"],
  "altura": "number",
  "planetaNatal": "string",
  "genero": "string"
}
```

**Respuesta:**

```json
{
  "id": "string",
  "nombre": "string",
  "navesEstelares": ["string"],
  "vehiculos": ["string"],
  "altura": "number",
  "createdAt": "string",
  "planetaNatal": "string",
  "genero": "string"
}
```

### POST /character/save

Guarda a un personaje de Star Wars con el id enviado en la base de datos.

**Ruta:** https://4ro7qjw1ei.execute-api.us-west-2.amazonaws.com/dev/character/{id}

**Parámetros:**

```json
{
  "id": "number"
}
```

**Respuesta:**

```json
{
  "id": "string",
  "nombre": "string",
  "navesEstelares": ["string"],
  "vehiculos": ["string"],
  "altura": "number",
  "createdAt": "string",
  "planetaNatal": "string",
  "genero": "string"
}
```
