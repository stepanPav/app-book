import { Component, OnInit } from '@angular/core';

import { BooksService, IBook } from './books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string = '';
  author: string = '';
  amountOfPages: number = 0;
  booksList: Array<IBook> = [] ;
  isCorrect: Array<Boolean | null> = [null, null, null];
  toChange: Array<Boolean> = [];
  constructor(private _bookListService: BooksService){}

  ngOnInit(){
    this.booksList = this._bookListService.getList();
    for(let i = 0; i < this.booksList.length; i++){
      this.toChange.push(false)
    }
  }

  addBook(): void{
    console.log(this.isCorrect)
    let isRight: boolean = true;
    for(let i = 0; i < this.isCorrect.length; i++){
      if(!this.isCorrect[i]) {
        this.isCorrect[i] = false;
        isRight = false;
      }
        
    }
    if(isRight){
     this.booksList = this._bookListService.addBook({
      'id': this._bookListService.getLastId() + 1,
      'name': this.name,
      'author': this.author,
      'amountOfPages': this.amountOfPages
     })
     this.toChange.push(false)
    }
  }


  changeCurrentInfo(): void {
    let res = [];
    for(let i = 0; i< this.booksList.length; i++){
      res.push(Object.assign({}, this.booksList[i]))
    }
    this.booksList = res;
    
  }


  cancelChanges(): void{
    this.booksList = this._bookListService.getList();
  }


  removeBook(ind: number){
    this.booksList = this._bookListService.removeBook(this.booksList[ind])
  }

  saveChanges(indexOfPrev: number, newBook: IBook){
    if(confirm("Вы действительно хотите изменить данные?")) {
      this.booksList = this._bookListService.changeBook(newBook);
      this.toChange[indexOfPrev] = false;
    }
  }

  getList(): Array<IBook>{
    let res = [];
    for(let i = 0; i< this.booksList.length; i++){
      res.push(Object.assign({}, this.booksList[i]))
    }
    return res;
  }

  log(numOfInput: number): void {
    if(numOfInput === 1){
      if(this.name.trim().length < 2 || this.name.trim().length > 100 )
        this.isCorrect[0] = false;
      else{
        this.isCorrect[0] = true;
      }
    }
    else if(numOfInput === 2){
      if(this.author.trim().length < 5 || this.author.trim().length > 60 )
        this.isCorrect[1] = false;
      else this.isCorrect[1] = true;
    }
    else if(numOfInput === 3){
       
        if(!this.amountOfPages || this.amountOfPages < 10 || this.amountOfPages > 1000)
          this.isCorrect[2] = false;
        else
          this.isCorrect[2] = true;
    }
  }
}
