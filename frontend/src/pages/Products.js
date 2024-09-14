import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        barcode: '',
        pname: '',
        weight: ''
    });
    const [barcodeToRemove, setBarcodeToRemove] = useState('');

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8802/product");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/product', newProduct);
            setNewProduct({ barcode: '', pname: '', weight: '' });
            fetchAllProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleRemoveProduct = async () => {
        try {
            await axios.delete('http://localhost:8802/product', {
                data: { barcode: barcodeToRemove }
            });
            setBarcodeToRemove(''); 
            fetchAllProducts(); 
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <div>
            <h1>Product Catalog</h1>
            <form onSubmit={handleAddProduct}>
                <input 
                    type="text" 
                    placeholder="Barcode" 
                    value={newProduct.barcode} 
                    onChange={e => setNewProduct({ ...newProduct, barcode: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={newProduct.pname} 
                    onChange={e => setNewProduct({ ...newProduct, pname: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Weight" 
                    value={newProduct.weight} 
                    onChange={e => setNewProduct({ ...newProduct, weight: e.target.value })}
                />
                <button type="submit">Add Product</button>
            </form>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter barcode to remove" 
                    value={barcodeToRemove} 
                    onChange={e => setBarcodeToRemove(e.target.value)}
                />
                <button onClick={handleRemoveProduct}>Remove Product</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Product Name</th>
                        <th>Weight (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.barcode}>
                            <td>{product.barcode}</td>
                            <td>{product.pname}</td>
                            <td>{product.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
