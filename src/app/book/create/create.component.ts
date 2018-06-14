import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import {
  Book,
  BookService,
  User,
  UserService,
  Category,
  CategoryService
} from '../../shared';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  book: Book;
  currentUser: User;
  bookForm: FormGroup;
  bookFormErrors = {};
  categories: Array<Category>;
  bookImages: Array<any>;
  isBookStore: Boolean;
  isBids: Boolean;
  formType: string;
  imagesChanged: Boolean;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', [
        Validators.required,
        Validators.minLength(50),
      ]],
      'category_id': ['', Validators.required],
    });
   }

  ngOnInit() {

    this.imagesChanged = false;
    this.isBookStore = false;
    this.formType = "create";
    // get list of book categories
    this.getCategories();

    // get book id from url
    const book_id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.bookImages = [];

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        // add form control for price & quantity if the user is a bookstore user
        if (this.currentUser.role === 'Book store') {
          this.isBookStore = true;
          this.bookForm.addControl('price', new FormControl('', Validators.required));
          this.bookForm.addControl('quantity', new FormControl('', Validators.required));
        } 
        else {
          this.bookForm.addControl('transcation', new FormControl('', Validators.required));
        }
      }
    );  
    
    // check if edit book
    this.route.url.subscribe(data => {
      if(data[data.length - 2].path == "edit"){
        this.formType = "edit";
        // get book data
        if(book_id){
          this.bookService.getBook(book_id).subscribe(
            result => {
              this.book = result['book'];
              this.bookForm.controls['name'].setValue(this.book.name);
              this.bookForm.controls['description'].setValue(this.book.description);
              this.bookForm.controls['category_id'].setValue(this.book.category['id']);
              for(let bookImage of this.book.book_images) {
                this.bookImages.push(`${environment.api_host}` + bookImage.image.url);
              }
              if(this.book['transcation'] != "Sell"){
                if(this.formType == "edit") {
                  this.bookForm.addControl('transcation', new FormControl(this.book['transcation'], Validators.required));
                }
              }               
              if(this.book['transcation'] == "Sell By Bids"){
                this.isBids = true;
                this.bookForm.addControl('price', new FormControl(this.book.price));
              } 
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    });
  }

  // Create book
  createBook() {
    const book = this.bookForm.value;
    this.bookService
    .createBook(book)
    .subscribe(
      result => {
        this.router.navigateByUrl(`/books/${result['book'].id}`);
    },
      error => {
        alert("Couldn\'t create the book!")
        this.router.navigateByUrl('/');
        // console.log(error);
      }
    );
  }

  // update book
  updateBook() {
    let book = this.bookForm.value;
    book.id = this.book.id;
    this.bookService
    .updateBook(book)
    .subscribe(
      result => {
        // console.log(result)
        this.router.navigateByUrl(`/books/${book.id}`);
    },
      error => {
        alert("Couldn\'t update the book!")
        this.router.navigateByUrl('/');
        // console.log(error);
      }
    );
  }

  // get selected files
  onFileChange(e) {

    if(!this.imagesChanged)
      this.bookForm.addControl('book_images_attributes', new FormControl('', Validators.required));

    this.imagesChanged = true;
    this.bookImages = [];
    for (let file of e.target.files) { 
      let reader = new FileReader();    
      reader.readAsDataURL(file);
      reader.onload = (result) => {
        this.bookImages.push(reader.result);
      };
    }    
  }

  // get list of all categories
  getCategories() {
    this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result['data'];
      },
      error => {
        console.log(error);
      }
    );
  }

  // change form according to transcation
  onTransactionChange(){
    
    let transcation = this.bookForm.get('transcation').value;
    if(transcation == "Sell By Bids"){
      this.isBids = true;
      this.bookForm.addControl('price', new FormControl());
    }  
    else {
      this.isBids = false;
      this.bookForm.removeControl('price');
    }  
  }

  // submit book function create/update
  submitBook() {

    if(this.formType == "edit") {
      if(this.imagesChanged)
        this.bookForm.get('book_images_attributes').setValue(this.bookImages);
    console.log(this.bookForm.value)
      this.updateBook();
    }

    else {
      this.bookForm.get('book_images_attributes').setValue(this.bookImages)
      this.createBook();
    }

  }
}