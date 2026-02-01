# Clerk Authentication Setup

## 1. Create Clerk Account
1. Go to https://clerk.com
2. Sign up/Login
3. Create a new application

## 2. Get Your Publishable Key
1. In your Clerk dashboard, go to "API Keys"
2. Copy the "Publishable Key"

## 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```bash
VITE_API_URL=https://api.thesoda.io
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

## 4. Test the Integration
1. Run `pnpm run dev`
2. Go to http://localhost:5173/shop
3. Click "Sign In" in the navbar
4. Sign up/Sign in with Clerk
5. Go to http://localhost:5173/shop/account to see your points

## Features Integrated
✅ Sign In button in navbar
✅ User display in navbar when signed in  
✅ Sign out functionality
✅ Protected Account page
✅ Fetches user points from platform API using email
✅ Displays points balance and recent activity

## Next Steps
- [ ] Add Clerk publishable key to production environment
- [ ] Implement order checkout with Clerk authentication token
- [ ] Add Clerk webhook to sync users to platform DB
