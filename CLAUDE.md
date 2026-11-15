@~/dev/pokemon-lab-hub/ARCHITECTURE.md
@~/dev/pokemon-lab-hub/LEARNING_MODE.md

# professor (pokemon-professor-lab-api)

## Responsabilidad

**Profesores Pokémon** y el laboratorio que diseñaron o dirigen.

**No hace:** ubicar el laboratorio en el mapa. Eso es un edificio en `geo` y acá solo se
guarda la referencia por id. Tampoco reparte iniciales: qué Pokémon son iniciales de una
región se resuelve entre `geo`, `pokedex` y el BFF.

## Paradigma: hexagonal con un controller y un use case por operación

- `professor/domain` — modelo y puerto del repositorio.
- `professor/application` — un use case por operación (`create`, `getById`, ...).
- `professor/infrastructure` — **un controller por operación**, más el adaptador Scylla.
- `server/infrastructure` — cliente Scylla y logger (pino) compartidos.

Lo que se estudia acá, en contraste con `geo`:
- El mismo framework con otro corte: aquí el controller también es una clase por caso de
  uso, mientras que `geo` agrupa por recurso. Mantener esta diferencia para poder
  comparar ambos enfoques.
- Rutas estilo RPC (`/professors/get-by-id/:id`, `POST /professors/list`). Pendiente decidir
  si se queda así (ver ARCHITECTURE.md).
- Modelado para Scylla: tablas diseñadas por query, no normalizadas.

## Comandos

```bash
pnpm start:dev
pnpm lint && pnpm test
```

## Endpoints

`POST /professors/create` · `GET /professors/get-by-id/:id` · `POST /professors/list`
