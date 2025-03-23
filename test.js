#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Отримання поточної директорії
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Шлях до скомпільованого серверного скрипту
const serverPath = path.join(__dirname, 'dist', 'index.js');

console.log(`Перевіряємо існування файлу: ${serverPath}`);
if (fs.existsSync(serverPath)) {
  console.log(`Файл ${serverPath} існує`);
} else {
  console.error(`Файл ${serverPath} не знайдено!`);
  process.exit(1);
}

// Запускаємо сервер як дочірній процес
console.log(`Запускаємо сервер: node ${serverPath}`);
const server = spawn('node', [serverPath], {
  env: { ...process.env, PROMUA_API_KEY: 'test_api_key' }
});

console.log('Тестовий MCP сервер запущено');

// Обробка вхідних повідомлень від сервера
server.stdout.on('data', (data) => {
  console.log(`Отримано з сервера (stdout): ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Сервер (stderr): ${data}`);
});

// Надсилаємо тестове повідомлення для listTools
const listToolsMessage = {
  jsonrpc: "2.0",
  id: "test-1",
  method: "listTools",
  params: {}
};

console.log('Надсилаємо повідомлення на сервер:', JSON.stringify(listToolsMessage));
server.stdin.write(JSON.stringify(listToolsMessage) + '\n');

// Після короткої паузи надсилаємо повідомлення закриття
setTimeout(() => {
  console.log("Тест завершено, закриваємо сервер...");
  server.kill();
}, 2000);

// Обробка завершення сервера
server.on('close', (code) => {
  console.log(`Сервер завершив роботу з кодом ${code}`);
});

server.on('error', (error) => {
  console.error('Помилка запуску сервера:', error);
});