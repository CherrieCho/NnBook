import React from "react";
import { Link } from "react-router";

const BookItem = ({ book }) => {
  const imageUrl = book.cover.replace("/cover500/", "/coversum/");

  return (
    <div className="book-card">
      <Link to={`/books/${book.itemId}`}>
        <img src={imageUrl} alt={book.title?.split(" - ")[0].split(" (")[0]} />
        <p className="book-title">{book.title?.split(" - ")[0]}</p>
        <small className="book-author">{book.author?.split(" (")[0]}</small>
      </Link>
    </div>
  );
};

export default BookItem;
