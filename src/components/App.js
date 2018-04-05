import React, { Component } from 'react';
import BookList from './BookList';
import ErrorMessage from './ErrorMessage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      isbn: '',
      books: [],
      error: false,
    }

    this.removeBook = this.removeBook.bind(this);
  }

  componentDidMount() {
    //check to see if there are books in local storage
    let booklist = JSON.parse(localStorage.getItem('booklist')) || [];
    //setState if there are items in the booklist object
    if (booklist.length > 0) {
      this.setState({
        books: booklist,
      });
    }
  }

  removeBook = (bookIndex) => {
    let { books } = this.state;
    books.splice(bookIndex, 1);
    this.setState({
      books: books,
    });
  }

  handleSubmit = (event) => {
    let { title, author, isbn, books } = this.state;
    let bookIndex = 0;
    event.preventDefault();
    if (title !== '' || author !== '' || isbn !== '') {
      bookIndex++;
      //use object.assign to create an object with title, author and isbn
      let book = Object.assign({title, author, isbn, bookIndex});
      //create an array with the current items in books and the book object
      book = [...books, book];
      //add the object into local storage
      localStorage.setItem('booklist', JSON.stringify(book));
      //add an array consistsing of the books and current book object
      this.setState({
        books: book,
        error: false,
      });
    } else {
      //display the error message component
      this.setState({
        error: true,
      });
    }
  }

  handleChange = (event) => {
    //get a reference to the name and value
    let { name, value } = event.target;
    //update the state
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { title, author, isbn, books, error} = this.state;
    return (
      <div>
      <h1 className="mx-auto">Add Book</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            { !error ? null : <ErrorMessage />}
            <label htmlFor="title">Title</label>
            <input 
              placeholder="Book Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              type="text" 
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="Author">Author</label>
            <input 
              placeholder="Book Author"
              name="author"
              value={author}
              onChange={this.handleChange}
              type="text" 
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="ISBN">ISBN</label>
            <input 
              placeholder="ISBN"
              name="isbn"
              value={isbn}
              onChange={this.handleChange}
              type="text"
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 pt-3">
            <input type="submit" className="btn btn-primary btn-block"/>
          </div>
        </div>
      </form>
      <BookList 
        books={books}
        removeBook={this.removeBook}/>
      </div>
    );
  }
}

export default App;
