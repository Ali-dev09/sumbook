function generateRandomId(length) {
  const charcters = "0123456789";

  let final = "";
  for (let i = 0; i < length; i++) {
    final += charcters[Math.floor(Math.random() * charcters.length)];
  }
  return final
}

const orders = {
  ordersArray: [],

  // Initialize ordersArray from localStorage if it exists
  loadOrders() {
    const savedOrders = localStorage.getItem("ordersArray");
    if (savedOrders) {
      this.ordersArray = JSON.parse(savedOrders); // Parse the saved data from localStorage
    }
  },

  // Add new order to the ordersArray
  addOrder(array, price, date) {
    const newOrder = {
      itemsArray: array,
      price: price,
      date: date,
      id:  generateRandomId(10),
    };

    this.ordersArray.push(newOrder);

    // Save the updated ordersArray to localStorage
    localStorage.setItem("ordersArray", JSON.stringify(this.ordersArray));
    console.log("Updated orders:", this.ordersArray);
  },

  
 
};

// Initialize orders when the application starts
orders.loadOrders();

export default orders;
