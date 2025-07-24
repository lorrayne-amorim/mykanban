# MyKanban
MyKanban é uma aplicação front-end de quadro Kanban, desenvolvida em React e TypeScript,
para gerenciar tarefas de forma visual e intuitiva. Você pode criar, editar e arrastar cartões entre
colunas, com todos os dados armazenados no `localStorage` do navegador.
---
## Funcionalidades
- **Criar, editar e excluir tarefas**
- **Drag & Drop** dentro de uma coluna e entre colunas (via `@hello-pangea/dnd`)
- **Persistência** em `localStorage` - seus boards e tarefas permanecem após recarregar o
navegador
- **Layout responsivo** que se adapta a desktop e dispositivos móveis
---
## Tecnologias
- React
- TypeScript
- Tailwind CSS
- @hello-pangea/dnd
---
## Instalação e Execução
1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/mykanban.git
cd mykanban
```
2. **Instale as dependências**
```bash
npm install
```
3. **Inicie em modo de desenvolvimento**
```bash
npm run dev
```
4. **Abra http://localhost:3000 no navegador**
---
## Build para Produção
Para gerar os arquivos otimizados:
```bash
npm run build
```
Os arquivos finais ficarão na pasta `dist/` (ou `build/`, conforme configuração).
---
## Contribuindo
1. Faça um **fork** deste repositório
2. Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```
3. Impulsione suas alterações:
```bash
git commit -m "Descrição clara da mudança"
git push origin feature/nome-da-feature
```
4. Abra um **Pull Request** descrevendo o que você implementou
