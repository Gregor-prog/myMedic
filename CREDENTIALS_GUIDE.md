# Credentials Setup Guide

This guide helps you obtain the necessary API keys and secrets for your MyMedic application.

## 1. Frontend URL
Based on your configuration, your deployed frontend URL is:
**[https://frontend-blond-iota-47.vercel.app](https://frontend-blond-iota-47.vercel.app)**

For local development, use: `http://localhost:3000`

---

## 2. Supabase Configuration
Your app uses **Supabase** for Auth, Database, and Realtime. All credentials come from a single place.

1.  Go to the [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project (or create one).
3.  Navigate to **Settings > API**.
4.  Copy the following:
    *   **Project URL** → `SUPABASE_URL` / `VITE_SUPABASE_URL`
    *   **anon (public) key** → `SUPABASE_ANON_KEY` / `VITE_SUPABASE_ANON_KEY`
    *   **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (backend only, NEVER expose to frontend)
    *   **JWT Secret** → `SUPABASE_JWT_SECRET` (backend only, for JWT validation)
5.  Navigate to **Settings > Database** for the connection string:
    *   **URI** → `DATABASE_URL`

---

## 3. Google OAuth (Optional)
Used for "Login with Google". Configured **in Supabase**, not directly in your app.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a project and navigate to **APIs & Services > Credentials**.
3.  Create an **OAuth client ID** (Web application).
4.  Add redirect URI: `https://<your-supabase-ref>.supabase.co/auth/v1/callback`
5.  Copy the **Client ID** and **Client Secret**.
6.  In Supabase Dashboard: **Authentication > Providers > Google** → paste credentials.

---

## 4. Phone OTP (Optional)
Supabase Auth can send OTPs via SMS for phone-based login.

1.  In Supabase Dashboard: **Authentication > Providers > Phone**.
2.  Enable the phone provider.
3.  Choose a provider (Twilio, MessageBird, Vonage, etc.) — Supabase handles the integration.
4.  Configure the provider credentials in the Supabase dashboard.

---

## 5. Where to save these?

### Backend (`backend/.env`)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://postgres.[ref]:password@db.your-project.supabase.co:5432/postgres
```

### Frontend (`frontend/.env.local`)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000/api/v1
```
