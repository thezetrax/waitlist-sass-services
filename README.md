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

## Feature List

Here’s a compact list of feature sets

**Core**
- [ ] Public signup (name, email)
- [ ] Email confirmation (double opt‑in)
- [ ] Unique referral code per signup
- [ ] Basic spam protection (rate limit, honeypot/CAPTCHA)
- [ ] Thank‑you/confirmation page

**Referrals & Sharing**
- [ ] Referral link generation
- [ ] Referral count tracking
- [ ] Social sharing links (copy link, share to Twitter/FB)

**Admin**
- [ ] Dashboard: list/search sign-ups, referral stats
- [ ] Export (CSV)
- [ ] Basic filters (date range, referred vs direct)
- [ ] Delete/block entries (handle spam)

**Email**
- [ ] Transactional: confirmation, referral updates
- [ ] Broadcast: send launch updates
- [ ] Optional: drip sequence pre‑launch

**Analytics**
- [ ] Signup funnel (total, confirmed)
- [ ] Referral leaderboard (top referrers)
- [ ] Conversion by source (if you track UTM/source)

**Optional niceties**
- [ ] Segments/tags (VIP, high referrers)
- [ ] Webhooks/zaps for downstream tools
- [ ] Custom domain for the signup page
- [ ] Simple A/B test (copy/CTA)
