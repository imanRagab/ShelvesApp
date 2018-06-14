import { User } from './user.model';
export interface Notification {
    id: number;
    title: string;
    body: string;
    click_action: string;
    icon: object;
    receiver_user: User;
    sender_user: User;
    created_at: any;
  
}
