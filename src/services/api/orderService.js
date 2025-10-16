import { getApperClient } from "@/services/apperClient";

const TABLE_NAME = "order_c";

const transformOrderFromDB = (dbOrder) => {
  if (!dbOrder) return null;

  return {
    Id: dbOrder.Id,
    orderDate: dbOrder.order_date_c || new Date().toISOString(),
    estimatedDelivery: dbOrder.estimated_delivery_c || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    items: dbOrder.items_c ? 
      (typeof dbOrder.items_c === 'string' ? 
        JSON.parse(dbOrder.items_c) : 
        dbOrder.items_c) : [],
    deliveryAddress: dbOrder.delivery_address_c ? 
      (typeof dbOrder.delivery_address_c === 'string' ? 
        JSON.parse(dbOrder.delivery_address_c) : 
        dbOrder.delivery_address_c) : {},
    paymentMethod: dbOrder.payment_method_c || "",
    status: dbOrder.status_c || "confirmed",
    total: dbOrder.total_c || 0
  };
};

const transformOrderToDB = (order) => {
  const dbOrder = {
    order_date_c: order.orderDate || new Date().toISOString(),
    estimated_delivery_c: order.estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method_c: order.paymentMethod || "",
    status_c: order.status || "confirmed",
    total_c: order.total || 0
  };

  if (order.items) {
    dbOrder.items_c = typeof order.items === 'string' ? 
      order.items : 
      JSON.stringify(order.items);
  }

  if (order.deliveryAddress) {
    dbOrder.delivery_address_c = typeof order.deliveryAddress === 'string' ? 
      order.deliveryAddress : 
      JSON.stringify(order.deliveryAddress);
  }

  return dbOrder;
};

export const getOrders = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "order_date_c"}},
        {"field": {"Name": "estimated_delivery_c"}},
        {"field": {"Name": "items_c"}},
        {"field": {"Name": "delivery_address_c"}},
        {"field": {"Name": "payment_method_c"}},
        {"field": {"Name": "status_c"}},
        {"field": {"Name": "total_c"}}
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

    return response.data.map(transformOrderFromDB);
  } catch (error) {
    console.error("Error fetching orders:", error?.response?.data?.message || error);
    return [];
  }
};

export const getOrderById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "order_date_c"}},
        {"field": {"Name": "estimated_delivery_c"}},
        {"field": {"Name": "items_c"}},
        {"field": {"Name": "delivery_address_c"}},
        {"field": {"Name": "payment_method_c"}},
        {"field": {"Name": "status_c"}},
        {"field": {"Name": "total_c"}}
      ]
    };

    const response = await apperClient.getRecordById(TABLE_NAME, id, params);

    if (!response?.data) {
      return null;
    }

    return transformOrderFromDB(response.data);
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const createOrder = async (orderData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const dbOrder = transformOrderToDB(orderData);

    const params = {
      records: [dbOrder]
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
        return transformOrderFromDB(successful[0].data);
      }
    }

    return null;
  } catch (error) {
    console.error("Error creating order:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateOrder = async (id, updates) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const dbUpdates = transformOrderToDB(updates);
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
        return transformOrderFromDB(successful[0].data);
      }
    }

    return null;
  } catch (error) {
    console.error("Error updating order:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteOrder = async (id) => {
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
    console.error("Error deleting order:", error?.response?.data?.message || error);
    return false;
  }
};

export const getOrdersByStatus = async (status) => {
  try {
    const orders = await getOrders();
    return orders.filter(o => o.status === status);
  } catch (error) {
    console.error("Error fetching orders by status:", error?.response?.data?.message || error);
    return [];
  }
};