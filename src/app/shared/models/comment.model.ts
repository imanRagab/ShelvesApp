import { User } from './user.model';
import { Book } from './book.model';

export interface Comment {
    id: number;
    comment: string;
    user: User;
    book: Book;
    created_at: any;
    replies: Array<any>;
}    