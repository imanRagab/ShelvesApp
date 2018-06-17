import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Comment } from '../models/comment.model';
import { Reply } from '../models/reply.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  //create comment
  createComment(bookId :number,comment :object): Observable<Comment> {
    const route = `/book/books/${bookId}/comments`;
    return this.apiService.post(route, {comment: comment});
  }

  // show comments
  showComments(bookId :number): Observable<Array<Comment>>{
    const route = `/book/books/${bookId}/comments`;
    return this.apiService.get(route);
  }


  // create reply
  createReply(bookId :number,commentId :number,reply :object): Observable<Reply>{
    const route = `/book/books/${bookId}/comments/${commentId}/replies`;
    return this.apiService.post(route, {reply: reply});
  }
}
