# Logos dos Parceiros

Esta pasta contém as logos das empresas parceiras que aparecem no carrossel da página About.

## Como adicionar novas logos:

1. Adicione o arquivo da logo na pasta `src/assets/partners/`
2. Use formatos PNG ou SVG para melhor qualidade
3. Recomenda-se usar fundo transparente
4. Tamanho recomendado: 200x100 pixels (proporção 2:1)
5. Atualize o arquivo `src/data/partners.ts` com o novo parceiro

## Logos necessárias:

- caterpillar.png
- bosch.png
- 3m.png
- hilti.png
- wacker.png
- makita.png
- honeywell.png
- atlas-copco.png
- dewalt.png
- stanley.png
- ingersoll-rand.png
- lincoln-electric.png

## Exemplo de uso:

```typescript
{
  id: '13',
  name: 'Nova Empresa',
  logo: '/assets/partners/nova-empresa.png',
  website: 'https://www.novaempresa.com',
  description: 'Descrição da empresa',
  category: 'Categoria'
}
```

## Características do Carrossel:

- **Animação Infinita**: O carrossel rola continuamente da direita para a esquerda
- **Responsivo**: Se adapta a diferentes tamanhos de tela
- **Hover Effects**: Efeitos visuais ao passar o mouse sobre os logos
- **Links Externos**: Cada logo pode ter um link para o site da empresa
- **Categorização**: Cada parceiro tem uma categoria para organização
