# MCP Server для Prom.ua

MCP (Model Context Protocol) сервер для взаємодії з API Prom.ua. Цей сервер дозволяє Claude та іншим LLM моделям отримувати та відправляти дані через API Prom.ua.

## Функціональність

Сервер надає наступні інструменти:

- Отримання списку товарів (GET)
- Отримання деталей товару (GET)
- Створення нового товару (POST)
- Оновлення існуючого товару (PUT)
- Видалення товару (DELETE)
- Отримання списку замовлень (GET)
- Отримання деталей замовлення (GET)
- Оновлення статусу замовлення (PUT)
- Отримання категорій (GET)

## Встановлення

### Глобальне встановлення:

```bash
npm install -g mcp-server-promua
```

### Використання через npx:

```bash
npx mcp-server-promua
```

## Налаштування

Перед використанням необхідно налаштувати API ключ Prom.ua. Є кілька способів:

1. Через файл `.env`:
```
PROMUA_API_KEY=your_api_key_here
PROMUA_API_URL=https://my.prom.ua
```

2. Через змінні середовища:
```bash
export PROMUA_API_KEY=your_api_key_here
export PROMUA_API_URL=https://my.prom.ua
```

## Використання з Claude Desktop

1. Додайте наступну конфігурацію в налаштуваннях Claude Desktop:

```json
{
  "mcpServers": {
    "promua": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-server-promua"
      ]
    }
  }
}
```

2. Або встановіть через Smithery:

```bash
npx -y @smithery/cli install mcp-server-promua --client claude
```

## Використання в Docker

```bash
docker build -t mcp-server-promua .
docker run -e PROMUA_API_KEY=your_api_key_here mcp-server-promua
```

## Розробка

```bash
# Клонування репозиторію
git clone https://github.com/bigcatchkm/mcp-server-promua.git
cd mcp-server-promua

# Встановлення залежностей
npm install

# Запуск в режимі розробки
npm run dev

# Збірка
npm run build

# Запуск зібраної версії
npm start
```

## Ліцензія

MIT