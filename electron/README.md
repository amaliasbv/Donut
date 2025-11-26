# DrawHub Desktop App

This is the Electron wrapper for DrawHub that creates a native desktop application.

## Setup

1. Navigate to the electron folder:
   ```bash
   cd electron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app (connects to production server):
   ```bash
   npm start
   ```

4. Run in development mode (connects to localhost:5500):
   ```bash
   npm run start:dev
   ```

## Building Executables

### Windows (.exe)
```bash
npm run build:win
```
This creates:
- `dist/DrawHub Setup 1.0.0.exe` - Installer
- `dist/DrawHub 1.0.0.exe` - Portable version

### macOS (.dmg)
```bash
npm run build:mac
```

### Linux (.AppImage, .deb)
```bash
npm run build:linux
```

## Adding Icons

Place your icons in the `assets` folder:
- `icon.ico` - Windows (256x256 recommended)
- `icon.icns` - macOS
- `icon.png` - Linux (512x512 recommended)

You can generate these from your emoji icon using online tools like:
- https://icoconvert.com
- https://cloudconvert.com

## Notes

- The app connects to your Render deployment by default
- All updates to the web app are automatically reflected in the desktop app
- No need to rebuild the desktop app when you update the website
