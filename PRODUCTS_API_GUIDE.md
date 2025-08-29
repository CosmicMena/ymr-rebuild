## Guia de Consumo — Endpoints de Produtos

- Base URL: `http://localhost:<PORT>/api/v1`
- Swagger: `http://localhost:<PORT>/api/docs`
- Autorização: todos os endpoints exigem `Authorization: Bearer <TOKEN>`

## 1) Autenticação (obter token)

```bash
# Registrar usuário (opcional)
curl -X POST "http://localhost:3000/api/v1/auth/register" \
     -H "Content-Type: application/json" \
     -d '{
           "name":"Maria",
           "email":"maria@example.com",
           "password":"SenhaSegura123",
           "phone":"+244900000000",
           "company":"Empresa X"
         }'

# Login (retorna tokens)
curl -X POST "http://localhost:3000/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email":"maria@example.com","password":"SenhaSegura123"}'
```

- Use o `accessToken` retornado no header `Authorization: Bearer <TOKEN>`.

## 2) Convenções

- Paginação: `?page=<n>&limit=<n>` (padrão: page=1, limit=10; máximo limit=100)
- Ordenação: `sortBy=name|price|createdAt|updatedAt` e `sortOrder=asc|desc`
- Filtros: `search`, `brandId`, `subcategoryId`, `categoryId`, `minPrice`, `maxPrice`, `isActive`

## 3) Listar produtos (paginado + filtros)

```bash
TOKEN="<SEU_TOKEN>"
BASE="http://localhost:3000/api/v1"

curl "$BASE/products?page=1&limit=20&search=gerador&minPrice=1000&maxPrice=50000&sortBy=price&sortOrder=asc" \
  -H "Authorization: Bearer $TOKEN"
```

Resposta (exemplo):
```json
{
  "data": [
    {
      "id": "uuid",
      "code": "YMR-2024-001",
      "name": "Gerador 500KW",
      "price": 50000,
      "isActive": true,
      "brand": { "id": "uuid", "name": "Marca X" },
      "subcategory": {
        "id": "uuid",
        "name": "Geradores Industriais",
        "category": { "id": "uuid", "name": "Energia" }
      }
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 123, "totalPages": 7 }
}
```

## 4) Obter produto por ID

```bash
curl "$BASE/products/<uuid-do-produto>" \
  -H "Authorization: Bearer $TOKEN"
```

## 5) Criar produto (admin ou manager)

Campos: veja `CreateProductDto` no Swagger.

```bash
curl -X POST "$BASE/products" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "code": "YMR-2024-001",
        "name": "Gerador Industrial 500KW",
        "model": "GEN-500-XL",
        "description": "Gerador de alta eficiência para uso contínuo",
        "price": 50000,
        "brandId": "<uuid-da-marca>",
        "subcategoryId": "<uuid-da-subcategoria>",
        "stockQuantity": 10,
        "isActive": true,
        "features": ["Alta eficiência", "Baixa manutenção"],
        "specifications": { "power": "500KW", "fuel": "Diesel", "voltage": "380V" },
        "documents": { "manual": "https://exemplo.com/manual.pdf" }
      }'
```

## 6) Atualizar produto (admin ou manager)

```bash
curl -X PATCH "$BASE/products/<uuid-do-produto>" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "price": 47999.90,
        "stockQuantity": 12,
        "description": "Atualização: novo lote com melhorias"
      }'
```

## 7) Remover produto (admin)

```bash
curl -X DELETE "$BASE/products/<uuid-do-produto>" \
  -H "Authorization: Bearer $TOKEN"
```

## 8) Produtos populares

```bash
curl "$BASE/products/popular?limit=5" \
  -H "Authorization: Bearer $TOKEN"
```

## 9) Produtos em destaque

```bash
curl "$BASE/products/featured?limit=8" \
  -H "Authorization: Bearer $TOKEN"
```

## 10) Exemplo JavaScript (fetch)

```javascript
const BASE = 'http://localhost:3000/api/v1';
const TOKEN = '<SEU_TOKEN>'; // Authorization: Bearer

async function listProducts() {
  const url = new URL(`${BASE}/products`);
  url.searchParams.set('page', '1');
  url.searchParams.set('limit', '10');
  url.searchParams.set('search', 'gerador');
  url.searchParams.set('sortBy', 'price');
  url.searchParams.set('sortOrder', 'asc');

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

async function createProduct() {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      code: 'YMR-2024-001',
      name: 'Gerador Industrial 500KW',
      price: 50000,
      brandId: '<uuid-da-marca>',
      subcategoryId: '<uuid-da-subcategoria>',
      features: ['Alta eficiência'],
      specifications: { power: '500KW' },
    }),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}
```

## 11) Exemplo Axios (Node.js)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: { Authorization: `Bearer <SEU_TOKEN>` },
});

async function getById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

async function updateProduct(id, payload) {
  const { data } = await api.patch(`/products/${id}`, payload);
  return data;
}

async function removeProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
```

## 12) Códigos de resposta comuns

- 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict

## 13) Dicas

- Para `categoryId`, o backend já filtra via relação da subcategoria.
- `price` aceita até 2 casas decimais.
- `features`, `images` são arrays de string; `specifications` e `documents` aceitam JSON.
- Consulte o Swagger para o esquema atualizado dos DTOs.
