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

## 3. Google OAuth Setup
Used for "Login with Google". Configured **in Google Cloud Console** and then **in Supabase**.

### A. Google Cloud Console Steps
1.  Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2.  **Create/Select Project**: Ensure you are in the "MyMedic" project.
3.  **OAuth Consent Screen**: If prompted, set it up as "External", name it "MyMedic", and add your email.
4.  **Create Credentials**: Click `+ CREATE CREDENTIALS` > `OAuth client ID`.
5.  **Application Type**: Select `Web application`.
6.  **Name**: Enter `MyMedic Web Client`.
7.  **Authorized JavaScript origins**:
    *   `http://localhost:3000`
    *   `https://frontend-blond-iota-47.vercel.app`
8.  **Authorized redirect URIs**:
    *   `https://ukzsdxzovdysgwmbhdhv.supabase.co/auth/v1/callback`
9.  Click **Create** and copy your **Client ID** and **Client Secret**.

### B. Supabase Configuration
1.  Go to [Supabase Dashboard > Authentication > Providers > Google](https://supabase.com/dashboard/project/ukzsdxzovdysgwmbhdhv/auth/providers).
2.  Enable the provider.
3.  Paste the **Client ID** and **Client Secret** obtained above.
4.  Save changes.

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
