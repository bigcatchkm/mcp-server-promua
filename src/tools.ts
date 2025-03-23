import { Tool } from "@modelcontextprotocol/sdk/types.js";

// Інструмент для отримання списку товарів
export const PROMUA_GET_PRODUCTS_TOOL = {
  name: 'promua_get_products',
  description: 'Отримати список товарів з магазину Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'Максимальна кількість товарів для отримання (за замовчуванням 20)',
      },
      offset: {
        type: 'integer',
        description: 'Зміщення при пагінації',
      },
      categoryId: {
        type: 'integer',
        description: 'ID категорії для фільтрації товарів',
      },
      groupId: {
        type: 'integer',
        description: 'ID групи для фільтрації товарів',
      },
      searchTerm: {
        type: 'string',
        description: 'Пошуковий запит для фільтрації товарів',
      },
    },
    required: [],
  },
};

// Інструмент для отримання деталей товару
export const PROMUA_GET_PRODUCT_TOOL = {
  name: 'promua_get_product',
  description: 'Отримати детальну інформацію про товар за його ID',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID товару для отримання деталей',
      },
    },
    required: ['id'],
  },
};

// Інструмент для створення нового товару
export const PROMUA_CREATE_PRODUCT_TOOL = {
  name: 'promua_create_product',
  description: 'Створити новий товар у магазині Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Назва товару',
      },
      price: {
        type: 'number',
        description: 'Ціна товару',
      },
      currency: {
        type: 'string',
        description: 'Валюта ціни (наприклад, UAH)',
      },
      categoryId: {
        type: 'integer',
        description: 'ID категорії товару',
      },
      sku: {
        type: 'string',
        description: 'Артикул товару',
      },
      description: {
        type: 'string',
        description: 'Опис товару',
      },
      available: {
        type: 'boolean',
        description: 'Доступність товару',
      },
      quantity: {
        type: 'integer',
        description: 'Кількість товару в наявності',
      },
      images: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'URL-адреси зображень товару',
      },
      attributes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID атрибута',
            },
            value: {
              type: 'string',
              description: 'Значення атрибута',
            },
          },
        },
        description: 'Атрибути товару',
      },
    },
    required: ['name', 'price', 'currency', 'categoryId'],
  },
};

// Інструмент для оновлення існуючого товару
export const PROMUA_UPDATE_PRODUCT_TOOL = {
  name: 'promua_update_product',
  description: 'Оновити існуючий товар у магазині Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID товару для оновлення',
      },
      name: {
        type: 'string',
        description: 'Нова назва товару',
      },
      price: {
        type: 'number',
        description: 'Нова ціна товару',
      },
      currency: {
        type: 'string',
        description: 'Нова валюта ціни (наприклад, UAH)',
      },
      sku: {
        type: 'string',
        description: 'Новий артикул товару',
      },
      description: {
        type: 'string',
        description: 'Новий опис товару',
      },
      available: {
        type: 'boolean',
        description: 'Нова доступність товару',
      },
      quantity: {
        type: 'integer',
        description: 'Нова кількість товару в наявності',
      },
      images: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Нові URL-адреси зображень товару',
      },
      attributes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID атрибута',
            },
            value: {
              type: 'string',
              description: 'Значення атрибута',
            },
          },
        },
        description: 'Нові атрибути товару',
      },
    },
    required: ['id'],
  },
};

// Інструмент для видалення товару
export const PROMUA_DELETE_PRODUCT_TOOL = {
  name: 'promua_delete_product',
  description: 'Видалити товар з магазину Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID товару для видалення',
      },
    },
    required: ['id'],
  },
};

// Інструмент для отримання списку замовлень
export const PROMUA_GET_ORDERS_TOOL = {
  name: 'promua_get_orders',
  description: 'Отримати список замовлень з магазину Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'Максимальна кількість замовлень для отримання (за замовчуванням 20)',
      },
      offset: {
        type: 'integer',
        description: 'Зміщення при пагінації',
      },
      dateFrom: {
        type: 'string',
        format: 'date',
        description: 'Дата початку періоду для фільтрації замовлень (YYYY-MM-DD)',
      },
      dateTo: {
        type: 'string',
        format: 'date',
        description: 'Дата кінця періоду для фільтрації замовлень (YYYY-MM-DD)',
      },
      status: {
        type: 'string',
        description: 'Статус замовлень для фільтрації (pending, received, delivered, canceled, declined, paid, return)',
      },
    },
    required: [],
  },
};

// Інструмент для отримання деталей замовлення
export const PROMUA_GET_ORDER_TOOL = {
  name: 'promua_get_order',
  description: 'Отримати детальну інформацію про замовлення за його ID',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID замовлення для отримання деталей',
      },
    },
    required: ['id'],
  },
};

// Інструмент для оновлення статусу замовлення
export const PROMUA_UPDATE_ORDER_STATUS_TOOL = {
  name: 'promua_update_order_status',
  description: 'Оновити статус замовлення в магазині Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID замовлення для оновлення статусу',
      },
      status: {
        type: 'string',
        description: 'Новий статус замовлення',
        enum: ['pending', 'received', 'delivered', 'canceled', 'declined', 'paid', 'return'],
      },
      cancellationReason: {
        type: 'string',
        description: 'Причина скасування замовлення (обов\\'язкова, якщо статус "canceled")',
      },
      cancellationText: {
        type: 'string',
        description: 'Додатковий текст для скасування замовлення',
      },
    },
    required: ['id', 'status'],
  },
};

// Інструмент для отримання категорій
export const PROMUA_GET_CATEGORIES_TOOL = {
  name: 'promua_get_categories',
  description: 'Отримати список категорій з Prom.ua',
  parameters: {
    type: 'object',
    properties: {
      parentId: {
        type: 'integer',
        description: 'ID батьківської категорії для отримання підкатегорій',
      },
    },
    required: [],
  },
};

// Експорт усіх інструментів у масиві для реєстрації
export const PROMUA_TOOLS = [
  PROMUA_GET_PRODUCTS_TOOL,
  PROMUA_GET_PRODUCT_TOOL,
  PROMUA_CREATE_PRODUCT_TOOL,
  PROMUA_UPDATE_PRODUCT_TOOL,
  PROMUA_DELETE_PRODUCT_TOOL,
  PROMUA_GET_ORDERS_TOOL,
  PROMUA_GET_ORDER_TOOL,
  PROMUA_UPDATE_ORDER_STATUS_TOOL,
  PROMUA_GET_CATEGORIES_TOOL,
];