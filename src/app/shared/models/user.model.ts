export interface User {
    id: number;
    email: string;
    token: string;
    name: string;
    profile_picture: object;
    gender: string;
    role: string;
    rate: number;
    phones: Array<string>;
    addresses: Array<string>;
}
