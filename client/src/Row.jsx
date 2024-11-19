import React, { useState, useRef } from "react";
import { books } from "./data/books.js"; 
import "./styles/Home.css";
import cart from "./scripts/cart.js";
import { useNavigate } from "react-router-dom";
import {FaCheckCircle} from 'react-icons/fa'
const BookStore = (props) => {
  const navigate = useNavigate();
  const categories = ["Marketing", "Business", "Self-Development", "Stories"];

  // Ref for dialog
  const dialogRef = useRef(null);

  // State for storing the book name that was added
  const [bookName, setBookName] = useState("");

  // Separate function to show the dialog with the book name
  const showDialog = (bookName) => {
    setBookName(bookName);
    dialogRef.current.showModal(); // Show the dialog
    setTimeout(() => {
      dialogRef.current.close(); // Close the dialog after 1 second
    }, 6000);
  };

  const BookCard = ({ book }) => {
    const { image, name, rating, priceCents, id } = book;
    const price = (priceCents / 100).toFixed(2); // Convert cents to dollars

    // Function to handle navigation to the book details page
    function travel(id) {
      navigate("/detail");
      props.getId(id);
    }

    // Function to add the book to the cart (reverted to previous state)
    function handleAddToCart(id) {
      cart.addToCart(id); // Add the book to the cart
      showDialog(name); // Show the dialog with the book name
      props.updateCart(); // Update the cart icon/length or related UI if needed
    }

    return (
      <div className="book-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>
          Rating: {rating.stars}/10 ({rating.count} reviews)
        </p>
        <div className="card-buttons">
          <button
            onClick={() => {
              handleAddToCart(id); // Trigger adding to cart and showing the dialog
            }}
            className="buy-button"
          >
            buy
          </button>
          <button
            className="read-more-button"
            onClick={() => {
              travel(id);
            }}
          >
            read more
          </button>
        </div>
      </div>
    );
  };

  const Row = ({ title, books }) => {
    return (
      <div className="book-row">
        <h2>{title}</h2>
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {categories.map((category) => {
        const booksInCategory = books.filter(
          (book) => book.category === category
        );
        return <Row key={category} title={category} books={booksInCategory} />;
      })}

      {/* Dialog to show the "added" message */}
      <dialog ref={dialogRef} className="add-dialog">
        <FaCheckCircle />
        
        <p>Added: {bookName}</p>
      </dialog>
    </div>
  );
};

export default BookStore;
