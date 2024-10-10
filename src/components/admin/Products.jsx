import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Css/AdminShops.css"
const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, formData]);
    setFormData({ name: '', image: '', price: '', quantity: '' });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Shopkeeper Product Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="p-5 col-md-11">
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Products;
