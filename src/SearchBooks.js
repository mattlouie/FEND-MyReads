import React, { Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book';
import debounce from 'lodash.debounce'

class SearchBooks extends Component {

  state = {
    query: '',
    books: [],
    shelvedBooks: []
  }

  updateBooks = () => {
    BooksAPI.getAll().then((shelvedBooks) => {
      this.setState({shelvedBooks})
    })
  }

  updateQueryDebounced = debounce(this.updateQuery, 1000)

  handleChange = (e) => {
    const query = e.target.value
    this.setState({ query })
    this.updateQueryDebounced(query)
  }

  componentWillMount() {
    this.updateBooks();
  }

  updateQuery = (query) => {
      if(query) {
          this.setState({ query })
          BooksAPI.search(query).then(result => {
              if (!result || result.error) {
                  this.setState({
                      books: []
                  })
              } else {

                  // Search Results
                  result.map((book) => {
                      book.shelf = 'none'
                      this.state.shelvedBooks.map((shelvedBook) => {
                          if(shelvedBook.id === book.id) {
                              book.shelf = shelvedBook.shelf
                          }
                      })
                  })
                  this.setState({books: result})
              }
          }).catch(error => {
              console.log(error)
          })
      } else {
          this.setState({
              query: '',
              books: []
          })
      }
    }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    const {query, books} = this.state

    return (
      <div className='search-books'>
          <div className='search-books-bar'>
              <Link to='/' className='close-search'>Close</Link>
              <div className='search-books-input-wrapper'>
                  <input
                    type='text'
                    placeholder='Search by title or by author'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                  />
              </div>
          </div>

          <div className='search-books-results'>
              <h3>{query !== '' ? `${books.length} Books That Match` : ``}</h3>
              <button onClick={this.clearQuery}>Clear</button>
              <ol className='books-grid'>
                {books.map((book) => (
                  <Book key={books.id} thisBook={book} bookShelf={book.shelf}/>
                ))}
              </ol>
          </div>
      </div>
    )

  }

}

export default SearchBooks
