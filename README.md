# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Notes

1. Database pull

```
bun run db:pull
```

2. Drizzle requires a sqlite driver instead of using the bun runtime's sqlite driver.
So I added [bun-better-sqlite3](https://github.com/nounder/bun-better-sqlite3) for imitating
the sqlite driver, under the hood using the bun runtime's sqlite driver.
