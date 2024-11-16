const orders ={
  ordersArray:[],
  addOrder(array , price , date){
    this.ordersArray.push(
      {
        itemsArray:array,
        price:price,
        date:date
      }
    )
    console.log(this.ordersArray)
  }
}

export default orders