# Kanban MVP Plan

## Phase 1: Scaffolding
- [x] Next.js app in `frontend/` with TypeScript and Tailwind
- [x] Root and frontend `.gitignore`
- [x] Bauhaus-inspired typography (Jost) and black/white Scandinavian theme

## Phase 2: Core Features
- [x] Single board with 5 fixed columns and dummy data
- [x] Rename column titles inline
- [x] Cards with title and details
- [x] Add card to a column
- [x] Delete a card
- [x] Drag and drop cards between columns and within a column

## Phase 3: Unit Tests (Vitest)
- [x] Board state helpers: add, delete, move, rename
- [x] Dummy data shape validation

## Phase 4: Integration Tests (Playwright)
- [x] Board renders with dummy data
- [x] Add and delete a card
- [x] Rename a column
- [x] Drag a card to another column

## Phase 5: Delivery
- [x] All tests pass
- [x] Dev server running on http://localhost:3000
