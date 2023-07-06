import React, { useState } from 'react';
import './Products.css';

const products = [
  { id: 1, category: 'Electronics', subcategory: 'Phone', title: 'iPhone X', price: 999, image: 'https://th.bing.com/th/id/OIP.c-7qVKc3jg9Iy2g2-8nN-wHaIE?pid=ImgDet&rs=1' },
  { id: 2, category: 'Electronics', subcategory: 'Smartwatch', title: 'Apple Watch', price: 299, image: 'https://www.bhphotovideo.com/images/images2500x2500/apple_m02x3ll_a_watch_series_6_gps_1595000.jpg' },
  { id: 3, category: 'Clothes', subcategory: 'Kids', title: 'Kids T-Shirt', price: 19, image: 'https://cdn.notonthehighstreet.com/fs/a3/5f/e9c9-02ac-4f4b-9ffa-fec936391c5b/original_personalised-kids-children-s-dinosaur-t-shirt.jpg' },
  { id: 4, category: 'Clothes', subcategory: 'Adult', title: 'Adult T-Shirt', price: 29, image: 'https://ae01.alicdn.com/kf/HTB1gRdGaRsmBKNjSZFsq6yXSVXaI/People-Say-I-m-Crazy-Novelty-Offensive-Adult-Humor-Sarcastic-Funny-T-Shirt-Short-Sleeve-Cotton.jpg' },
  { id: 5, category: 'Clothes', subcategory: 'Men', title: 'Men Shirt', price: 39, image: 'https://cdn.shopify.com/s/files/1/2360/8505/products/grey-t-shirt_1100x.jpg?v=1529050486' },
  { id: 6, category: 'Clothes', subcategory: 'Women', title: 'Women Dress', price: 49, image: 'https://ae01.alicdn.com/kf/HTB1G8pMOVXXXXXjXVXXq6xXFXXX1/2017-Women-s-fashion-lace-long-dresses-wine-green-color-girls-casual-slim-elegant-clothing-dress.jpg' },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
    setSelectedPrice('');
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setSelectedColor('');
    setSelectedQuantity(1);
    setSelectedAddress('');
    setConfirmation(null);

    if (product.category === 'Electronics') {
      setSelectedSubcategory('');
    }
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setConfirmation(null);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleConfirmPurchase = () => {
    setConfirmation(selectedProduct);
  };

  const handleCancelPurchase = () => {
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
    setSelectedQuantity(1);
    setSelectedAddress('');
    setConfirmation(null);
  };

  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;
    let matchesSubcategory = true;
    let matchesPrice = true;

    if (selectedCategory) {
      matchesCategory = product.category === selectedCategory;
    }

    if (selectedSubcategory) {
      matchesSubcategory = product.subcategory === selectedSubcategory;
    }

    if (selectedPrice) {
      matchesPrice = product.price <= parseInt(selectedPrice);
    }

    return matchesCategory && matchesSubcategory && matchesPrice;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const renderProductList = () => {
    return (
      <div className="product-list">
        {sortedProducts.map((product, index) => (
          <div key={product.id} className="product-item">
            <div className="product" style={{ display: 'inline-block', width: '33%' }}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                {selectedProduct === product ? (
                  <button onClick={() => handleBuyNow(product)}>Buy Now</button>
                ) : (
                  <div className="product-buttons">
                    <button onClick={() => handleBuyNow(product)}>Buy Now</button>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  const renderProductDialog = () => {
    return (
      <div className="dialog" style={{ width: '300px' }}>
        <h2>Product Details</h2>
        <div className="product-details-dialog">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <div className="product-info">
            <h3>{selectedProduct.title}</h3>
            <p>${selectedProduct.price}</p>
            <div className="product-options">
              {selectedProduct.category === 'Clothes' && (
                <>
                  <label htmlFor="size">Size:</label>
                  <select id="size" value={selectedSize} onChange={handleSizeChange}>
                    <option value="">-- Select Size --</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                </>
              )}
              {(selectedProduct.category === 'Clothes' || selectedProduct.category === 'Electronics') && (
                <>
                  <label htmlFor="color">Color:</label>
                  <select id="color" value={selectedColor} onChange={handleColorChange}>
                    <option value="">-- Select Color --</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                  </select>
                  {selectedProduct.category === 'Clothes' && (
                    <>
                      <label htmlFor="quantity">Quantity:</label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={selectedQuantity}
                        onChange={handleQuantityChange}
                      />
                    </>
                  )}
                  <label htmlFor="address">Shipping Address:</label>
                  <textarea id="address" value={selectedAddress} onChange={handleAddressChange}></textarea>
                </>
              )}
            </div>
            <div className="product-actions">
              {selectedProduct.category === 'Clothes' && (
                <>
                  <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                  <button onClick={handleCancelPurchase}>Cancel</button>
                </>
              )}
              {selectedProduct.category === 'Electronics' && (
                <>
                  <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                  <button onClick={handleCancelPurchase}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationDialog = () => {
    return (
      <div className="dialog" style={{ width: '400px' }}>
        <h2>Confirmation</h2>
        <p>You have successfully purchased:</p>
        <div className="product-details-dialog">
          <img src={confirmation.image} alt={confirmation.title} />
          <div className="product-info">
            <h3>{confirmation.title}</h3>
            <p>${confirmation.price}</p>
            {selectedProduct.category === 'Clothes' && (
              <>
                <p>Size: {selectedSize}</p>
                <p>Color: {selectedColor}</p>
                <p>Quantity: {selectedQuantity}</p>
                <p>Shipping Address:</p>
                <p>{selectedAddress}</p>
              </>
            )}
            {selectedProduct.category === 'Electronics' && (
              <>
                <p>Shipping Address:</p>
                <p>{selectedAddress}</p>
              </>
            )}
          </div>
        </div>
        <button onClick={handleCancelPurchase}>Close</button>
      </div>
    );
  };

  return (
    <div className="products">
      <h1>Product Catalog</h1>
      <div className="filters">
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">-- Select Category --</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
        </select>
        <label htmlFor="subcategory">Subcategory:</label>
        <select
          id="subcategory"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
        >
          <option value="">-- Select Subcategory --</option>
          {selectedCategory === 'Electronics' ? (
            <>
              <option value="Phone">Phone</option>
              <option value="Smartwatch">Smartwatch</option>
            </>
          ) : (
            <>
              <option value="Kids">Kids</option>
              <option value="Adult">Adult</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </>
          )}
        </select>
        <label htmlFor="price">Price:</label>
        <select id="price" value={selectedPrice} onChange={handlePriceChange}>
          <option value="">-- Select Price --</option>
          <option value="50">Less than $50</option>
          <option value="100">Less than $100</option>
          <option value="200">Less than $200</option>
        </select>
        <label htmlFor="sort">Sort:</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      {selectedProduct ? renderProductDialog() : renderProductList()}
      {confirmation && renderConfirmationDialog()}
    </div>
  );
};

export default Products;



