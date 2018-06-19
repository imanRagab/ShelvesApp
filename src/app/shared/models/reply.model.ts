import { User } from './user.model';
import { Comment } from './comment.model';

export interface Reply {
    id: number;
    reply: string;
    user: User;
    comment: Comment;
    created_at: any;
}    