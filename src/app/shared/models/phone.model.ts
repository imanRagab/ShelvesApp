import { User } from './user.model';

export interface Phone {
    id: number; 
    phone: string;
    user: User;
}
