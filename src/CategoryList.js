import React from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

const CategoryList = ({books, onUpdateBook, category}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{category}</h2>
            <div className="bookshelf-books">
                {books && (
                    <ol className="books-grid">
                        {books.map( (book) => (
                            <Book
                                key={book.id}
                                book={book}
                                checkBook={this.checkBook}
                                onUpdateBook={onUpdateBook}
                                books={books}
                            />
                        ))}
                    </ol>
                )}
            </div>
        </div>
    )
}

CategoryList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default CategoryList