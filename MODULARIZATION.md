# Website Modularization

## Summary of Changes

The website codebase has been modularized to improve maintainability and code organization.

### New Structure

#### 1. **Hooks** (`src/hooks/`)
- `useProducts.ts` - Manages product fetching logic
- `useUserOrders.ts` - Manages user orders fetching
- `useUserPoints.ts` - Manages user points/wallet data
- `index.ts` - Barrel export for all hooks

#### 2. **Components** (`src/components/Shop/`)
- `ProductCard/` - Reusable product display card
- `OrderCard/` - Reusable order display card
- `EmptyState.tsx` - Generic empty state component

#### 3. **Constants** (`src/constants/`)
- `shop.ts` - Shop-related constants (order statuses, colors, fallback images)

#### 4. **Utils** (`src/utils/`)
- `dateFormat.ts` - Date formatting utilities
- `format.ts` - Number/points formatting utilities
- `index.ts` - Barrel export for all utilities

### Benefits

1. **Reusability**: Components like ProductCard and OrderCard can be reused across multiple pages
2. **Maintainability**: Logic is separated into hooks, making it easier to update
3. **Type Safety**: Centralized constants prevent typos and inconsistencies
4. **Testability**: Isolated components and hooks are easier to test
5. **Readability**: Pages are now much cleaner and focused on layout/composition

### Files Refactored

- `src/pages/Shop/ShopIndex.tsx` - Reduced from 317 lines to ~100 lines
- `src/pages/Shop/Account.tsx` - Significantly simplified by using hooks and components
- API calls consolidated into custom hooks
- Repeated UI patterns extracted into components

### Usage Examples

```typescript
// Using hooks
import { useProducts, useUserOrders } from '../../hooks';

// Using components
import { ProductCard } from '../../components/Shop/ProductCard';
import { OrderCard } from '../../components/Shop/OrderCard';
import { EmptyState } from '../../components/Shop/EmptyState';

// Using constants
import { ORDER_STATUS_COLORS, FALLBACK_IMAGES } from '../../constants/shop';

// Using utilities
import { formatDateTime, formatPoints } from '../../utils';
```

### Next Steps for Further Modularization

1. Extract Cart logic into custom hooks
2. Create shared form components
3. Extract animation variants into constants
4. Create shared layout components for shop pages
