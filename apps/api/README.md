# Readme

API service

## Notes

1. Database pull

```
bun run db:pull
```

2. Drizzle requires a sqlite driver instead of using the bun runtime's sqlite driver.
So I added [bun-better-sqlite3](https://github.com/nounder/bun-better-sqlite3) for imitating
the sqlite driver, under the hood using the bun runtime's sqlite driver.
