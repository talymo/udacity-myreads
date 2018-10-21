import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from "./BookList";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  constructor (props){
      super(props);

      this.addBook = this.addBook.bind(this);
      this.updateBook = this.updateBook.bind(this);
      this.removeBook = this.removeBook.bind(this);
  }

  state = {
    books: []
  }

  addBook(bookId) {
    BooksAPI.get(bookId).then(book => {
      this.setState( (state) => ({
          books: state.books.concat(book)
      }))
    })
  }
  removeBook(bookId) {
    this.setState( (state) => ({
      books: state.books.filter( (b) => b.id !== bookId)
    }))
  }
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then( () => {
        this.removeBook(book.id);
        this.addBook(book.id);
    });
  }
  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({ books })
    });
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <BookList
              onUpdateBook={this.updateBook}
              onAddBook={this.addBook}
              books={this.state.books}
            />
        )}/>
        <Route path="/search" render={() => (
            <SearchBooks
              onUpdateBook={this.updateBook}
              books={this.state.books}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
