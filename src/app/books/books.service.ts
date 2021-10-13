import { Injectable } from '@angular/core';

export interface IBook {
  id: number;
  name: string;
  author: string;
  amountOfPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private listOfBooks: Array<IBook> = [
    {
      id: 0,
      name: '1984',
      author: 'Оруэлл',
      amountOfPages: 291
    }
  ];
  constructor() { }

  getList(): Array<IBook>{
    return this.listOfBooks;
  }

  addBook(book: IBook){
    this.listOfBooks = this.listOfBooks.slice();
    this.listOfBooks.push(book);
    return this.listOfBooks;
  }

  getLastId(): number {
    if(this.listOfBooks.length === 0) return 0;
    return this.listOfBooks[this.listOfBooks.length - 1].id;
  }
  removeBook(book: IBook){
    return this.listOfBooks = this.listOfBooks.filter(val => {
      return (val.id !== book.id)
    })
  }
  get(index: number): IBook{
    if(index < 0 || index > (this.listOfBooks.length - 1)){
      throw console.error('Неверный индекс');
    }
    else
      return this.listOfBooks[index];
  }

  changeBook(book: IBook){
    this.listOfBooks.forEach((val, index) => {
      if(val.id === book.id)
        this.listOfBooks[index] = book;
    })
    return this.listOfBooks;
  }

}
