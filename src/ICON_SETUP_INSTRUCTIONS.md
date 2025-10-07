# LoanPro App Icons Setup

To make your LoanPro app fully downloadable, you need to add app icons to the `public/icons/` directory.

## Required Icons

Create the following icon files in `public/icons/`:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`
- `favicon.ico`

## Icon Design Guidelines

- **Background**: Dark color (#030213 - your primary color)
- **Symbol**: White "K" letter or LoanPro logo
- **Style**: Modern, clean design with rounded corners
- **Format**: PNG for app icons, ICO for favicon

## Quick Setup Options

### Option 1: Use Online Icon Generator
1. Visit an online PWA icon generator (like https://realfavicongenerator.net/)
2. Upload your logo or create a simple "K" design
3. Generate all required sizes
4. Download and place in `public/icons/`

### Option 2: Use Built-in Generator
1. Open your browser console
2. Import the icon generator: `import { generateAndDownloadIcons } from './utils/iconGenerator.js'`
3. Run: `generateAndDownloadIcons()`
4. Save downloaded icons to `public/icons/`

### Option 3: Create Manually
Use any image editor to create icons with:
- Square canvas
- Dark background (#030213)
- White "K" symbol in center
- Export in required sizes

## Verification

After adding icons:
1. Reload your app
2. Check browser console for any icon loading errors
3. Test PWA installation on mobile devices
4. Verify icons appear correctly in app drawer/home screen

## Android Studio Integration (Optional)

If you want to create native Android builds:
1. Install Capacitor: `npm install @capacitor/core @capacitor/android`
2. Initialize: `npx cap init`
3. Add Android platform: `npx cap add android`
4. Sync: `npx cap sync`
5. Open in Android Studio: `npx cap open android`

Your PWA will work perfectly without Android Studio, but native builds provide additional features and distribution options.