import React from 'react'
import PropTypes from 'prop-types'
import CategoryList from './CategoryList'

const BookList = ({books, onUpdateBook}) => {
    return (
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

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default BookList