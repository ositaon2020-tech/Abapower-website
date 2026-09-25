# Supabase setup — Aba Power CMS

The admin dashboard now reads and writes **everything** through Supabase. This
folder contains the one script that creates the backend.

| File | Purpose |
| --- | --- |
| `schema.sql` | Creates the tables, the media bucket and the security policies |
| `README.md` | This guide |

---

## 1. Apply the schema

1. Open the project: <https://supabase.com/dashboard/project/zfhrlhgvzwjgteuclnyt>
2. Left sidebar → **SQL Editor** → **New query**
3. Paste the whole of [`schema.sql`](./schema.sql) and press **Run**

The script is idempotent — running it twice will not erase content.

### What it creates

| Table | Holds |
| --- | --- |
| `cms_collections` | One row per collection (`news`, `heroStats`, `marquee`, …) with the ordered array in `items` |
| `cms_settings` | One row per settings group (`hero`, `newsroom`, `branding`) with the object in `value` |
| `cms_activity` | Every admin action — who did what, and when |
| `analytics_events` | First-party visitor events (`visit`, `view`, `click`, `search`) |
| `cms-media` (storage) | Public bucket for images uploaded from the admin editors |

It also switches on **Row Level Security** so that:

- the public site can **read** content and **report** analytics with the anon key;
- only a **signed-in admin** can write content, upload media, or read the
  activity log and analytics reports.

> The anon/publishable key ships inside the public website. RLS — not the key —
> is what protects the data. Never put the `service_role` key in `.env.local`.

## 2. Create your first admin user

The dashboard has no default credentials. Create one:

1. **Authentication** → **Users** → **Add user** → **Create new user**
2. Enter an email and password
3. Tick **Auto Confirm User** (the project has email confirmation on, so an
   unconfirmed user cannot sign in)

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
VITE_SUPABASE_URL=https://zfhrlhgvzwjgteuclnyt.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_…
VITE_SUPABASE_MEDIA_BUCKET=cms-media
```

Restart the dev server after editing.

---

## How the app uses it

```
public site ──read──▶ cms_collections / cms_settings ──▶ renders content
                               ▲
admin dashboard ──write────────┘  (authenticated session required)
     │
     ├─ every action ──▶ cms_activity
     └─ image upload ──▶ cms-media bucket (public URL saved in the content)

visitor ──insert──▶ analytics_events ──read (admin only)──▶ AnalyticsPanel
```

- [`src/lib/cmsApi.js`](../src/lib/cmsApi.js) is the only module that talks to
  Supabase. Everything else goes through it.
- [`src/context/ContentContext.jsx`](../src/context/ContentContext.jsx) loads
  the cloud document on start, caches it in `localStorage` for instant loads and
  offline resilience, and writes every edit straight back.
- The **Data & Backups** panel shows the live sync status, the media library and
  a "Sync now" control.

Learn more about [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
