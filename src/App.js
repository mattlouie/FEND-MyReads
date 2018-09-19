import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  componentDidMount() {
    this.updateBooks();
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={ () => <ListBooks books={this.state.books} updateBooks={this.updateBooks()}/> } />
        <Route path='/search' render={ () =><SearchBooks/>} />
      </div>
    )
  }
}

export default BooksApp;
