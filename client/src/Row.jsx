import React from 'react';
import { books } from './data/books.js'; // Ensure you have the data imported
import './styles/Home.css';
import cart from "./scripts/cart.js";
import {useNavigate} from "react-router-dom";

 
const BookStore = (props) => {
  const navigate = useNavigate();
  const categories = ["Marketing", "Business", "Self-Development", "Stories"];
  

  const BookCard = ({ book }) => {
    const { image, name, rating, priceCents , id} = book;
    const price = (priceCents / 100).toFixed(2); // Convert cents to dollars
   function travel(id){
     navigate("/detail")
     props.getId(id)
     
   }
    function updateCartLength(){
      props.updateCart()
    }
    return (
      <div className="book-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>Rating: {rating.stars}/10 ({rating.count} reviews)</p>
        <button onClick={() =>{cart.addToCart(id)
                              updateCartLength()}} className="buy-button">buy</button>
        <button className='read-more-button' onClick={() =>{
        travel(id)
        }}>read more</button>
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
        const booksInCategory = books.filter((book) => book.category === category);
        return <Row key={category} title={category} books={booksInCategory} />;
      })}
    </div>
  );
};

export default BookStore;