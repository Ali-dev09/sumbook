import { books } from "./data/books.js";
import { useNavigate } from "react-router-dom";
import "./styles/detail-book.css";
import { FaBuyNLarge } from "react-icons/fa";
import cart from './scripts/cart.js';
function DetailBook(props) {
  const navigate = useNavigate();
  const book = books.find((book) => book.id === props.bookId);

  function backHome() {
    navigate("/");
  }
  function buy(id){
    cart.addToCart(id)
  }
  function updateCart(){
     props.updateCart()
  }
  if (book) {
    
  
    return (
      <div className="page-container">
        <div className="details-head">
          <div className="image">
            <img src={book.image} alt={book.name} />
          </div>
          <div className="titel">
            <h2>{book.name}</h2>
          </div>
        </div>

        <div className="description-box">
          <p className="description">{book.description}</p>
        </div>

        <div className="price-rating">
          <p>Price: ${(book.priceCents / 100).toFixed(2)}</p>
          <p>
            Rating: {book.rating.stars}/10 ({book.rating.count} reviews)
          </p>
        </div>

        <button
          onClick={() => {
            backHome();
          }}
          className="back-home-button"
        >
          Back Home
        </button>
         <button onClick={() => {buy(book.id) 
                                updateCart()}} className="back-home-button" >buy</button>
      </div>
    );
  } else {
    return (
      <>
        <h1>Unknown error</h1>
        <button
          onClick={() => {
            backHome();
          }}
          className="back-home-button"
        >
          Back Home
        </button>
       
      </>
    );
  }
}

export default DetailBook;
