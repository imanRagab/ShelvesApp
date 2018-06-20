import { Phone } from './phone.model';

export interface User {
    id: number;
    email: string;
    token: string;
    name: string;
    profile_picture: object;
    gender: string;
    role: string;
    rate: number;
    phone: Phone;
    addresse: string;
    interests: Array<object>;
}
