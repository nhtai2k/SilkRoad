# Webcore.client AI Coding Instructions

## Project Architecture

This is an Angular 20+ application built with **CoreUI** and **Ng-Zorro (Ant Design)** UI frameworks. The project follows a feature-based modular architecture with domain-specific modules organized under `src/app/views/`.

### Key UI Libraries & Integration
- **CoreUI Angular**: Primary UI framework for layouts and navigation
- **Ng-Zorro (Ant Design)**: Component library for forms, tables, and widgets  
- **Angular Material**: Used selectively alongside CoreUI
- **Chart.js + AmCharts**: For data visualization components
- **SignalR**: Real-time communication with backend

## File Organization & Path Mappings

The project uses **TypeScript path mapping** for clean imports:
```typescript
@components/*  → src/app/core/components/*
@models/*      → src/app/core/models/*  
@services/*    → src/app/core/services/*
@common/*      → src/app/core/common/*
```

### Core Directory Structure
- **`src/app/core/`**: Shared infrastructure (services, models, components)
  - `services/`: Organized by feature domains (`system-services/`, `stock-services/`, etc.)
  - `models/`: Domain models with `base.model.ts` providing common interface
  - `common/`: Global constants and API URL enums in `url-api.ts`
- **`src/app/views/`**: Feature modules (stocks, surveys, restaurant, etc.)
- **`src/app/layout/default-layout/`**: Main application shell with navigation

## Development Patterns

### API Communication Pattern
All services follow a consistent pattern:
- Use `APIResponse<T>` interface from `@models/api-response.model`
- URL endpoints defined as **enums** in `@common/url-api` (e.g., `EAuthSystemUrl.loginUrl`)
- Services organized in domain folders with **barrel exports** via `index.ts`
- HTTP interceptor (`auth-interceptor.service`) handles authentication tokens

### State Management with Signals
Modern Angular **signals** are used for reactive state:
```typescript
private accessTokenSignal = signal<string | null>(null);
accessToken = computed(() => this.accessTokenSignal());
```

### Service Registration
All services use `providedIn: 'root'` for singleton injection. Core services are re-exported through domain-specific `index.ts` files for organized imports.

## Essential Commands

### Development Server
```bash
npm run start    # Uses run-script-os for cross-platform HTTPS setup
```
The start script automatically configures **HTTPS certificates** and runs on `127.0.0.1` with SSL.

### Build & Test  
```bash
npm run build    # Production build
npm run watch    # Development build with file watching
npm run test     # Karma unit tests
```

## Navigation & Routing

Navigation structure is defined in `_nav.ts` with domain-specific sections:
- Feature nav items are organized by business domains (Stock Market, Personal Finance, etc.)
- Route configuration supports hash-based routing (`withHashLocation()`)
- View transitions and scroll restoration are enabled

## Authentication & Security

- **JWT authentication** with `jwt-decode` library
- **Google OAuth** integration via `@abacritt/angularx-social-login`
- Authentication state managed through Angular signals
- HTTP interceptor automatically adds auth headers to API requests

## Multi-Domain Features

This application serves multiple business domains:
- **Stock Market**: Company trading, industry analysis  
- **Restaurant Management**: POS and inventory systems
- **Personal Finance**: Expense tracking and budgeting
- **Survey System**: Form creation and data collection
- **Bill of Materials (BOM)**: Manufacturing and inventory

Each domain has dedicated models, services, and view components in their respective folders.

## Key Integration Points

- **SignalR Hub**: Real-time communication for chat/notifications
- **External APIs**: Integrated with various third-party services (payment, maps, etc.)
- **File Upload/Download**: PDF generation, Word document conversion
- **Chart Components**: AmCharts and Chart.js for different visualization needs

When working with this codebase, always follow the established path mapping conventions and domain-based organization. Services should be properly typed with the `APIResponse<T>` pattern, and new features should follow the modular structure under `src/app/views/`.