import { User } from './user.model';
import { Category } from './category.model';

export interface Book {
    id: number;
    name: string;
    description: string;
    rate: number;
    price: number;
    quantity: number;
    transaction: string;
    category: Category;
    user: User;
    bid_user: User;
    book_images: Array<any>;
}
