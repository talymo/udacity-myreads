import React from 'react'
import PropTypes from 'prop-types'

const Book = ({books, onUpdateBook, book}) => {
    const checkBook = (bookId) => {
        let shelvedBook = books.filter( (book) => book.id === bookId);
        if(shelvedBook.length > 0) {
            return shelvedBook[0].shelf;
        } else {
            return 'none';
        }
    };
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    {book.imageLinks && (
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    )}
                    <div className="book-shelf-changer">
                        <select value={checkBook(book.id)} onChange={ (e) => onUpdateBook(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && (
                    <div className="book-authors">{book.authors.map((author) => (
                        <span key={author}>{author}</span>
                    ))}</div>
                )}
            </div>
        </li>
    )
}

Book.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Book