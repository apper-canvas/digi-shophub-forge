import { getApperClient } from "@/services/apperClient";

const TABLE_NAME = "product_c";

const transformProductFromDB = (dbProduct) => {
  if (!dbProduct) return null;
  
  return {
    Id: dbProduct.Id,
    name: dbProduct.name_c || "",
    brand: dbProduct.brand_c || "",
    category: dbProduct.category_c || "",
    subcategory: dbProduct.subcategory_c || "",
    description: dbProduct.description_c || "",
    price: dbProduct.price_c || 0,
    originalPrice: dbProduct.original_price_c || null,
    rating: dbProduct.rating_c || 0,
    reviewCount: dbProduct.review_count_c || 0,
    inStock: dbProduct.in_stock_c !== undefined ? dbProduct.in_stock_c : true,
    specifications: dbProduct.specifications_c ? 
      (typeof dbProduct.specifications_c === 'string' ? 
        JSON.parse(dbProduct.specifications_c) : 
        dbProduct.specifications_c) : {},
    images: dbProduct.images_c ? 
      (typeof dbProduct.images_c === 'string' ? 
        JSON.parse(dbProduct.images_c) : 
        dbProduct.images_c) : []
  };
};

const transformProductToDB = (product) => {
  const dbProduct = {
    name_c: product.name || "",
    brand_c: product.brand || "",
    category_c: product.category || "",
    subcategory_c: product.subcategory || "",
    description_c: product.description || "",
    price_c: product.price || 0,
    in_stock_c: product.inStock !== undefined ? product.inStock : true,
    rating_c: product.rating || 0,
    review_count_c: product.reviewCount || 0
  };

  if (product.originalPrice !== undefined && product.originalPrice !== null) {
    dbProduct.original_price_c = product.originalPrice;
  }

  if (product.specifications) {
    dbProduct.specifications_c = typeof product.specifications === 'string' ? 
      product.specifications : 
      JSON.stringify(product.specifications);
  }

  if (product.images) {
    dbProduct.images_c = typeof product.images === 'string' ? 
      product.images : 
      JSON.stringify(product.images);
  }

  return dbProduct;
};

export const getProducts = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "brand_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "images_c"}}
      ],
      pagingInfo: { limit: 1000, offset: 0 }
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    if (!response.data || response.data.length === 0) {
      return [];
    }

    return response.data.map(transformProductFromDB);
  } catch (error) {
    console.error("Error fetching products:", error?.response?.data?.message || error);
    return [];
  }
};

export const getBrands = async () => {
  try {
    const products = await getProducts();
    const brands = [...new Set(products.map(p => p.brand))].filter(Boolean).sort();
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error?.response?.data?.message || error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "brand_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "images_c"}}
      ]
    };

    const response = await apperClient.getRecordById(TABLE_NAME, id, params);

    if (!response?.data) {
      return null;
    }

    return transformProductFromDB(response.data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "icon_c"}}
      ],
      pagingInfo: { limit: 100, offset: 0 }
    };

    const response = await apperClient.fetchRecords("category_c", params);

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    if (!response.data || response.data.length === 0) {
      return [];
    }

    return response.data.map(cat => ({
      Id: cat.Id,
      name: cat.name_c || "",
      icon: cat.icon_c || ""
    }));
  } catch (error) {
    console.error("Error fetching categories:", error?.response?.data?.message || error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "icon_c"}}
      ]
    };

    const response = await apperClient.getRecordById("category_c", id, params);

    if (!response?.data) {
      return null;
    }

    return {
      Id: response.data.Id,
      name: response.data.name_c || "",
      icon: response.data.icon_c || ""
    };
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getProductsByCategory = async (categoryName) => {
  try {
    const products = await getProducts();
    return products.filter(p => p.category === categoryName);
  } catch (error) {
    console.error("Error fetching products by category:", error?.response?.data?.message || error);
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const products = await getProducts();
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error searching products:", error?.response?.data?.message || error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const dbProduct = transformProductToDB(productData);

    const params = {
      records: [dbProduct]
    };

    const response = await apperClient.createRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to create ${failed.length} records:`, failed);
      }

      if (successful.length > 0) {
        return transformProductFromDB(successful[0].data);
      }
    }

    return null;
  } catch (error) {
    console.error("Error creating product:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateProduct = async (id, updates) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const dbUpdates = transformProductToDB(updates);
    dbUpdates.Id = id;

    const params = {
      records: [dbUpdates]
    };

    const response = await apperClient.updateRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to update ${failed.length} records:`, failed);
      }

      if (successful.length > 0) {
        return transformProductFromDB(successful[0].data);
      }
    }

    return null;
  } catch (error) {
    console.error("Error updating product:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return false;
    }

    const params = {
      RecordIds: [id]
    };

    const response = await apperClient.deleteRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to delete ${failed.length} records:`, failed);
      }

      return successful.length > 0;
    }

    return false;
} catch (error) {
    console.error("Error deleting product:", error?.response?.data?.message || error);
    return false;
  }
};