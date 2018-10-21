import React, { Component } from 'react'
import CategoryList from './CategoryList'

class BookList extends Component {
   render() {
        const { books, onUpdateBook } = this.props
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <CategoryList
                            category='Currently Reading'
                            books={books.filter( (book) => book.shelf === 'currentlyReading')}
                            onUpdateBook={onUpdateBook}
                        />
                        <CategoryList
                            category='Want to Read'
                            books={books.filter( (book) => book.shelf === 'wantToRead')}
                            onUpdateBook={onUpdateBook}
                        />
                        <CategoryList
                            category='Read'
                            books={books.filter( (book) => book.shelf === 'read')}
                            onUpdateBook={onUpdateBook}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <a href="/search">Add a book</a>
                </div>
            </div>
        )
    }
}

export default BookList