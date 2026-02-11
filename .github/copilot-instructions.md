# ASU SoDA Website

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Project Overview

The ASU Software Developers Association (SoDA) website is a React + TypeScript single-page application built with Vite. It showcases the organization, team members, events, and provides information about programs like mentorship and distinguished member points system.

## Working Effectively

### Prerequisites and Setup

- **Node.js Version**: v20.19.4 (verified working)
- **Package Manager**: ALWAYS use `pnpm` - npm has compatibility issues with this project
- **Install pnpm**: `npm install -g pnpm`

### Bootstrap and Build Process

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

   - Takes approximately 20 seconds
   - Downloads ~554 packages
   - May show warnings about build scripts - these are safe to ignore

2. **Build the Project**:

   ```bash
   pnpm run build
   ```

   - **NEVER CANCEL**: Build takes 75+ seconds. Set timeout to 120+ minutes.
   - Runs TypeScript compilation (`tsc`) followed by Vite build
   - Generates optimized production build in `dist/` directory
   - Includes automatic image optimization which may skip some images if optimization would increase file size
   - Final bundle size is ~785KB with gzip compression to ~259KB

3. **Development Server**:

   ```bash
   pnpm run dev
   ```

   - Starts Vite dev server on `http://localhost:5173/`
   - Hot reload enabled - changes automatically refresh the page
   - Typically starts in ~500ms
   - Press Ctrl+C to stop

4. **Preview Production Build**:
   ```bash
   pnpm run preview
   ```

   - Serves the built application from `dist/` on `http://localhost:4173/`
   - Use this to test production builds locally

### Linting and Code Quality

- **Current Issue**: ESLint configuration is incompatible with ESLint v9
- **Lint Command**: `pnpm run lint` - **CURRENTLY FAILS** with error: "ESLint couldn't find an eslint.config.(js|mjs|cjs) file"
- **Root Cause**: Project uses .eslintrc.cjs format but ESLint v9+ requires eslint.config.js format
- **Workaround**: Manual code review or migrate ESLint config if linting is critical
- **DO NOT** attempt to fix ESLint issues unless specifically asked - focus on functionality over linting

## Validation and Testing

### Manual Validation Requirements

**ALWAYS manually validate changes by running through these scenarios after making code changes:**

1. **Homepage Functionality**:
   - Run `pnpm run dev`
   - Navigate to `http://localhost:5173/`
   - Verify all sections load: Hero, About, Sponsors, Team, History
   - Test navigation menu (mobile and desktop)
   - Verify statistics animation works

2. **Multi-page Navigation**:
   - Test all routes: `/`, `/apply`, `/leaderboard`, `/mentorship`, `/points`, `/distinguishedMembers`
   - Ensure React Router navigation works (no page reloads)
   - Verify each page renders without errors
   - Test browser back/forward navigation
   - Check that page titles update correctly

3. **Responsive Design**:
   - Test mobile and desktop layouts (viewport sizes: 320px, 768px, 1024px, 1920px)
   - Verify dropdown menus work on mobile (hamburger menu)
   - Check image loading and optimization
   - Test touch interactions on mobile devices

4. **Production Build Validation**:
   - Run `pnpm run build` and `pnpm run preview`
   - Test the same scenarios on `http://localhost:4173/`
   - Verify all assets load correctly in production mode
   - Check that statistics animation and interactive elements work
   - Confirm bundled CSS and JS load properly

### Build Validation

- **Always run** `pnpm run build` before committing changes
- **Build time expectation**: 75+ seconds - NEVER CANCEL
- **Watch for**: TypeScript compilation errors, missing assets, bundle size warnings

## Project Structure and Key Files

### Repository Root

```
.
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts (uses pnpm)
├── pnpm-lock.yaml        # Locked dependency versions
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.cjs         # ESLint config (broken with v9)
├── components.json       # shadcn component configuration
├── deploy.sh            # Production deployment script
├── src/                 # Source code
├── public/              # Static assets
├── dist/               # Build output (generated)
└── .github/workflows/   # CI/CD pipeline
```

### Source Code Structure

```
src/
├── main.tsx            # Application entry point
├── App.tsx             # Main application component
├── app.css            # Global styles and TailwindCSS
├── components/        # Reusable React components
│   ├── Navigation/    # Navbar and menu components
│   ├── Stats/         # Statistics display
│   └── ui/            # shadcn UI components
└── pages/             # Route components
    ├── Home.tsx       # Homepage
    ├── PositionOpenings.tsx  # Job applications page
    ├── LeaderBoard.tsx       # Member leaderboard
    ├── Mentorship.tsx        # Mentorship program info
    └── PointsSystem.tsx      # Distinguished member program
```

### Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.2.4
- **Styling**: TailwindCSS v4 with shadcn components
- **Router**: React Router Dom v7.4.1
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion, custom CSS animations
- **Image Optimization**: vite-plugin-image-optimizer

## Common Development Tasks

### Adding New Pages

1. Create new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navigation/Navbar.tsx`
4. Test navigation and build

### Updating Team Information

- Edit team data in `src/components/Team/TeamList.json`
- Add new headshots to `public/headshots/`
- Update statistics in `src/components/Stats/Statistics.tsx`

### Styling Changes

- Global styles: `src/app.css`
- Component styles: Use TailwindCSS classes
- shadcn components: Configure in `components.json`

### Image Assets

- Static images: `public/` directory
- Optimized during build automatically
- Use `.webp` format for best optimization

## CI/CD Pipeline

### GitHub Actions Workflow

- **File**: `.github/workflows/cd.yml`
- **Trigger**: Push to any branch
- **Process**: SSH to production server, pull changes, build with pnpm, restart service
- **Dependencies**: Requires pnpm installation on target server
- **Build Time**: Plan for 75+ seconds in CI environment

### Production Deployment

- Uses `pnpm install` and `pnpm run build`
- Serves built files with systemctl service
- Runs on port 3000 in production

## Troubleshooting

### Common Issues

1. **npm commands fail**: Always use `pnpm` instead - npm has dependency resolution errors
2. **ESLint errors**: Known issue with v9 migration - skip linting for now
3. **Build timeouts**: Set timeouts to 120+ seconds, builds take 75+ seconds
4. **Image optimization warnings**: Normal - optimizer skips images that would become larger
5. **Console errors about blocked API calls**: Expected in development - external API calls are blocked in sandbox environment
6. **Bundle size warnings**: Expected at 500KB+ - consider code splitting for larger features

### Performance Notes

- Bundle size warning at 500KB+ is expected
- Consider code splitting for larger features
- Image optimization may skip files to maintain quality

## Important Notes for AI Agents

- **NEVER CANCEL** build commands - they take 75+ seconds normally
- **ALWAYS use pnpm** - npm will fail with this project
- **Manual validation is required** - no automated tests exist
- **Test responsive design** - mobile navigation is critical
- **Verify image loading** - optimization can affect asset paths
- **Check production build** - dev and prod may behave differently
