# SoDA Shop - Quick Start Guide

## 🛍️ What is SoDA Shop?

An e-commerce platform integrated with SoDA's points system where members can purchase merchandise using their earned points.

## 🚀 Getting Started

### 1. Access the Shop
Visit: `https://thesoda.io/shop`

### 2. Login (Mock - Development Only)
- Click "Login" button in navbar
- Enter your email
- Click "Login (Mock)"

> **Note:** Real Discord OAuth authentication coming soon!

### 3. Browse Products
- View all available products
- Click on a product to see details
- Check stock availability

### 4. Add to Cart
- Select quantity
- Click "Add to Cart"
- Cart icon shows item count

### 5. Checkout
- Review your cart
- Check your points balance
- Place order (points automatically deducted)

### 6. Track Orders
- Go to "My Account"
- View order history
- See points transactions

## 💰 How Points Work

**Earning Points:**
- Attend SoDA events
- Participate in activities
- Complete challenges

**Spending Points:**
- Purchase merchandise from shop
- Points deducted automatically on checkout
- Negative point entries added to your account

**Your Wallet:**
- Balance = Sum of all positive + negative points
- View complete history in account page
- Real-time balance updates

## 🔧 Development

### Run Locally
```bash
npm install --legacy-peer-deps
npm run dev
```

### Build for Production
```bash
npm run build
```

### Environment Setup
Create `.env`:
```
VITE_API_URL=https://api.thesoda.io
```

## 📋 Features

✅ Product catalog with search
✅ Shopping cart with localStorage persistence
✅ Points-based checkout
✅ Order history
✅ Points wallet & transactions
✅ Responsive design
✅ Dark theme matching SoDA branding

⏳ Discord OAuth (coming soon)
⏳ Order status tracking
⏳ Product reviews
⏳ Wishlist

## 🐛 Troubleshooting

**Can't login?**
- Mock login accepts any email
- Check browser console for errors

**Products not loading?**
- Verify API is running: `https://api.thesoda.io/health`
- Check network tab in browser DevTools

**Checkout fails?**
- Ensure you have sufficient points
- Check cart items are in stock
- Try refreshing the page

## 📞 Support

Need help? Contact:
- SoDA Discord: https://discord.gg/soda
- GitHub Issues: https://github.com/asusoda/asu-soda-newsite/issues

---
**Happy Shopping! 🥤**
