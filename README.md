# 🚀 everythin-svelte

A comprehensive SvelteKit project demonstrating various front-end patterns, state management approaches, and authentication flows. This project serves as a learning playground for different SvelteKit features and best practices.

Built with the [**Purple Admin**](https://www.bootstrapdash.com/) HTML template using **Bootstrap 5** and **Sass** for a clean, responsive interface.

---

## 📋 Project Structure & Learning Examples

### 🏠 **Dashboard** (`/`)
- **Purpose**: Original template showcase
- **Features**: Interactive charts using Chart.js, sample widgets, responsive layout
- **Note**: Preserves the original Purple Admin template design and functionality

### 🎨 **Basic UI Elements** (`/basic-ui-elements/*`)
- **Purpose**: Original template component library
- **Subpages**: Buttons, Dropdowns, Typography, Icons, Forms, Charts, Tables, Documentation
- **Note**: Complete collection of UI components from the original template for reference

### ⏱️ **Counter** (`/counter`)
- **Purpose**: State management demo using **Svelte 5 runes**
- **Features**:
  - Timer/Pomodoro functionality with preset durations (1, 5, 10, 20 minutes)
  - Custom duration input with validation
  - Progress bar and real-time statistics
  - Browser notification and audio alerts
  - Responsive Bootstrap 5 design
- **Learning Focus**: `$state`, `$derived`, and `$effect` usage patterns

### � **Employees** (`/employees`)
- **Purpose**: **Svelte store management** demonstration
- **Features**:
  - Employee listing with search and filtering
  - Status toggle functionality (active/inactive)
  - Real-time statistics (total, active, inactive employees)
  - Store-based state management with derived stores
  - API integration for CRUD operations
- **Learning Focus**: Writable stores, derived stores, store composition

### 🔐 **Authentication** (`/auth/*`)
- **Purpose**: **SvelteKit form actions** demonstration
- **Pages**: Register, Login, Logout
- **Features**:
  - Server-side form validation and processing
  - Custom validation functions with real-time feedback
  - Session management with JWT tokens
  - Form enhancement with progressive enhancement
  - Custom auth input components
- **Learning Focus**: Form actions, server-side validation, authentication flows

### 🧭 **Navigation**
- **Top Bar**: Currently minimal functionality - only displays user info and logout
- **Sidebar**: Full navigation to all sections and subsections
- **Note**: Top bar is prepared for future enhancements (search, notifications, etc.)

---

## 🏗️ Technical Architecture

### State Management Patterns
1. **Svelte 5 Runes** (`/counter`) - Modern reactive state with `$state`, `$derived`, `$effect`
2. **Svelte Stores** (`/employees`) - Traditional store-based state management
3. **Form Actions** (`/auth/*`) - Server-side state handling with form actions

### Data Layer
- **Mock Database**: In-memory user management with simulated async operations
- **JWT Authentication**: Token-based session management
- **API Routes**: RESTful endpoints for employee management

### UI Framework
- **Bootstrap 5**: Responsive grid system and components
- **Custom Sass**: Theme customization and component styling
- **Font Awesome**: Icon library integration

---

## 🖼 UI Template

This project uses **[Purple Admin](https://www.bootstrapdash.com/)** — a responsive admin template built with:
- **Bootstrap 5**
- **Sass**

---

## 🛠 Getting Started

To run the project locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```
