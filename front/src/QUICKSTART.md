# 🚀 Quick Start Guide

Get the Azure Intelligent Cloud Forecasting Platform running in **5 minutes**!

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A code editor (VS Code recommended)

## ⚡ Installation

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- Tailwind CSS v4.0
- Motion/React (Framer Motion)
- Recharts
- Lucide React
- React Router v6

### Step 2: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or similar).

### Step 3: Explore the Platform

Open your browser and navigate through all 20 pages:

**Core Platform**
- `/` - Home with 3D effects
- `/features` - Feature showcase
- `/dashboard` - Analytics dashboard
- `/forecasting` - ML forecasting center
- `/model-health` - Model monitoring
- `/optimization` - Cost optimization
- `/behavior` - Behavior intelligence

**Marketing & Sales**
- `/why-choose-us` - Competitive advantages
- `/case-studies` - Customer success stories
- `/pricing` - Pricing plans
- `/integrations` - Integration catalog

**Resources & Support**
- `/resources` - Documentation hub
- `/deployment` - Deployment guides
- `/live-demo` - Interactive playground
- `/api-docs` - API reference
- `/faq` - Frequently asked questions
- `/security` - Security & compliance
- `/partners` - Partner ecosystem
- `/about` - About us
- `/contact` - Contact form

## 🎨 Customization

### Update Colors

Edit `/styles/globals.css` to change the neon gradient colors:

```css
/* Change primary color from cyan */
--color-primary: #2EBFFF;

/* Change secondary color from purple */
--color-secondary: #AE71FF;
```

### Modify Content

All page content is in `/pages/*.tsx` files. Simply edit the text, metrics, or data to match your needs.

### Add New Pages

1. Create new file: `/pages/YourPage.tsx`
2. Add route in `/App.tsx`:
   ```tsx
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Add nav link in `/components/Layout.tsx`

## 📊 Mock Data

The platform uses mock data for demonstrations. To connect real data:

1. **API Integration**: Update API calls in each page component
2. **Data Format**: Ensure your data matches the chart data structures
3. **State Management**: Consider adding Redux or Zustand for complex state

## 🚀 Build for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Azure App Service (Easiest)

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service plan
az appservice plan create --name myPlan --resource-group myResourceGroup --sku B1

# Create web app
az webapp create --name myForecastingApp --resource-group myResourceGroup --plan myPlan

# Deploy
npm run build
az webapp deployment source config-zip --resource-group myResourceGroup --name myForecastingApp --src dist.zip
```

### Option 2: Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

```bash
# Build and run
docker build -t forecasting-platform .
docker run -p 5173:5173 forecasting-platform
```

### Option 3: Vercel (1-Click Deploy)

```bash
npm install -g vercel
vercel
```

### Option 4: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in root:

```env
# API Configuration
VITE_API_URL=https://api.yourplatform.com
VITE_API_KEY=your_api_key_here

# Azure Configuration (Optional)
VITE_AZURE_SUBSCRIPTION_ID=your_subscription_id
VITE_AZURE_TENANT_ID=your_tenant_id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LIVE_DEMO=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📱 Responsive Breakpoints

The platform is optimized for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

Test responsive design in browser DevTools.

## 🎯 Key Features to Demo

When showing the platform, highlight:

1. **3D Visual Effects** - Home page holographic clouds
2. **Interactive Charts** - Dashboard with real-time data
3. **ML Forecasting** - Forecasting Center model selection
4. **Live Demo** - Interactive playground
5. **API Documentation** - Complete developer reference
6. **Security** - Enterprise-grade compliance info

## 🐛 Troubleshooting

### Issue: Charts not rendering
**Solution**: Ensure window is defined for SSR compatibility
```typescript
if (typeof window !== 'undefined') {
  // Chart code here
}
```

### Issue: Images not loading
**Solution**: Check image paths are relative to `/public` folder

### Issue: Animations janky
**Solution**: Reduce motion for low-power devices
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### Issue: Build errors
**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## 📚 Additional Resources

- **Full Documentation**: See `/README.md`
- **Platform Summary**: See `/PLATFORM_SUMMARY.md`
- **Deployment Checklist**: See `/DEPLOYMENT_CHECKLIST.md`
- **API Docs**: Navigate to `/api-docs` in the app
- **FAQ**: Navigate to `/faq` in the app

## 🎓 Learning Path

### For Designers
1. Explore Home, Features, and Dashboard pages
2. Review glassmorphism effects in DevTools
3. Check responsive design breakpoints
4. Customize colors in `globals.css`

### For Developers
1. Start with `/App.tsx` routing structure
2. Review component structure in `/components`
3. Check API examples in `/pages/APIDocsPage.tsx`
4. Explore chart implementations in Dashboard

### For Product Managers
1. Review all 20 pages for feature coverage
2. Check pricing page for monetization strategy
3. Review case studies for customer stories
4. Explore live demo for interactive experience

## 🤝 Contributing

To contribute or customize:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## 📞 Support

Need help?

- 📧 Email: support@aicloudforecast.com
- 💬 Chat: Available in Contact page
- 📚 Docs: Complete documentation in `/resources`
- 🐛 Issues: GitHub issues (if applicable)

## ✅ Checklist for First Deployment

- [ ] Install all dependencies
- [ ] Test all 20 pages locally
- [ ] Customize branding and colors
- [ ] Update API endpoints (if needed)
- [ ] Set environment variables
- [ ] Run production build
- [ ] Test responsive design
- [ ] Deploy to hosting platform
- [ ] Configure custom domain
- [ ] Set up monitoring/analytics
- [ ] Enable HTTPS/SSL
- [ ] Share with team!

## 🎉 You're Ready!

Your Azure Intelligent Cloud Forecasting Platform is now running. Explore all 20 pages, customize the content, and deploy to production!

---

**Quick Links**
- 🏠 Home: `/`
- 📊 Dashboard: `/dashboard`
- 🎮 Live Demo: `/live-demo`
- 📖 API Docs: `/api-docs`
- 💰 Pricing: `/pricing`

**Version**: 1.0.0
**Status**: Production Ready ✅
**Last Updated**: November 2025

*Happy coding! 🚀*
