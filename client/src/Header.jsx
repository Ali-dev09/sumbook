import { FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
export default function Header(props){
  const navigate = useNavigate();
  function travel(){
    navigate("/checkout")
  }
  const {cartLength} = props
  return(
    <>
      <header className="header">
        <h1 onClick={() => {navigate('/')}} className="header-title">Book Haven</h1>
        <div className="cart-container">
          <FaShoppingCart onClick={travel} className="cart-icon" />
          <span onClick={travel} className="cart-count">{cartLength}</span> {/* Displaying cart count */}
        </div>
      </header>
    </>

  )
}