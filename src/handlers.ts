import * as api from './api.js';

// Функція для форматування відповіді
function formatResponse(content: any, isError: boolean = false) {
  return {
    content: [{
      type: "text",
      text: isError 
        ? `Помилка: ${content}` 
        : JSON.stringify(content, null, 2)
    }],
    isError
  };
}

// Обробник для отримання списку товарів
export async function getProducts(params: any) {
  try {
    const { limit, offset, categoryId, groupId, searchTerm } = params || {};
    const products = await api.getProducts(limit, offset, categoryId, groupId, searchTerm);
    return formatResponse(products);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при отриманні списку товарів', true);
  }
}

// Обробник для отримання деталей товару
export async function getProduct(params: any) {
  try {
    const { id } = params || {};
    if (!id) {
      return formatResponse('ID товару не вказано', true);
    }
    const product = await api.getProduct(id);
    return formatResponse(product);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при отриманні деталей товару', true);
  }
}

// Обробник для створення товару
export async function createProduct(params: any) {
  try {
    const { name, price, currency, categoryId, sku, description, available, quantity, images, attributes } = params || {};
    
    // Перевірка обов'язкових полів
    if (!name || !price || !currency || !categoryId) {
      return formatResponse('Відсутні обов\\'язкові поля: name, price, currency, categoryId', true);
    }
    
    const newProduct = await api.createProduct({
      name,
      price,
      currency,
      category_id: categoryId,
      sku,
      description,
      available,
      quantity,
      images,
      attributes
    });
    
    return formatResponse(newProduct);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при створенні товару', true);
  }
}

// Обробник для оновлення товару
export async function updateProduct(params: any) {
  try {
    const { id, name, price, currency, sku, description, available, quantity, images, attributes } = params || {};
    
    if (!id) {
      return formatResponse('ID товару не вказано', true);
    }
    
    const updatedProduct = await api.updateProduct(id, {
      name,
      price,
      currency,
      sku,
      description,
      available,
      quantity,
      images,
      attributes
    });
    
    return formatResponse(updatedProduct);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при оновленні товару', true);
  }
}

// Обробник для видалення товару
export async function deleteProduct(params: any) {
  try {
    const { id } = params || {};
    
    if (!id) {
      return formatResponse('ID товару не вказано', true);
    }
    
    const result = await api.deleteProduct(id);
    return formatResponse(result);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при видаленні товару', true);
  }
}

// Обробник для отримання списку замовлень
export async function getOrders(params: any) {
  try {
    const { limit, offset, dateFrom, dateTo, status } = params || {};
    const orders = await api.getOrders(limit, offset, dateFrom, dateTo, status);
    return formatResponse(orders);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при отриманні списку замовлень', true);
  }
}

// Обробник для отримання деталей замовлення
export async function getOrder(params: any) {
  try {
    const { id } = params || {};
    
    if (!id) {
      return formatResponse('ID замовлення не вказано', true);
    }
    
    const order = await api.getOrder(id);
    return formatResponse(order);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при отриманні деталей замовлення', true);
  }
}

// Обробник для оновлення статусу замовлення
export async function updateOrderStatus(params: any) {
  try {
    const { id, status, cancellationReason, cancellationText } = params || {};
    
    if (!id) {
      return formatResponse('ID замовлення не вказано', true);
    }
    
    if (!status) {
      return formatResponse('Статус замовлення не вказано', true);
    }
    
    // Валідація статусів
    const validStatuses = ['pending', 'received', 'delivered', 'canceled', 'declined', 'paid', 'return'];
    if (!validStatuses.includes(status)) {
      return formatResponse(`Недійсний статус. Допустимі значення: ${validStatuses.join(', ')}`, true);
    }
    
    // Перевірка наявності cancellationReason при статусі canceled
    if (status === 'canceled' && !cancellationReason) {
      return formatResponse('При скасуванні замовлення потрібно вказати причину (cancellationReason)', true);
    }
    
    const result = await api.updateOrderStatus(id, status, cancellationReason, cancellationText);
    return formatResponse(result);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при оновленні статусу замовлення', true);
  }
}

// Обробник для отримання категорій
export async function getCategories(params: any) {
  try {
    const { parentId } = params || {};
    const categories = await api.getCategories(parentId);
    return formatResponse(categories);
  } catch (error: any) {
    return formatResponse(error.message || 'Помилка при отриманні категорій', true);
  }
}