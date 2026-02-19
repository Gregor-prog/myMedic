// ─────────────────────────────────────────────────────────────
// MyMedic — Mock Data
// Robust offline dataset for all domains
// ─────────────────────────────────────────────────────────────

// ── Doctors ──────────────────────────────────────────────────
export const doctors = [
    {
        id: 'doc-001',
        name: 'Dr. Sarah Jennings',
        specialty: 'Cardiologist',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf_cUpwZCJuApEylftjjU0jDsWecsWv2c3ZJnt-gHIKctdPkygsoOhqw5LsTZ2-WB42lHt_ClF_goZVGBRCpQG4kdzWq2E8NCbUP-te2WHbY8Mc-3bip5mdBJmLhXnkj9Eunu0PjYjAllxoJJ3SfrQiQIf3XC-waJMysJhBh32aL84TVjCtyd6VnoNiVS5Lb5RCmwICoNak84B9FSKoCqTYueduwQF2R9lRPqeNbEPQp5fgKEXp1Ldmv8Is9MCk60DHtAg2JSO-Aw',
        rating: 4.9,
        reviews: 127,
        experience: '15 years',
        hospital: 'MyMedic Premium Clinic',
        location: 'Lagos, Nigeria',
        fee: 25000,
        currency: '₦',
        bio: 'Specialist in preventive cardiology and heart health management. Published researcher with board certification in cardiovascular medicine.',
        verified: true,
        available: true,
        availability: ['Mon', 'Wed', 'Fri'],
        nextSlot: '10:00 AM',
        qualifications: ['MBBS', 'MD Cardiology', 'FACC'],
        languages: ['English', 'Yoruba'],
    },
    {
        id: 'doc-002',
        name: 'Dr. Michael Okoye',
        specialty: 'Dermatologist',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf5teHREefJczxKqdNze_9t9aASmQ5XN1Nr1XCANQoWYCjeQMQppYG2WaOqd421y1qyca8FBwUq47j0f5ZlP0rS_hhnUK0ZuEt_F236j8V6hWgy8BLrITTkPqm0pvc1riU_6zqd_r43nMtvpaFxK0jxJQtbLfnTXW7CoO2xLObf-VU478eClKW2qSLEnYNA4eRybmrEXYALVAg5XPRaBnartIbPn4tSszNPz6Wpy7f5_QTYVR6K3YjBFmW2hQVZGbWp-lwLPZ2Vl4',
        rating: 4.8,
        reviews: 95,
        experience: '12 years',
        hospital: 'Derma Excellence Center',
        location: 'Abuja, Nigeria',
        fee: 20000,
        currency: '₦',
        bio: 'Expert in clinical and cosmetic dermatology with specialization in skin conditions prevalent in tropical regions.',
        verified: true,
        available: true,
        availability: ['Tue', 'Thu', 'Sat'],
        nextSlot: '2:00 PM',
        qualifications: ['MBBS', 'MD Dermatology'],
        languages: ['English', 'Igbo'],
    },
    {
        id: 'doc-003',
        name: 'Dr. Amina Ibrahim',
        specialty: 'General Practitioner',
        avatar: null,
        rating: 4.7,
        reviews: 210,
        experience: '8 years',
        hospital: 'MyMedic General Practice',
        location: 'Lagos, Nigeria',
        fee: 15000,
        currency: '₦',
        bio: 'Experienced GP with a holistic approach to patient care. Specializes in family medicine and preventive healthcare.',
        verified: true,
        available: true,
        availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        nextSlot: '9:00 AM',
        qualifications: ['MBBS', 'MRCGP'],
        languages: ['English', 'Hausa', 'Arabic'],
    },
    {
        id: 'doc-004',
        name: 'Dr. Chukwuma Eze',
        specialty: 'Neurologist',
        avatar: null,
        rating: 4.9,
        reviews: 73,
        experience: '20 years',
        hospital: 'NeuroHealth Institute',
        location: 'Port Harcourt, Nigeria',
        fee: 35000,
        currency: '₦',
        bio: 'Leading neurologist specializing in headache disorders, epilepsy management, and neurodegenerative conditions.',
        verified: true,
        available: false,
        availability: ['Mon', 'Wed'],
        nextSlot: null,
        qualifications: ['MBBS', 'PhD Neurology', 'FRCP'],
        languages: ['English', 'Igbo'],
    },
    {
        id: 'doc-005',
        name: 'Dr. Fatima Abubakar',
        specialty: 'Pediatrician',
        avatar: null,
        rating: 4.8,
        reviews: 156,
        experience: '10 years',
        hospital: 'Children\'s Wellness Center',
        location: 'Kano, Nigeria',
        fee: 18000,
        currency: '₦',
        bio: 'Passionate pediatrician specializing in childhood development, vaccination programs, and adolescent health.',
        verified: true,
        available: true,
        availability: ['Mon', 'Tue', 'Thu', 'Fri'],
        nextSlot: '11:00 AM',
        qualifications: ['MBBS', 'FMCPaed'],
        languages: ['English', 'Hausa'],
    },
    {
        id: 'doc-006',
        name: 'Dr. Oluwaseun Adeyemi',
        specialty: 'Psychiatrist',
        avatar: null,
        rating: 4.6,
        reviews: 88,
        experience: '14 years',
        hospital: 'MindCare Clinic',
        location: 'Lagos, Nigeria',
        fee: 22000,
        currency: '₦',
        bio: 'Mental health specialist focused on anxiety, depression, and stress management. Teletherapy available.',
        verified: true,
        available: true,
        availability: ['Tue', 'Wed', 'Fri'],
        nextSlot: '3:00 PM',
        qualifications: ['MBBS', 'FMCPsych'],
        languages: ['English', 'Yoruba'],
    },
];

// ── Specialties ─────────────────────────────────────────────
export const specialties = [
    { id: 'all', name: 'All', icon: 'Grid3X3' },
    { id: 'cardiology', name: 'Cardiology', icon: 'Heart' },
    { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles' },
    { id: 'general', name: 'General', icon: 'Stethoscope' },
    { id: 'neurology', name: 'Neurology', icon: 'Brain' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby' },
    { id: 'psychiatry', name: 'Psychiatry', icon: 'HeartHandshake' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone' },
    { id: 'ophthalmology', name: 'Eye Care', icon: 'Eye' },
];

// ── Appointments ────────────────────────────────────────────
export const initialAppointments = [
    {
        id: 'appt-001',
        doctorId: 'doc-001',
        patientId: 'patient-001',
        date: '2026-02-24',
        time: '10:00 AM',
        type: 'consultation',
        status: 'upcoming',
        notes: 'Quarterly cardiovascular check-up',
        fee: 25000,
        paymentStatus: 'paid',
    },
    {
        id: 'appt-002',
        doctorId: 'doc-003',
        patientId: 'patient-001',
        date: '2026-03-05',
        time: '9:00 AM',
        type: 'follow-up',
        status: 'upcoming',
        notes: 'Follow-up on blood test results',
        fee: 15000,
        paymentStatus: 'pending',
    },
    {
        id: 'appt-003',
        doctorId: 'doc-002',
        patientId: 'patient-001',
        date: '2026-01-15',
        time: '2:00 PM',
        type: 'consultation',
        status: 'completed',
        notes: 'Skin rash evaluation',
        fee: 20000,
        paymentStatus: 'paid',
    },
];

// ── Patients (for Professional domain) ──────────────────────
export const patients = [
    {
        id: 'patient-001',
        name: 'Alexander Grant',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf5teHREefJczxKqdNze_9t9aASmQ5XN1Nr1XCANQoWYCjeQMQppYG2WaOqd421y1qyca8FBwUq47j0f5ZlP0rS_hhnUK0ZuEt_F236j8V6hWgy8BLrITTkPqm0pvc1riU_6zqd_r43nMtvpaFxK0jxJQtbLfnTXW7CoO2xLObf-VU478eClKW2qSLEnYNA4eRybmrEXYALVAg5XPRaBnartIbPn4tSszNPz6Wpy7f5_QTYVR6K3YjBFmW2hQVZGbWp-lwLPZ2Vl4',
        email: 'alexander.g@email.com',
        phone: '+234 801 234 5678',
        dob: '1990-05-15',
        bloodType: 'O+',
        allergies: ['Penicillin'],
        conditions: ['Mild Hypertension'],
        memberSince: '2024-01-15',
        memberTier: 'Premium',
    },
    {
        id: 'patient-002',
        name: 'Grace Nwosu',
        avatar: null,
        email: 'grace.n@email.com',
        phone: '+234 802 345 6789',
        dob: '1985-11-22',
        bloodType: 'A+',
        allergies: [],
        conditions: ['Type 2 Diabetes'],
        memberSince: '2024-06-10',
        memberTier: 'Standard',
    },
    {
        id: 'patient-003',
        name: 'Emmanuel Obi',
        avatar: null,
        email: 'emmanuel.o@email.com',
        phone: '+234 803 456 7890',
        dob: '1978-03-08',
        bloodType: 'B-',
        allergies: ['Aspirin', 'Latex'],
        conditions: ['Chronic Back Pain'],
        memberSince: '2025-02-20',
        memberTier: 'Premium',
    },
];

// ── Vitals ──────────────────────────────────────────────────
export const vitals = {
    heartRate: { value: 72, unit: 'bpm', status: 'normal', trend: 'stable' },
    bloodPressure: { value: '118/78', unit: 'mmHg', status: 'optimal', trend: 'stable' },
    temperature: { value: 98.4, unit: '°F', status: 'normal', trend: 'stable' },
    oxygenSat: { value: 98, unit: '%', status: 'normal', trend: 'stable' },
};

// ── Chat Messages ───────────────────────────────────────────
export const chatThreads = [
    {
        id: 'chat-001',
        participantId: 'doc-001',
        participantName: 'Dr. Sarah Jennings',
        participantRole: 'Cardiologist',
        lastMessage: 'Your test results look great. Keep up the healthy lifestyle!',
        timestamp: '2026-02-17T14:30:00',
        unread: 2,
        messages: [
            { id: 'm1', senderId: 'patient-001', text: 'Good morning Dr. Jennings, I wanted to ask about my recent ECG results.', timestamp: '2026-02-17T09:00:00' },
            { id: 'm2', senderId: 'doc-001', text: 'Good morning Alexander! I\'ve reviewed your results and everything looks excellent.', timestamp: '2026-02-17T09:15:00' },
            { id: 'm3', senderId: 'doc-001', text: 'Your test results look great. Keep up the healthy lifestyle!', timestamp: '2026-02-17T14:30:00' },
        ],
    },
    {
        id: 'chat-002',
        participantId: 'doc-003',
        participantName: 'Dr. Amina Ibrahim',
        participantRole: 'General Practitioner',
        lastMessage: 'Please remember to take your medication as prescribed.',
        timestamp: '2026-02-16T11:00:00',
        unread: 0,
        messages: [
            { id: 'm4', senderId: 'doc-003', text: 'Hi Alexander, just a reminder about your upcoming appointment next week.', timestamp: '2026-02-16T10:00:00' },
            { id: 'm5', senderId: 'patient-001', text: 'Thank you for the reminder! I\'ll be there.', timestamp: '2026-02-16T10:30:00' },
            { id: 'm6', senderId: 'doc-003', text: 'Please remember to take your medication as prescribed.', timestamp: '2026-02-16T11:00:00' },
        ],
    },
];

// ── Notifications ───────────────────────────────────────────
export const notifications = [
    { id: 'n1', type: 'appointment', title: 'Upcoming Appointment', message: 'Appointment with Dr. Jennings tomorrow at 10:00 AM', timestamp: '2026-02-17T08:00:00', read: false },
    { id: 'n2', type: 'message', title: 'New Message', message: 'Dr. Jennings sent you a message', timestamp: '2026-02-17T14:30:00', read: false },
    { id: 'n3', type: 'reminder', title: 'Medication Reminder', message: 'Time to take your Amlodipine 5mg', timestamp: '2026-02-17T07:00:00', read: true },
    { id: 'n4', type: 'system', title: 'Profile Updated', message: 'Your KYC verification has been approved', timestamp: '2026-02-16T15:00:00', read: true },
];

// ── Medical Records ─────────────────────────────────────────
export const medicalRecords = [
    { id: 'rec-001', title: 'Blood Work Panel', type: 'Lab Results', date: '2026-02-10', doctor: 'Dr. Amina Ibrahim', status: 'ready', category: 'laboratory' },
    { id: 'rec-002', title: 'ECG Report', type: 'Diagnostic', date: '2026-01-28', doctor: 'Dr. Sarah Jennings', status: 'ready', category: 'diagnostic' },
    { id: 'rec-003', title: 'Chest X-Ray', type: 'Imaging', date: '2026-01-15', doctor: 'Dr. Sarah Jennings', status: 'ready', category: 'imaging' },
    { id: 'rec-004', title: 'Prescription — Amlodipine', type: 'Prescription', date: '2026-02-01', doctor: 'Dr. Sarah Jennings', status: 'active', category: 'prescription' },
];

// ── Marketplace Products ────────────────────────────────────
export const marketplaceProducts = [
    { id: 'prod-001', name: 'Digital Blood Pressure Monitor', price: 45000, currency: '₦', category: 'devices', rating: 4.8, image: null },
    { id: 'prod-002', name: 'Pulse Oximeter Pro', price: 18000, currency: '₦', category: 'devices', rating: 4.6, image: null },
    { id: 'prod-003', name: 'First Aid Kit Premium', price: 12000, currency: '₦', category: 'supplies', rating: 4.9, image: null },
    { id: 'prod-004', name: 'Vitamin D3 Supplements (90ct)', price: 8500, currency: '₦', category: 'supplements', rating: 4.7, image: null },
];

// ── Time Slots (for booking) ────────────────────────────────
export const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];
