import React, { Component } from "react";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //use bind to pass the index to the handleClick function scope on line 22
  handleClick = bookIndex => {
    this.props.removeBook(bookIndex);
  };

  render() {
    let { books } = this.props;
    let booksList = books.map((book, index) => {
      return (
        <tr key={index}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.ISBN}</td>
          <td name="bookIndex" onClick={this.handleClick.bind(this, index)}>
            <i className="fas fa-minus-circle" />
          </td>
        </tr>
      );
    });
    return (
      <div className="row">
        <div className="col-md-8 mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>
                  <i className="fas fa-trash-alt" />
                </th>
              </tr>
            </thead>
            <tbody>{booksList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BookList;
