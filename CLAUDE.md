# SolJar Development Guide

## Commands
- Build web app: `pnpm build`
- Run web app: `pnpm dev`
- Lint: `pnpm lint`
- Build Anchor program: `pnpm anchor-build`
- Test Anchor program: `pnpm anchor-test`
- Run single test: `npx jest ./anchor/tests/specs/[specific-test].spec.ts`
- Start local Solana validator: `pnpm anchor-localnet`
- Deploy to devnet: `pnpm anchor deploy --provider.cluster devnet`

## Code Style
- TypeScript with strict typing, explicit interfaces for data structures
- React hooks follow `use` prefix convention (e.g., `useSoljarUser`)
- Error handling: use try/catch with specific error logging
- Imports order: React, external libraries, internal modules, relative imports
- Components use named exports, not default exports
- File naming: kebab-case for components, camelCase for utilities
- React Query for data fetching with proper queryKey conventions
- Use Tailwind with clsx/cva for styling components
- Prefer functional components with explicit type annotations
- Solana PDAs should use helper functions in pda-helper.ts
- Tests follow Jest patterns with describe/it blocks
- Web3 interactions are abstracted into custom hooks with clear naming