# TTC Website — Deploy Checklist

## What's already done (by TAI Digital)
- [x] Full Next.js 14 website built and TypeScript-clean
- [x] vercel.json configured
- [x] .env.example with all variable names
- [x] supabase/setup.sql — complete database setup ready to paste
- [x] .gitignore correct (node_modules, .env.local excluded)

---

## 3 things YOU need to do

### Step 1 — Create the GitHub repo (2 min)
1. Go to https://github.com/theasaphmedia
2. Click **New repository**
3. Name it: `ttc-website`
4. Set to **Private**
5. Do NOT initialise with README (repo must be empty)
6. Click **Create repository**
7. Copy the repo URL: `https://github.com/theasaphmedia/ttc-website.git`

### Step 2 — Push the code (in VS Code terminal inside ttc-website folder)
Run these 5 commands one by one:

```bash
git init -b main
git add .
git commit -m "feat: initial TTC website — built by TAI Digital"
git remote add origin https://github.com/theasaphmedia/ttc-website.git
git push -u origin main
```

> GitHub will ask for your credentials on the push step. Use your GitHub username
> and a Personal Access Token (not your password).
> Get a token at: github.com → Settings → Developer settings → Personal access tokens → Generate new token (classic)
> Scopes needed: repo (full)

### Step 3 — Create the Supabase project (5 min)
1. Go to https://supabase.com and sign up / log in
2. Click **New Project**
   - Name: `ttc-website`
   - Database password: create a strong one (save it somewhere safe)
   - Region: `eu-west-2 London` (closest to Lagos)
3. Wait ~2 minutes for it to spin up
4. Go to **SQL Editor → New Query**
5. Open `supabase/setup.sql` from this project, paste the entire contents, click **Run**
6. Go to **Settings → API**, copy these 3 values:
   - `Project URL` → this is NEXT_PUBLIC_SUPABASE_URL
   - `anon public` key → this is NEXT_PUBLIC_SUPABASE_ANON_KEY
   - `service_role secret` key → this is SUPABASE_SERVICE_ROLE_KEY

---

## Vercel setup (after GitHub push)
1. Go to https://vercel.com
2. Sign up / log in with GitHub
3. Click **Add New → Project**
4. Import `theasaphmedia/ttc-website`
5. Vercel auto-detects Next.js — click **Environment Variables** before deploying
6. Add all variables from `.env.example` (with real values)
7. Click **Deploy**

Done. Every push to `main` auto-deploys. 

---

## Keys still awaiting from CLIENT
| Key | How to get |
|-----|-----------|
| YOUTUBE_API_KEY | console.cloud.google.com → YouTube Data API v3 (client's Google account) |
| NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY | dashboard.paystack.com → Settings → API Keys (when compliance ready) |
| PAYSTACK_SECRET_KEY | same as above |
| NEXT_PUBLIC_WELCOME_VIDEO_ID | YouTube video ID of the welcome video |
| NEXT_PUBLIC_SITE_URL | The domain once client provides it |
