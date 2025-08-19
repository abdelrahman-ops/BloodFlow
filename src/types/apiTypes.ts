// Auth
export interface DonorRegisterDto {
    name: string;
    email: string;
    password: string;
    bloodType: string;
}

export interface QuickDonorRegisterDto {
    name: string;
    email: string;
    bloodType: string;
}

// Donors
export interface DonorProfileResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        bloodType: string;
        city: string;
        district: string;
        gender: string;
        role: string;
    };
    donor: {
        lastDonationDate: Date;
        donationHistory: DonationHistoryResponse[number];
        donorLevel: 'Bronze' | 'Silver' | 'Gold';
        points: number;
        availability: boolean;
        donationCount: number;
    };
}

export interface DonorStatsResponse {
    totalDonations: number;
    points: number;
    donorLevel: string;
    lastDonationDate: Date | null;
}

export type DonationHistoryResponse = {
    id: string;
    date: Date;
    hospital: { id: string; name: string; address: string };
    status: 'Completed' | 'Cancelled' | 'Pending';
    quantity: number;
    bloodType: string;
}[];

export interface AddDonationDto {
    hospital: string;
    request?: string;
    bloodType?: string;
    quantity?: number;
    notes?: string;
    date?: Date;
}

export interface UpdateDonationDto {
    date?: Date;
    hospital?: string;
    bloodType?: string;
    quantity?: number;
    notes?: string;
    status?: 'Completed' | 'Cancelled' | 'Pending';
}

export interface changePassword{
    currentPassword?: String;
    newPassword?: String;
}



// apiTypes.ts
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface Location {
    type: string;
    coordinates: [number, number];
}

export interface Hospital {
    id: string;
    name: string;
    phone: string;
    address: Address;
    location?: Location;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'admin';
    hospital?: Hospital;
}

export interface DonorRegisterDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    bloodType: string;
    city: string;
    district: string;
    gender: string;
}

export interface AdminRegisterDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    hospitalId: string;
}

// export interface AdminRegisterDto {
//     name: string;
//     email: string;
//     password: string;
//     phone: string;
//     hospitalName: string;
//     hospitalPhone: string;
//     street: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     lat: number;
//     lng: number;
// }

export interface LoginDto {
    email: string;
    password: string;
}

export interface DonorProfileResponse {
    name?: string;
    email?: string;
    phone?: string;
    bloodType?: string;
    city?: string;
    district?: string;
    gender?: string;
    availability?: boolean;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

// Donor-specific types
export interface Donation {
    id: string;
    date: string;
    hospital: {
        id: string;
        name: string;
        address: string;
    };
    status: 'Completed' | 'Cancelled' | 'Pending';
    quantity: number;
    bloodType: string;
}

export interface DonorStats {
    totalDonations: number;
    points: number;
    donorLevel: 'Bronze' | 'Silver' | 'Gold';
    lastDonationDate: string | null;
}

export interface BloodRequest {
    id: string;
    patientName: string;
    bloodType: string;
    unitsNeeded: number;
    hospital: {
        id: string;
        name: string;
        address: string;
    };
    status: 'Pending' | 'Fulfilled' | 'Cancelled';
    createdAt: string;
}

export interface Donor {
    id: string;
    name: string;
    bloodType: string;
    city: string;
    district: string;
    availability: boolean;
    lastDonationDate: string | null;
}