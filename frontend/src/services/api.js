import axios from 'axios';
import { supabase } from './supabase';

// ─────────────────────────────────────────────────────────────
// MyMedic — API Service Layer
// Uses Supabase Auth for authentication, FastAPI for business APIs
// ─────────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach Supabase session token to FastAPI requests
api.interceptors.request.use(
    async (config) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Sign out from Supabase and redirect
            await supabase.auth.signOut();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ── Auth Service (Supabase Auth) ─────────────────────────────
export const authService = {
    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    register: async (email, password, metadata = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata, // full_name, role, phone_number
            },
        });
        if (error) throw error;
        return data;
    },

    loginWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/patient/dashboard',
            },
        });
        if (error) throw error;
        return data;
    },

    loginWithOtp: async (email) => {
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
        });
        if (error) throw error;
        return data;
    },

    verifyOtp: async (email, token) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });
        if (error) throw error;
        return data;
    },

    getSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    getUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Sync profile to FastAPI backend after signup
    syncProfile: async (profileData) => {
        const response = await api.post('/auth/sync-profile', profileData);
        return response.data;
    },

    // Get profile from FastAPI backend
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// ── Booking Service (FastAPI) ────────────────────────────────
export const bookingService = {
    getMyAppointments: async () => {
        const response = await api.get('/appointments/my-schedule');
        return response.data;
    },
    bookAppointment: async (data) => {
        const response = await api.post('/appointments', data);
        return response.data;
    },
    generateIcs: async (data) => {
        const response = await api.post('/appointments/generate-ics', data);
        return response.data;
    },
};

// ── Marketplace Service (FastAPI) ────────────────────────────
export const marketplaceService = {
    getProfessionals: async (params) => {
        const response = await api.get('/professionals', { params });
        return response.data;
    },
    getProfessionalDetail: async (id) => {
        const response = await api.get(`/professionals/${id}`);
        return response.data;
    },
};

// ── Chat Service (Supabase Realtime + FastAPI) ───────────────
export const chatService = {
    getHistory: async (threadId) => {
        const response = await api.get(`/history/${threadId}`);
        return response.data;
    },
    sendMessage: async (data) => {
        const response = await api.post('/messages', data);
        return response.data;
    },
    // Subscribe to real-time chat messages via Supabase Realtime
    subscribeToThread: (threadId, onMessage) => {
        const channel = supabase
            .channel(`chat:${threadId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chatmessage',
                    filter: `thread_id=eq.${threadId}`,
                },
                (payload) => {
                    onMessage(payload.new);
                }
            )
            .subscribe();

        // Return unsubscribe function
        return () => {
            supabase.removeChannel(channel);
        };
    },
};

export default api;
