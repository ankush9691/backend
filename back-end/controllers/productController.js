import fetch from 'node-fetch';
import Product from '../models/Product.js'; 

const API_URL = 'https://project-2-oeyt.onrender.com/product'; 

export const fetchProducts = async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

        const products = await response.json();

        const validProducts = products.filter(product => 
            product.name && typeof product.name === 'string' &&
            product.price && typeof product.price === 'number' &&
            product.image && typeof product.image === 'string'
        );

        res.json(validProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price, image } = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newProduct = new Product({ name, price, image });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

