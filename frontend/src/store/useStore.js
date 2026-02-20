// ─────────────────────────────────────────────────────────────
// MyMedic — Zustand Global Store
// Central state management for Auth, Appointments, UI
// Uses Supabase Auth + FastAPI backend
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand';
import {
    doctors,
    patients,
    initialAppointments,
    chatThreads,
    notifications as initialNotifications,
    medicalRecords,
    vitals as initialVitals,
} from '../data/mockData';
import { authService, chatService } from '../services/api';
import { supabase } from '../services/supabase';

const useStore = create((set, get) => ({
    // ── Auth State ──────────────────────────────────────────
    isAuthenticated: false,
    currentUser: null,
    userRole: null, // 'patient' | 'professional'

    login: async (email, password) => {
        try {
            const data = await authService.login(email, password);
            // After Supabase Auth login, fetch the profile from our backend
            try {
                const profile = await authService.getMe();
                set({
                    isAuthenticated: true,
                    currentUser: profile,
                    userRole: profile.role,
                });
            } catch {
                // Profile doesn't exist yet — set basic info from Supabase
                const user = data.user;
                set({
                    isAuthenticated: true,
                    currentUser: {
                        id: user.id,
                        email: user.email,
                        full_name: user.user_metadata?.full_name || user.email,
                        role: user.user_metadata?.role || 'patient',
                    },
                    userRole: user.user_metadata?.role || 'patient',
                });
            }
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            // Sign up with Supabase Auth
            const data = await authService.register(userData.email, userData.password, {
                full_name: userData.full_name,
                role: userData.role || 'patient',
                phone_number: userData.phone_number,
            });

            // Sync profile to our backend
            if (data.user) {
                try {
                    await authService.syncProfile({
                        full_name: userData.full_name,
                        phone_number: userData.phone_number,
                        role: userData.role || 'patient',
                    });
                } catch (syncError) {
                    console.warn("Profile sync will happen on next login", syncError);
                }
            }

            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    },

    loginWithGoogle: async () => {
        try {
            await authService.loginWithGoogle();
            // OAuth redirects the browser, so no need to set state here
            // State will be set in checkAuth after redirect
        } catch (error) {
            console.error("Google login failed", error);
            throw error;
        }
    },

    loginWithOtp: async (phone) => {
        try {
            await authService.loginWithOtp(phone);
            return true; // OTP sent
        } catch (error) {
            console.error("OTP send failed", error);
            throw error;
        }
    },

    verifyOtp: async (phone, token) => {
        try {
            const data = await authService.verifyOtp(phone, token);
            if (data.user) {
                try {
                    const profile = await authService.getMe();
                    set({
                        isAuthenticated: true,
                        currentUser: profile,
                        userRole: profile.role,
                    });
                } catch {
                    set({
                        isAuthenticated: true,
                        currentUser: {
                            id: data.user.id,
                            email: data.user.email,
                            phone: data.user.phone,
                            role: 'patient',
                        },
                        userRole: 'patient',
                    });
                }
            }
            return true;
        } catch (error) {
            console.error("OTP verification failed", error);
            throw error;
        }
    },

    checkAuth: async () => {
        try {
            const session = await authService.getSession();
            if (session) {
                try {
                    const profile = await authService.getMe();
                    set({
                        isAuthenticated: true,
                        currentUser: profile,
                        userRole: profile.role,
                    });
                } catch {
                    // User is authenticated but profile not synced yet (common during OAuth/OTP)
                    const user = session.user;
                    const role = user.user_metadata?.role || 'patient';
                    set({
                        isAuthenticated: true,
                        currentUser: {
                            id: user.id,
                            email: user.email,
                            full_name: user.user_metadata?.full_name || user.email,
                            role: role,
                            phone_number: user.phone || user.user_metadata?.phone_number
                        },
                        userRole: role,
                    });
                }
            } else {
                set({ isAuthenticated: false, currentUser: null, userRole: null });
            }
        } catch (error) {
            console.error("Auth check failed", error);
            set({ isAuthenticated: false, currentUser: null, userRole: null });
        }
    },

    logout: async () => {
        await authService.logout();
        set({
            isAuthenticated: false,
            currentUser: null,
            userRole: null,
        });
    },

    setUserRole: (role) => set({ userRole: role }),

    // ── Doctors ─────────────────────────────────────────────
    doctors,
    getDoctorById: (id) => doctors.find(d => d.id === id),

    // ── Patients ────────────────────────────────────────────
    patients,
    getPatientById: (id) => patients.find(p => p.id === id),

    // ── Appointments ────────────────────────────────────────
    appointments: initialAppointments,

    addAppointment: (appointment) => set(state => ({
        appointments: [
            ...state.appointments,
            {
                ...appointment,
                id: `appt-${Date.now()}`,
                status: 'upcoming',
                paymentStatus: 'paid',
            },
        ],
    })),

    cancelAppointment: (id) => set(state => ({
        appointments: state.appointments.map(a =>
            a.id === id ? { ...a, status: 'cancelled' } : a
        ),
    })),

    getUpcomingAppointments: () => {
        const { appointments } = get();
        return appointments.filter(a => a.status === 'upcoming');
    },

    getPastAppointments: () => {
        const { appointments } = get();
        return appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');
    },

    // ── Vitals ──────────────────────────────────────────────
    vitals: initialVitals,

    // ── Chat ────────────────────────────────────────────────
    chatThreads,
    activeChatSubscription: null,

    sendMessage: (threadId, text) => set(state => ({
        chatThreads: state.chatThreads.map(thread =>
            thread.id === threadId
                ? {
                    ...thread,
                    lastMessage: text,
                    timestamp: new Date().toISOString(),
                    messages: [
                        ...thread.messages,
                        {
                            id: `m-${Date.now()}`,
                            senderId: state.currentUser?.id || 'patient-001',
                            text,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                }
                : thread
        ),
    })),

    // Subscribe to real-time chat messages for a thread
    subscribeToChatThread: (threadId) => {
        // Unsubscribe from previous thread if any
        const { activeChatSubscription } = get();
        if (activeChatSubscription) {
            activeChatSubscription();
        }

        const unsubscribe = chatService.subscribeToThread(threadId, (newMessage) => {
            // Update local chat state when a new message arrives via Realtime
            set(state => ({
                chatThreads: state.chatThreads.map(thread =>
                    thread.id === threadId
                        ? {
                            ...thread,
                            lastMessage: newMessage.content,
                            timestamp: newMessage.timestamp,
                            messages: [
                                ...thread.messages,
                                {
                                    id: newMessage.id,
                                    senderId: newMessage.sender_id,
                                    text: newMessage.content,
                                    timestamp: newMessage.timestamp,
                                },
                            ],
                        }
                        : thread
                ),
            }));
        });

        set({ activeChatSubscription: unsubscribe });
    },

    unsubscribeFromChat: () => {
        const { activeChatSubscription } = get();
        if (activeChatSubscription) {
            activeChatSubscription();
            set({ activeChatSubscription: null });
        }
    },

    // ── Notifications ───────────────────────────────────────
    notifications: initialNotifications,

    markNotificationRead: (id) => set(state => ({
        notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ),
    })),

    markAllNotificationsRead: () => set(state => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
    })),

    getUnreadCount: () => {
        const { notifications } = get();
        return notifications.filter(n => !n.read).length;
    },

    // ── Medical Records ─────────────────────────────────────
    medicalRecords,

    // ── UI State ────────────────────────────────────────────
    toasts: [],
    showInstallPrompt: false,

    addToast: (toast) => {
        const id = `toast-${Date.now()}`;
        set(state => ({
            toasts: [...state.toasts, { ...toast, id }],
        }));
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            set(state => ({
                toasts: state.toasts.filter(t => t.id !== id),
            }));
        }, 3000);
    },

    removeToast: (id) => set(state => ({
        toasts: state.toasts.filter(t => t.id !== id),
    })),

    setShowInstallPrompt: (show) => set({ showInstallPrompt: show }),

    // ── Booking Flow State ──────────────────────────────────
    bookingDraft: null,

    setBookingDraft: (draft) => set({ bookingDraft: draft }),

    clearBookingDraft: () => set({ bookingDraft: null }),

    confirmBooking: async () => {
        const { bookingDraft, addToast } = get();
        if (!bookingDraft) return;

        try {
            // Persist to backend
            const confirmedAppointment = await bookingService.bookAppointment({
                professional_id: bookingDraft.professional_id || bookingDraft.doctorId,
                start_time: bookingDraft.start_time || bookingDraft.startTime,
                end_time: bookingDraft.end_time || bookingDraft.endTime,
                notes: bookingDraft.notes || "Standard consultation"
            });

            // Update local state with the actual data from backend
            set(state => ({
                appointments: [...state.appointments, confirmedAppointment],
                bookingDraft: null
            }));

            addToast({ type: 'success', message: 'Appointment booked successfully!' });
            return confirmedAppointment;
        } catch (error) {
            console.error("Booking failed", error);
            addToast({
                type: 'error',
                message: error.response?.data?.detail || 'Failed to confirm booking. Please try again.'
            });
            throw error;
        }
    },
}));

export default useStore;
