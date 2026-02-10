# Trennar Clínica de Fisioterapia

Site institucional em Next.js para clínica de fisioterapia, com foco em reabilitação, pilates clínico e captação de contato por WhatsApp.

## Stack

- Next.js 16 (App Router)
- React 18
- Tailwind CSS 4
- TypeScript

## Rodando localmente

1. `npm install`
2. `npm run dev`
3. Abra `http://localhost:3000`

## Build de produção

1. `npm run lint`
2. `npm run build`
3. `npm run start`

## Estrutura de imagens

Profissionais:

- `public/images/profissionais/carlos.jpg`
- `public/images/profissionais/gustavo.jpg`
- `public/images/profissionais/junior.jpg`
- `public/images/profissionais/luana.jpg`

Galerias:

- `public/images/galeria/fisioterapia/`
- `public/images/galeria/pilates/`
- `public/images/galeria/atendimento/`

As seções carregam automaticamente todas as imagens dessas pastas e exibem em carrossel responsivo:

- desktop: 3 imagens por página
- tablet: 2 imagens por página
- mobile: 1 imagem por página

Logo:

- `public/images/brand/trennar-logo.jpg`
