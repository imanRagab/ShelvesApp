import { User } from './user.model';
import { Book } from './book.model';
export interface Order{
    id: number;
    user: User;
    book: Book;
    seller: User;
    state: number;
    transaction: number;
    price: number;
    quantity: number;
    exchangeable_book: Book;
    notification_sent: boolean;
    exchangeable_books: string
}