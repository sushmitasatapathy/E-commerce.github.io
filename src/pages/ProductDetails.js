import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Productdetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", category: "Category 1", subcategory: "Clothing", image: "https://th.bing.com/th/id/R.47fa9453e321d7c7a11209d9fece44bb?rik=Ox49MKTib7MFGw&riu=http%3a%2f%2fmu.oregonstate.edu%2fsites%2fmu.oregonstate.edu%2ffiles%2fart-gallery%2f2008%2f2008_3.1_clothes.jpg&ehk=vcDGBroxob%2fPQPqsE3FV7Kof8sS1zRHqpiLWumq9j6s%3d&risl=&pid=ImgRaw&r=0" },
    { id: 6, name: "Product 2", category: "Category 2", subcategory: "Clothing", image: "https://s3-ap-southeast-1.amazonaws.com/s3fileslive/public/gallery/12-Best-Kids-Stylish-Wear-1_1721924.jpeg" },
    { id: 7, name: "Product 3", category: "Category 3", subcategory: "Clothing", image: "https://ae01.alicdn.com/kf/HTB1yq0.RXXXXXbmapXXq6xXFXXXP/Dress-Shirt-Men-Short-Sleeve-Top-Quality-Smart-Casual-Mens-Clothes-Super-Slim-Fit-Dress-Shirts.jpg_640x640.jpg" },
    { id: 8, name: "Product 4", category: "Category 4", subcategory: "Gaming Pc", image: "https://th.bing.com/th/id/OIP.LVVDX7oRLJzgOM4QpEQjzwHaHa?pid=ImgDet&rs=1" },
    { id: 2, name: "Product 5", category: "Category 5", subcategory: "PS-4", image: "https://th.bing.com/th/id/OIP.8XlT0ZU_w0jZA9yZo_lojgHaE9?pid=ImgDet&rs=1" },
    { id: 4, name: "Product 6", category: "Category 6", subcategory: "SM-M31s", image: "https://coolmaterial.com/wp-content/uploads/2021/03/Amazon-Echo-Auto-Hands-Free-Alexa-Hardware-900x540.jpg" },
    { id: 5, name: "Product 7", category: "Category 7", subcategory: "Laptop", image: "https://c.pxhere.com/images/dd/fb/32f6e4c9eff8c290ca3466946ce7-1595236.jpg!d" },
    
   
   
    // Add more products as needed
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product, addressLabel, size, quantity) => {
    const productCopy = { ...product, addressLabel, size, quantity };
    setCart([...cart, productCopy]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const filteredProducts = products.filter((product) => {
    const { category, subcategory, name } = product;
    const term = searchTerm.toLowerCase();
    return (
      category.toLowerCase().includes(term) ||
      subcategory.toLowerCase().includes(term) ||
      name.toLowerCase().includes(term)
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div>
      <h2>Product List</h2>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
      </div>
      <Slider {...settings}>
        {filteredProducts.map((product) => (
          <div key={product.id}  className="product-container">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Category: {product.category}</p>
            <p>Subcategory: {product.subcategory}</p>
            <input type="text" placeholder="Address Label" onChange={(e) => product.addressLabel = e.target.value} />
            <br />
            <input type="number" placeholder="Quantity" min="1" onChange={(e) => product.quantity = e.target.value} />
            {product.subcategory === "Clothing" && ( // Render size options only for clothing products
              <div>
                <select onChange={(e) => product.size = e.target.value}>
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            )}
            {product.subcategory !== "Clothing" && ( // Render size information for non-clothing products
              <p>Size: N/A</p>
            )}
            <button onClick={() => addToCart(product, product.addressLabel, product.size, product.quantity)}>Buy now </button>
          </div>
        ))}
      </Slider>

      <h2>Products you Buy</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - Address Label: {product.addressLabel}, Size: {product.size}, Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


