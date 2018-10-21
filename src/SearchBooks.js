import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
    constructor (props){
        super(props);
        this.state = {
            library: [],
            query: ''
        }
    }
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
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
    render() {
        const { onUpdateBook, books } = this.props;
        const { library, query } = this.state;

        let showingBooks = library.error ? [] : library;

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
}

export default SearchBooks