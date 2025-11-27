# Lulusia Kingdom - Enterprise Business Management Platform

## 🌟 Overview

**Lulusia Kingdom** is a comprehensive enterprise-grade business management platform built with .NET Core and Angular. This multi-domain solution serves as a unified ecosystem for various business operations, combining e-commerce, customer management, financial services, and business intelligence capabilities.

## 🏗️ Architecture

The platform follows a clean, modular architecture with distinct layers:

- **Frontend**: Angular-based client application (`webcore.client`)
- **Backend**: ASP.NET Core Web API (`WebCore.Server`)
- **Business Logic**: Domain-specific business logic libraries
- **Data Access**: Entity Framework Core with repository pattern
- **Common**: Shared utilities, models, and services

## 🚀 Core Modules

### 🛍️ E-Commerce Solutions
- **Lipstick Shop**: Complete cosmetics e-commerce platform with product catalog, shopping cart, and order management
- **Coffee Shop**: Café management system with menu and ordering capabilities
- **Restaurant**: Restaurant management with menu, reservations, and customer service

### 📊 Business Intelligence
- **Stock Market System**: Real-time stock tracking, industry analysis, and financial reporting
- **Survey Platform**: Comprehensive survey creation, distribution, and analytics
- **VOC (Voice of Customer)**: Customer feedback management and analysis

### 💳 Financial Services
- **Payment Service**: Multi-gateway payment processing (ZaloPay, MoMo, VNPay, PayPal, Stripe)
- **Member Service**: Customer relationship management and loyalty programs

### 📱 Communication & Engagement
- **SMS Service**: Automated messaging and notifications
- **Slideshow Management**: Dynamic content management for promotional materials
- **Real-time Chat**: SignalR-powered live chat functionality

## 🛠️ Technology Stack

### Backend
- **.NET 9**: Modern cross-platform framework
- **ASP.NET Core**: Web API and MVC
- **Entity Framework Core**: Object-relational mapping
- **SignalR**: Real-time web functionality
- **JWT Authentication**: Secure token-based authentication
- **Serilog**: Structured logging

### Frontend
- **Angular 20**: Modern TypeScript-based SPA framework
- **CoreUI**: Professional admin dashboard components
- **RxJS**: Reactive programming with observables
- **Chart.js**: Data visualization

### Database
- **SQL Server**: Primary database engine
- **Multiple Database Context**: Separated databases for different domains

### Development Tools
- **AutoMapper**: Object-to-object mapping
- **Swagger/OpenAPI**: API documentation
- **Docker**: Containerization support

## 🌐 Key Features

### Multi-Language Support
- English and Vietnamese localization
- Dynamic language switching
- Culturally-aware formatting

### Advanced Security
- JWT token authentication
- Role-based authorization
- API key protection
- CORS configuration

### Real-time Capabilities
- Live chat system
- Payment status updates
- Stock price monitoring
- Order tracking

### Reporting & Analytics
- Excel export functionality
- Survey response analytics
- Sales reporting
- Customer behavior tracking

### Payment Integration
- Multiple payment gateways
- QR code payments
- Bank transfer support
- Real-time payment verification

## 📂 Project Structure

```
LulusiaKingdom/
├── WebCore.Server/           # Main API server
├── webcore.client/           # Angular frontend
├── Common/                   # Shared libraries
├── BusinessLogic/            # Core business logic
├── DataAccess/              # Data layer
├── Lipstick/                # Cosmetics e-commerce
├── Restaurant/              # Restaurant management
├── CaffeeShop/              # Café system
├── MemberService/           # Customer management
├── PaymentService/          # Payment processing
├── SMSService/              # Messaging service
└── [Domain]BusinessLogic/   # Domain-specific logic layers
```

## 🚀 Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js 20+
- SQL Server
- Visual Studio 2022 or VS Code

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jsonmasker/LulusiaKingdom.git
   cd LulusiaKingdom
   ```

2. **Setup Database**
   ```bash
   ./create_databases.sh
   ```

3. **Configure Connection Strings**
   Update `appsettings.json` in `WebCore.Server` with your database connections

4. **Install Dependencies**
   ```bash
   # Backend
   dotnet restore
   
   # Frontend
   cd webcore.client
   npm install
   ```

5. **Run the Application**
   ```bash
   # Backend
   dotnet run --project WebCore.Server
   
   # Frontend
   cd webcore.client
   npm start
   ```

## 🌍 Business Domains

This platform serves multiple business verticals:
- **Retail & E-commerce**: Complete online shopping experiences
- **Food & Beverage**: Restaurant and café management
- **Financial Services**: Payment processing and member management
- **Market Research**: Survey and feedback collection
- **Business Analytics**: Data-driven insights and reporting

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to submit pull requests, report issues, and suggest improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Lulusia Kingdom** - Empowering businesses with integrated digital solutions 🏰✨