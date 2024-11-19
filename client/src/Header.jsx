import { FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
export default function Header(props){
  const navigate = useNavigate();
  function travel(path){
    navigate(`/${path}`)
  }
  const {cartLength} = props
  return(
    <>
      <header className="header">
        <h1 onClick={() => {navigate('/')}} className="header-title">Book Haven</h1>
        
          
        
        <div className="cart-container">
          <button  onClick={() => {
            travel('orders')
                }} className='orders'>orders</button>
          <FaShoppingCart onClick={() => {
      travel('checkout')
          }} className="cart-icon" />
          <span onClick={() => {
      travel("checkout")
          }} className="cart-count">{cartLength}</span> {/* Displaying cart count */}
        </div>
      </header>
    </>

  )
}