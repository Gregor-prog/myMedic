import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('mymedic_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token and redirect to login if 401
            localStorage.removeItem('mymedic_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (email, password) => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const response = await api.post('/auth/token', formData);
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export const bookingService = {
    getMyAppointments: async () => {
        const response = await api.get('/appointments/my-schedule');
        return response.data;
    },
    bookAppointment: async (data) => {
        const response = await api.post('/appointments', data);
        return response.data;
    },
};

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

export default api;
