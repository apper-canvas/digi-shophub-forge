import apper from 'https://cdn.apper.io/actions/apper-actions.js';

apper.serve(async (req) => {
  try {
    const TABLE_NAME = "product_c";

    // Sample products with realistic data
    const sampleProducts = [
      {
        name_c: "Wireless Bluetooth Headphones",
        brand_c: "SoundTech",
        category_c: "Electronics",
        subcategory_c: "Audio",
        description_c: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and commuters.",
        price_c: 79.99,
        original_price_c: 99.99,
        rating_c: 4.5,
        review_count_c: 342,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Battery Life": "30 hours",
          "Connectivity": "Bluetooth 5.0",
          "Weight": "250g",
          "Noise Cancellation": "Active"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
        ])
      },
      {
        name_c: "4K Smart TV 55 Inch",
        brand_c: "VisionPlus",
        category_c: "Electronics",
        subcategory_c: "Television",
        description_c: "Ultra HD 4K Smart TV with HDR support and built-in streaming apps. Transform your living room into a home theater.",
        price_c: 499.99,
        original_price_c: 699.99,
        rating_c: 4.7,
        review_count_c: 892,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Screen Size": "55 inches",
          "Resolution": "3840 x 2160",
          "HDR": "Yes",
          "Smart Features": "Netflix, Prime Video, YouTube"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
          "https://images.unsplash.com/photo-1593359863503-f598339c8a38?w=500"
        ])
      },
      {
        name_c: "Gaming Laptop Pro",
        brand_c: "TechForce",
        category_c: "Electronics",
        subcategory_c: "Computers",
        description_c: "High-performance gaming laptop with RTX graphics and 16GB RAM. Dominate your favorite games with ultra-smooth performance.",
        price_c: 1299.99,
        original_price_c: 1599.99,
        rating_c: 4.8,
        review_count_c: 567,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Processor": "Intel i7 12th Gen",
          "RAM": "16GB DDR5",
          "Storage": "512GB SSD",
          "Graphics": "NVIDIA RTX 3060"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"
        ])
      },
      {
        name_c: "Wireless Gaming Mouse",
        brand_c: "GameMaster",
        category_c: "Electronics",
        subcategory_c: "Accessories",
        description_c: "Precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
        price_c: 49.99,
        original_price_c: 69.99,
        rating_c: 4.4,
        review_count_c: 234,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "DPI": "Up to 16000",
          "Buttons": "8 programmable",
          "Battery": "70 hours",
          "Connectivity": "Wireless 2.4GHz"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
        ])
      },
      {
        name_c: "Classic Denim Jacket",
        brand_c: "UrbanStyle",
        category_c: "Clothing",
        subcategory_c: "Outerwear",
        description_c: "Timeless denim jacket with a modern fit. Perfect for layering and casual wear in all seasons.",
        price_c: 59.99,
        original_price_c: 89.99,
        rating_c: 4.3,
        review_count_c: 156,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Material": "100% Cotton Denim",
          "Fit": "Regular",
          "Sizes": "S, M, L, XL, XXL",
          "Care": "Machine washable"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
        ])
      },
      {
        name_c: "Running Shoes Pro",
        brand_c: "SportFlex",
        category_c: "Clothing",
        subcategory_c: "Footwear",
        description_c: "Lightweight running shoes with advanced cushioning technology for maximum comfort during your workouts.",
        price_c: 89.99,
        original_price_c: 119.99,
        rating_c: 4.6,
        review_count_c: 423,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Weight": "240g per shoe",
          "Cushioning": "Air cushion technology",
          "Sizes": "US 6-13",
          "Colors": "Multiple options available"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
        ])
      },
      {
        name_c: "Cotton T-Shirt Pack",
        brand_c: "ComfortWear",
        category_c: "Clothing",
        subcategory_c: "Tops",
        description_c: "Pack of 3 premium cotton t-shirts in assorted colors. Soft, breathable, and perfect for everyday wear.",
        price_c: 29.99,
        original_price_c: 44.99,
        rating_c: 4.2,
        review_count_c: 678,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Material": "100% Organic Cotton",
          "Fit": "Regular fit",
          "Pack": "3 shirts",
          "Care": "Machine washable"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
        ])
      },
      {
        name_c: "Stainless Steel Cookware Set",
        brand_c: "ChefMaster",
        category_c: "Home & Kitchen",
        subcategory_c: "Cookware",
        description_c: "Professional-grade 10-piece stainless steel cookware set with non-stick coating and heat-resistant handles.",
        price_c: 149.99,
        original_price_c: 229.99,
        rating_c: 4.7,
        review_count_c: 345,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Pieces": "10-piece set",
          "Material": "Stainless steel with non-stick coating",
          "Oven Safe": "Up to 500°F",
          "Dishwasher Safe": "Yes"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500",
          "https://images.unsplash.com/photo-1584990347449-39b4dfaad9cc?w=500"
        ])
      },
      {
        name_c: "Automatic Coffee Maker",
        brand_c: "BrewPerfect",
        category_c: "Home & Kitchen",
        subcategory_c: "Appliances",
        description_c: "Programmable coffee maker with 12-cup capacity and auto-shutoff feature. Start your mornings right with perfect coffee.",
        price_c: 79.99,
        original_price_c: 99.99,
        rating_c: 4.5,
        review_count_c: 521,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Capacity": "12 cups",
          "Features": "Programmable, auto-shutoff",
          "Filter": "Reusable filter included",
          "Power": "900W"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"
        ])
      },
      {
        name_c: "Robot Vacuum Cleaner",
        brand_c: "CleanBot",
        category_c: "Home & Kitchen",
        subcategory_c: "Appliances",
        description_c: "Smart robot vacuum with app control and automatic charging. Keep your floors spotless with minimal effort.",
        price_c: 199.99,
        original_price_c: 299.99,
        rating_c: 4.4,
        review_count_c: 287,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Battery": "120 minutes runtime",
          "Features": "App control, auto-charge, scheduling",
          "Suction": "2000Pa",
          "Filter": "HEPA filter"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500"
        ])
      },
      {
        name_c: "High-Speed Blender",
        brand_c: "BlendMax",
        category_c: "Home & Kitchen",
        subcategory_c: "Appliances",
        description_c: "Powerful 1500W blender perfect for smoothies, soups, and more. Multiple speed settings and pulse function.",
        price_c: 89.99,
        original_price_c: 129.99,
        rating_c: 4.6,
        review_count_c: 412,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Power": "1500W",
          "Capacity": "2 liters",
          "Speeds": "10 settings + pulse",
          "Blades": "Stainless steel"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500"
        ])
      },
      {
        name_c: "Air Purifier with HEPA Filter",
        brand_c: "PureAir",
        category_c: "Home & Kitchen",
        subcategory_c: "Appliances",
        description_c: "Advanced air purifier with true HEPA filter. Removes 99.97% of airborne particles for cleaner, healthier air.",
        price_c: 129.99,
        original_price_c: 179.99,
        rating_c: 4.5,
        review_count_c: 198,
        in_stock_c: true,
        specifications_c: JSON.stringify({
          "Coverage": "Up to 500 sq ft",
          "Filter": "True HEPA + Carbon",
          "Noise Level": "22-50 dB",
          "Features": "Timer, sleep mode, air quality indicator"
        }),
        images_c: JSON.stringify([
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500"
        ])
      }
    ];

    // Create products in bulk using global apperClient
    const params = {
      records: sampleProducts
    };

    const response = await apperClient.createRecord(TABLE_NAME, params);

    if (!response.success) {
      return new Response(JSON.stringify({
        success: false,
        message: response.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        return new Response(JSON.stringify({
          success: false,
          message: `Failed to create ${failed.length} products`,
          details: failed
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: `Successfully created ${successful.length} sample products`,
        count: successful.length
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      message: 'No results returned from create operation'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});