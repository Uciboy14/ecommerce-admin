"use client";

import { useState } from "react";

const NewProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('category', category);

      console.log([...formData]);

      const response = await fetch('/api/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Clear form fields
      setProductName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setCategory('');
      setError(null);
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={createProduct}>
        <h1 className="head_text">New Product</h1>
        <label className="my_label">Product Name</label>
        <input
          type="text"
          className="form_input"
          placeholder="Product Name"
          value={productName}
          required
          onChange={(e) => setProductName(e.target.value)}
        />
        <label className="my_label">Description</label>
        <textarea
          className="form_input"
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="my_label">Price (in USD)</label>
        <input
          type="text"
          className="form_input"
          placeholder="Price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="flex">
            <div className="flex flex-col gap-2 mb-4">
                <label className="my_label">Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="my_label">Category</label>
                    <select
                        className="form_input"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value=""> Select Category</option>
                    </select>
            </div>
        </div>
        
        
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
