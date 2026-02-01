# SoDA Shop - Quick Start Guide

## 🛍️ What is SoDA Shop?

An e-commerce platform integrated with SoDA's points system where members can purchase merchandise using their earned points.

## 🚀 Getting Started

### 1. Access the Shop
Visit: `https://thesoda.io/shop`

### 2. Sign In with Clerk
- Click "Sign In" button in the shop navbar
- Sign up or sign in using Clerk authentication
- Use email, phone, or social login options

> **Note:** Clerk authentication provides secure, production-ready auth!

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
pnpm install
pnpm run dev
```

### Build for Production
```bash
pnpm run build
```

### Environment Setup
Create `.env`:
```
VITE_API_URL=https://api.thesoda.io
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

## 📋 Features

✅ Product catalog with search
✅ Shopping cart with localStorage persistence
✅ Points-based checkout
✅ Order history
✅ Points wallet & transactions
✅ Responsive design
✅ Dark theme matching SoDA branding
✅ Clerk-based authentication

⏳ Full Clerk token integration for API calls
⏳ Order status tracking
⏳ Product reviews
⏳ Wishlist

## 🐛 Troubleshooting

**Can't sign in?**
- Ensure VITE_CLERK_PUBLISHABLE_KEY is set in .env
- Check browser console for Clerk errors

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
