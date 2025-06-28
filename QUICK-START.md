# 🚀 Quick Start Guide

This guide will help you get your portfolio website up and running in minutes.

## 📋 Prerequisites

Before you start, make sure you have:
- A web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Notepad++, or any editor)
- (Optional) Node.js for development server features

## ⚡ Fastest Way to Run (1 minute)

1. **Open the website directly:**
   - Navigate to your project folder: `c:\Users\PC\Desktop\Website`
   - Double-click on `index.html`
   - Your website will open in your default browser!

That's it! Your portfolio website is now running locally.

## 🛠️ Better Development Setup (5 minutes)

For a better development experience with auto-refresh:

### Step 1: Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version
3. Restart your computer after installation

### Step 2: Install Live Server
1. Open PowerShell (Win + R, type `powershell`, press Enter)
2. Navigate to your project folder:
   ```powershell
   cd "c:\Users\PC\Desktop\Website"
   ```
3. Install live-server:
   ```powershell
   npm install -g live-server
   ```

### Step 3: Start Development Server
1. In the same PowerShell window, run:
   ```powershell
   live-server
   ```
2. Your website will automatically open at `http://localhost:8080`
3. Any changes you make will automatically refresh the browser!

## 🎯 Alternative Methods

### Using VS Code (Recommended for developers)
1. Download [VS Code](https://code.visualstudio.com/)
2. Install the "Live Server" extension
3. Open your project folder in VS Code
4. Right-click on `index.html` → "Open with Live Server"

### Using Python (If you have Python installed)
```powershell
cd "c:\Users\PC\Desktop\Website"
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Using built-in npm scripts
If you've installed Node.js and want to use the package.json scripts:
```powershell
cd "c:\Users\PC\Desktop\Website"
npm install
npm start
```

## 📱 Testing on Mobile Devices

### Method 1: Browser Developer Tools
1. Open your website in Chrome
2. Press F12 to open Developer Tools
3. Click the mobile/tablet icon (or Ctrl+Shift+M)
4. Select different device sizes to test responsiveness

### Method 2: Testing on Real Devices
1. Make sure your computer and mobile device are on the same WiFi network
2. Start live-server (it will show your local IP address)
3. On your mobile device, open the browser and go to:
   `http://YOUR-IP-ADDRESS:8080`
   (Replace YOUR-IP-ADDRESS with the IP shown in the terminal)

## 🔧 Making Changes

### Customizing Content
1. Open `index.html` in your text editor
2. Replace placeholder text with your information:
   - Your name in the hero section
   - About section content
   - Skills and technologies
   - Project information
   - Contact details

### Updating Styles
1. Open `css/style.css` to modify colors, fonts, and layout
2. Open `css/responsive.css` for mobile-specific changes
3. Save the file and refresh your browser (or auto-refresh with live-server)

### Adding Images
1. Add your images to the `images/` folder:
   - `profile.jpg` - Your profile picture
   - `project1.jpg`, `project2.jpg`, etc. - Project screenshots
2. Update the image paths in `index.html` if needed

## ✅ Verification Checklist

After running your website, check that:
- [ ] Website loads without errors
- [ ] Navigation menu works (clicking links scrolls to sections)
- [ ] Mobile menu works (hamburger menu on small screens)
- [ ] Contact form shows validation messages
- [ ] All sections are visible and properly styled
- [ ] Images load (or show placeholders if not added yet)
- [ ] Responsive design works on different screen sizes

## 🚨 Troubleshooting

### Website doesn't open
- Make sure the file path is correct
- Try a different browser
- Check if the `index.html` file exists in the project folder

### Live-server command not found
- Make sure Node.js is installed correctly
- Try closing and reopening PowerShell
- Install live-server again: `npm install -g live-server`

### Images not showing
- Check that image files are in the `images/` folder
- Verify file names match exactly (case-sensitive)
- Make sure image file extensions are correct (.jpg, .png, etc.)

### CSS not loading
- Check that `css/style.css` and `css/responsive.css` files exist
- Verify the file paths in the HTML `<link>` tags
- Clear browser cache (Ctrl+F5)

## 🌐 Next Steps

Once your website is running locally:

1. **Customize your content** using the guides in `CUSTOMIZATION.md`
2. **Test thoroughly** on different devices and browsers
3. **Deploy online** using GitHub Pages, Netlify, or Vercel
4. **Share your portfolio** with potential employers or clients!

Need more help? Check out the detailed documentation in:
- `README.md` - Project overview
- `CUSTOMIZATION.md` - Detailed customization guide
- `DEVELOPMENT.md` - Technical development notes
