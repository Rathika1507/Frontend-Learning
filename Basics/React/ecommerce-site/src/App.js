import React, { useState } from "react";
import "./App.css";
import products from "./data/products";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filter products by category and search term
  const filteredProducts = products.filter((p) => {
    return (
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="App">
      <header>
        <h1>🛒 React E-Commerce</h1>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <main className="main-content">
        <section className="products">
          {filteredProducts.map((p) => (
            <Product key={p.id} product={p} addToCart={addToCart} />
          ))}
        </section>

        <section className="cart-section">
          <Cart cartItems={cart} removeFromCart={removeFromCart} />
        </section>
      </main>
    </div>
  );
}

export default App;
