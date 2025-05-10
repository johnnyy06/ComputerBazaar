// backend/config/textIndexSetup.js
import Product from '../models/ProductModel.js';

// Function to create text indexes for search functionality
export async function createTextIndexes() {
  try {
    // Create text index on multiple fields for better search capability
    await Product.collection.createIndex(
      {
        name: 'text',
        description: 'text',
        brand: 'text',
        category: 'text',
        'specifications': 'text'
      },
      {
        name: 'ProductTextIndex',
        weights: {
          name: 10,        // Higher weight for name matches
          brand: 7,        // High weight for brand matches
          category: 5,     // Medium weight for category matches
          description: 3,  // Lower weight for description matches
          'specifications': 2 // Lower weight for specifications
        },
        default_language: 'none', // Disable language-specific stemming
        background: true
      }
    );

    console.log('Text indexes created successfully');
  } catch (error) {
    console.error('Error creating text indexes:', error);
  }
}

// Function to setup all necessary indexes for search
export async function setupSearchIndexes() {
  try {
    // Text index for search
    await createTextIndexes();

    // Additional indexes for filtering and sorting
    await Product.collection.createIndex({ price: 1 });
    await Product.collection.createIndex({ price: -1 });
    await Product.collection.createIndex({ brand: 1 });
    await Product.collection.createIndex({ category: 1 });
    await Product.collection.createIndex({ stock: 1 });
    await Product.collection.createIndex({ createdAt: -1 });
    
    // Compound indexes for common query patterns
    await Product.collection.createIndex({ category: 1, price: 1 });
    await Product.collection.createIndex({ brand: 1, price: 1 });
    
    console.log('All search indexes setup successfully');
  } catch (error) {
    console.error('Error setting up search indexes:', error);
  }
}

export default {
  createTextIndexes,
  setupSearchIndexes
};