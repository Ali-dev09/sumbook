const orders = {
  ordersArray: [],

  // Initialize ordersArray from localStorage if it exists
  loadOrders() {
    const savedOrders = localStorage.getItem('ordersArray');
    if (savedOrders) {
      this.ordersArray = JSON.parse(savedOrders);  // Parse the saved data from localStorage
    }
  },

  // Add new order to the ordersArray
  addOrder(array, price, date) {
    const newOrder = {
      id: Date.now(), // Generate a unique ID for the order
      itemsArray: array,
      price: price,
      date: date,
    };

    this.ordersArray.push(newOrder);

    // Save the updated ordersArray to localStorage
    localStorage.setItem('ordersArray', JSON.stringify(this.ordersArray));
    console.log('Updated orders:', this.ordersArray);
  },

  // Optionally, you can clear all orders if needed
  clearOrders() {
    this.ordersArray = [];
    localStorage.removeItem('ordersArray');
  },
};

// Initialize orders when the application starts
orders.loadOrders();

export default orders;
