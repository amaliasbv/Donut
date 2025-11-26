const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Keep a global reference to prevent garbage collection
let mainWindow;

// Production URL (Render deployment)
const PRODUCTION_URL = 'https://donut-tkwg.onrender.com';

// Development URL (local server)
const DEV_URL = 'http://localhost:5500';

// Use production by default, dev if --dev flag is passed
const isDev = process.argv.includes('--dev');
const APP_URL = isDev ? DEV_URL : PRODUCTION_URL;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        // Window styling
        backgroundColor: '#ffffff',
        show: false, // Don't show until ready
        titleBarStyle: 'default',
        autoHideMenuBar: false
    });

    // Load the app
    mainWindow.loadURL(APP_URL);

    // Show window when ready to prevent flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Focus the window
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    });

    // Handle external links - open in default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (!url.startsWith(APP_URL)) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create application menu
    createMenu();
}

function createMenu() {
    const template = [
        {
            label: 'DrawHub',
            submenu: [
                {
                    label: 'Home',
                    click: () => mainWindow.loadURL(APP_URL + '/#home')
                },
                {
                    label: 'Lessons',
                    click: () => mainWindow.loadURL(APP_URL + '/#lessons')
                },
                {
                    label: 'Assignments',
                    click: () => mainWindow.loadURL(APP_URL + '/#assignments')
                },
                {
                    label: 'Upload',
                    click: () => mainWindow.loadURL(APP_URL + '/#upload')
                },
                {
                    label: 'Profile',
                    click: () => mainWindow.loadURL(APP_URL + '/#profile')
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About DrawHub',
                    click: () => {
                        const { dialog } = require('electron');
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About DrawHub',
                            message: 'DrawHub - Learn to Draw!',
                            detail: 'Version 1.0.0\n\nAn AI-powered drawing learning platform.\n\nCreated with ❤️'
                        });
                    }
                },
                {
                    label: 'Open DevTools',
                    accelerator: 'F12',
                    click: () => mainWindow.webContents.openDevTools()
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// App ready
app.whenReady().then(createWindow);

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOS: Re-create window when dock icon is clicked
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        const appUrl = new URL(APP_URL);

        // Only allow navigation to app URL
        if (parsedUrl.origin !== appUrl.origin) {
            event.preventDefault();
            shell.openExternal(navigationUrl);
        }
    });
});
