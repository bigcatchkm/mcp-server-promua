#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import 'dotenv/config';

// Імпорт інструментів та обробників
import { PROMUA_TOOLS } from './tools.js';
import * as handlers from './handlers.js';

// Перевірка наявності API ключа в середовищі
if (!process.env.PROMUA_API_KEY) {
  console.error("Помилка: API ключ Prom.ua не знайдено. Додайте PROMUA_API_KEY у файл .env");
  process.exit(1);
}

// Налаштування сервера MCP
const server = new Server(
  {
    name: "promua",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Обробник запиту на отримання списку інструментів
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: PROMUA_TOOLS,
}));

// Обробник викликів інструментів
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "promua_get_products":
        return await handlers.getProducts(request.params.arguments);

      case "promua_get_product":
        return await handlers.getProduct(request.params.arguments);

      case "promua_create_product":
        return await handlers.createProduct(request.params.arguments);

      case "promua_update_product":
        return await handlers.updateProduct(request.params.arguments);

      case "promua_delete_product":
        return await handlers.deleteProduct(request.params.arguments);

      case "promua_get_orders":
        return await handlers.getOrders(request.params.arguments);
        
      case "promua_get_order":
        return await handlers.getOrder(request.params.arguments);
        
      case "promua_update_order_status":
        return await handlers.updateOrderStatus(request.params.arguments);
        
      case "promua_get_categories":
        return await handlers.getCategories(request.params.arguments);
        
      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Невідомий інструмент: ${request.params.name}`
        );
    }
  } catch (error) {
    console.error("Помилка виконання інструмента:", error);
    return {
      content: [{
        type: "text",
        text: `Помилка: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

// Запуск сервера
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP сервер для Prom.ua працює через stdio");
}

runServer().catch((error) => {
  console.error("Критична помилка запуску сервера:", error);
  process.exit(1);
});