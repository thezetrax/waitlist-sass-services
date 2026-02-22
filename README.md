# Readme

## Introduction

This is a waitlist service simple SASS project api. It's a deployable service 
that allows users to signup, invite others, and reject waitlist entries. Users
can generate a referral code, with a link, and share them with others. Doing so
will increase their chances of being added to the waitlist.

This project will grow in scope and become a full-fledged waitlist service with
a frontend SPA service, an analytics dashboard, and a admin panel.

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
