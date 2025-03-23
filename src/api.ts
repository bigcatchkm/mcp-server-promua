import axios from 'axios';

// Базова URL для API Prom.ua
const API_URL = process.env.PROMUA_API_URL || 'https://my.prom.ua';
const API_KEY = process.env.PROMUA_API_KEY;

// Створення інстансу axios з авторизацією
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Перехоплювач для обробки помилок
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(`API помилка: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Немає відповіді від сервера');
    } else {
      throw new Error(`Помилка запиту: ${error.message}`);
    }
  }
);

// Отримання списку товарів
export async function getProducts(
  limit?: number,
  offset?: number, 
  categoryId?: number,
  groupId?: number,
  searchTerm?: string
) {
  const params = {
    limit,
    offset,
    category_id: categoryId,
    group_id: groupId,
    search_term: searchTerm
  };

  return await apiClient.get('/products', { params });
}

// Отримання інформації про товар за ID
export async function getProduct(id: string | number) {
  return await apiClient.get(`/products/${id}`);
}

// Створення нового товару
export async function createProduct(productData: {
  name: string,
  price: number,
  currency: string,
  category_id: number,
  sku?: string,
  description?: string,
  available?: boolean,
  quantity?: number,
  images?: string[],
  attributes?: any[]
}) {
  return await apiClient.post('/products', productData);
}

// Оновлення існуючого товару
export async function updateProduct(
  id: string | number,
  productData: {
    name?: string,
    price?: number,
    currency?: string,
    sku?: string,
    description?: string,
    available?: boolean,
    quantity?: number,
    images?: string[],
    attributes?: any[]
  }
) {
  return await apiClient.put(`/products/${id}`, productData);
}

// Видалення товару
export async function deleteProduct(id: string | number) {
  return await apiClient.delete(`/products/${id}`);
}

// Отримання списку замовлень
export async function getOrders(
  limit?: number,
  offset?: number,
  dateFrom?: string,
  dateTo?: string,
  status?: string
) {
  const params = {
    limit,
    offset,
    date_from: dateFrom,
    date_to: dateTo,
    status
  };

  return await apiClient.get('/orders', { params });
}

// Отримання інформації про замовлення за ID
export async function getOrder(id: string | number) {
  return await apiClient.get(`/orders/${id}`);
}

// Оновлення статусу замовлення
export async function updateOrderStatus(
  id: string | number,
  status: string,
  cancellationReason?: string,
  cancellationText?: string
) {
  const data = {
    status,
    cancellation_reason: cancellationReason,
    cancellation_text: cancellationText
  };

  return await apiClient.put(`/orders/${id}/status`, data);
}

// Отримання категорій
export async function getCategories(parentId?: number) {
  const params = {
    parent_id: parentId
  };

  return await apiClient.get('/categories', { params });
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrder,
  updateOrderStatus,
  getCategories
};