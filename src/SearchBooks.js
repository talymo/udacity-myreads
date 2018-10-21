import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    constructor (props){
        super(props);
        this.state = {
            library: [],
            query: ''
        }
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        if(query){
            BooksAPI.search(query).then( books => {
                this.setState({
                    library: books
                })
            })
        } else {
            this.setState({
                library: []
            })
        }
    }

    checkBook = (bookId) => {
        let shelvedBook = this.props.books.filter( (book) => book.id === bookId);
        if(shelvedBook.length > 0) {
            return shelvedBook[0].shelf;
        } else {
            return 'none';
        }

    }

    componentDidMount() {

    }
    render() {
        const { onUpdateBook } = this.props;
        const { library, query } = this.state;

        let showingBooks = [];

        if(library.error) {
            showingBooks = [];
        } else {
            showingBooks = library;
        }

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" href="/">Close</a>
                    <div className="search-books-input-wrapper">
                        <input
                            className='search-contacts'
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooks && (
                        <ol className="books-grid">
                            {showingBooks.map( (book) => (
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
                                                <select value={this.checkBook(book.id)} onChange={ (e) => onUpdateBook(book, e.target.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                        <div className="book-shelf">{book.shelf}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBooks