// backend/controllers/searchController.js
import Product from '../models/ProductModel.js';

// @desc    Search products
// @route   GET /api/search
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const category = req.query.category;
    const sortBy = req.query.sortBy || 'relevance';
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 12;

    // Build search query
    let query = {};
    
    if (keyword) {
      query = {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { brand: { $regex: keyword, $options: 'i' } }
        ]
      };
    }

    // Add category filter if specified
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Build sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price_asc':
        sortOptions = { price: 1 };
        break;
      case 'price_desc':
        sortOptions = { price: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      default: // relevance
        // For basic search, sort by updated products first
        sortOptions = { createdAt: -1 };
        break;
    }

    // Count total documents
    const count = await Product.countDocuments(query);

    // Execute search
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Get search suggestions (related terms)
    const suggestions = await generateSearchSuggestions(keyword);

    res.json({
      products,
      suggestions,
      totalCount: count,
      page,
      pages: Math.ceil(count / pageSize)
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get search suggestions
// @route   GET /api/search/suggestions
// @access  Public
export const getSearchSuggestions = async (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    // Get suggestions from product names
    const nameSuggestions = await Product.find(
      { name: { $regex: `^${query}`, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    // Get suggestions from brands
    const brandSuggestions = await Product.find(
      { brand: { $regex: `^${query}`, $options: 'i' } },
      { brand: 1 }
    ).limit(3);

    // Extract just the values and combine suggestions
    const nameValues = nameSuggestions.map(p => p.name);
    const brandValues = [...new Set(brandSuggestions.map(p => p.brand))];
    
    // Combine and deduplicate suggestions
    const allSuggestions = [...nameValues, ...brandValues];
    const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 8);

    res.json({ suggestions: uniqueSuggestions });
  } catch (error) {
    console.error('Get search suggestions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get popular searches
// @route   GET /api/search/popular
// @access  Public
export const getPopularSearches = async (req, res) => {
  try {
    // This could be based on actual search analytics
    // For now, return some popular terms
    const popularSearches = [
      'laptop gaming',
      'placa video RTX',
      'procesor Intel',
      'tastatura mecanica',
      'monitor 4K',
      'SSD 1TB',
      'mouse gaming',
      'sursa calculator'
    ];

    res.json({ searches: popularSearches });
  } catch (error) {
    console.error('Get popular searches error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to generate search suggestions
const generateSearchSuggestions = async (keyword) => {
  if (!keyword || keyword.length < 2) {
    return [];
  }

  try {
    // Find related terms based on product names and categories
    const relatedProducts = await Product.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          categories: { $addToSet: '$category' },
          brands: { $addToSet: '$brand' }
        }
      }
    ]);

    let suggestions = [];
    
    if (relatedProducts.length > 0) {
      const data = relatedProducts[0];
      suggestions = [
        ...data.categories.slice(0, 3),
        ...data.brands.slice(0, 3)
      ];
    }

    return suggestions.slice(0, 6);
  } catch (error) {
    console.error('Generate suggestions error:', error);
    return [];
  }
};

export default {
  searchProducts,
  getSearchSuggestions,
  getPopularSearches
};