import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  showAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (book, currentShelf) => {
    BooksAPI.update(book, currentShelf)
      .then(this.showAll())
  }

  render() {
    const {thisBook, bookShelf} = this.props

        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${thisBook.imageLinks.thumbnail})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>
                       <div className="book-shelf-changer">
                            <select onChange={(event) => {this.changeShelf(thisBook, event.target.value)}}
                                    value={bookShelf}>
                                <option value="move" disabled>Move book to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="remove">Remove</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{thisBook.title}</div>
                    <div className="book-authors">{thisBook.authors ? thisBook.authors.toString() : 'Nothing!'}</div>
                </div>
            </li>
        )
    }
  }

export default Book
