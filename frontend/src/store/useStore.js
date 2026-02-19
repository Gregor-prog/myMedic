// ─────────────────────────────────────────────────────────────
// MyMedic — Zustand Global Store
// Central state management for Auth, Appointments, UI
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
import { authService } from '../services/api';

const useStore = create((set, get) => ({
    // ── Auth State ──────────────────────────────────────────
    isAuthenticated: false,
    currentUser: null,
    userRole: null, // 'patient' | 'professional'

    login: async (email, password) => {
        try {
            const data = await authService.login(email, password);
            localStorage.setItem('mymedic_token', data.access_token);
            const user = await authService.getMe();
            set({
                isAuthenticated: true,
                currentUser: user,
                userRole: user.role,
            });
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            await authService.register(userData);
            // Auto login after register? Or just return true.
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    },

    checkAuth: async () => {
        const token = localStorage.getItem('mymedic_token');
        if (token) {
            try {
                const user = await authService.getMe();
                set({ isAuthenticated: true, currentUser: user, userRole: user.role });
            } catch (error) {
                console.error("Token verification failed", error);
                set({ isAuthenticated: false, currentUser: null, userRole: null });
                localStorage.removeItem('mymedic_token');
            }
        }
    },

    logout: () => {
        localStorage.removeItem('mymedic_token');
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

    confirmBooking: () => {
        const { bookingDraft, addAppointment, addToast } = get();
        if (bookingDraft) {
            addAppointment(bookingDraft);
            set({ bookingDraft: null });
            addToast({ type: 'success', message: 'Appointment booked successfully!' });
        }
    },
}));

export default useStore;
