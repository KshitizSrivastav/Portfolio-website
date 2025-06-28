# Customization Guide

This guide will help you customize the portfolio website to match your personal brand and showcase your work effectively.

## 📝 Content Customization

### 1. Personal Information

#### Hero Section (`index.html` lines 45-65)
```html
<h1 class="hero-title">Hi, I'm <span class="highlight">Your Name</span></h1>
<p class="hero-subtitle">Full Stack Developer & Designer</p>
<p class="hero-description">I create beautiful and functional web experiences</p>
```

**Replace with:**
- Your actual name
- Your professional title/role
- A brief, compelling description of what you do

#### About Section (`index.html` lines 75-95)
Update the about text with:
- Your background and experience
- Your passion and motivation
- Your professional journey
- Your goals and values

Update statistics:
- Projects completed
- Years of experience
- Client satisfaction rate
- Or any other relevant metrics

### 2. Skills & Technologies

#### Skills Section (`index.html` lines 105-135)
Organize your skills into categories:

**Frontend Technologies:**
- Programming languages (JavaScript, TypeScript, etc.)
- Frameworks (React, Vue, Angular, etc.)
- Styling (CSS, Sass, Tailwind, etc.)

**Backend Technologies:**
- Server technologies (Node.js, Python, PHP, etc.)
- Databases (MongoDB, PostgreSQL, MySQL, etc.)
- APIs and frameworks

**Tools & Others:**
- Development tools (Git, Docker, AWS, etc.)
- Design tools (Figma, Photoshop, etc.)
- Other relevant technologies

### 3. Projects Showcase

#### Project Cards (`index.html` lines 145-220)
For each project, update:

**Project Information:**
- Project name and description
- Technologies used
- Live demo URL
- GitHub repository URL

**Project Images:**
- Add high-quality screenshots to `images/` folder
- Update image paths in HTML
- Recommended size: 800x600px

**Project Structure:**
```html
<div class="project-card">
    <div class="project-image">
        <img src="images/your-project.jpg" alt="Project Name">
        <div class="project-overlay">
            <div class="project-links">
                <a href="https://your-live-demo.com" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="https://github.com/yourusername/project" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Detailed description of your project and its features</p>
        <div class="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
        </div>
    </div>
</div>
```

### 4. Contact Information

#### Contact Details (`index.html` lines 235-255)
Update:
- Email address
- Phone number
- Location
- Social media links (LinkedIn, GitHub, Twitter, etc.)

## 🎨 Visual Customization

### 1. Color Scheme

#### Primary Colors (`css/style.css`)
```css
/* Main brand colors */
:root {
    --primary-color: #2563eb;      /* Blue */
    --secondary-color: #7c3aed;    /* Purple */
    --accent-color: #fbbf24;       /* Yellow */
    --text-color: #333333;         /* Dark gray */
    --background-color: #ffffff;   /* White */
}
```

**Popular Color Schemes:**
- **Professional Blue**: `#1e40af`, `#3b82f6`, `#60a5fa`
- **Creative Purple**: `#7c2d92`, `#a855f7`, `#c084fc`
- **Elegant Dark**: `#1f2937`, `#374151`, `#6b7280`
- **Vibrant Green**: `#059669`, `#10b981`, `#34d399`

### 2. Typography

#### Font Selection (`index.html` head section)
Replace Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Update CSS:
```css
body {
    font-family: 'Roboto', sans-serif;
}
```

**Recommended Font Combinations:**
- **Modern**: Inter + Source Code Pro
- **Professional**: Roboto + Open Sans
- **Creative**: Poppins + Nunito
- **Minimal**: System fonts (San Francisco, Segoe UI)

### 3. Hero Background

#### Gradient Background (`css/style.css`)
```css
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Alternative Backgrounds:**
- **Image**: `background-image: url('images/hero-bg.jpg');`
- **Solid Color**: `background-color: #2563eb;`
- **Pattern**: Use CSS patterns or SVG backgrounds

### 4. Spacing and Layout

#### Container Width
```css
.container {
    max-width: 1200px; /* Adjust based on preference */
}
```

#### Section Padding
```css
section {
    padding: 80px 0; /* Increase/decrease vertical spacing */
}
```

## 🖼️ Image Guidelines

### 1. Profile Picture
- **Dimensions**: 400x400px minimum
- **Format**: JPG or PNG
- **Style**: Professional, well-lit, clean background
- **File size**: Under 200KB (optimized)

### 2. Project Screenshots
- **Dimensions**: 1200x800px or 16:9 aspect ratio
- **Format**: JPG or WebP for better compression
- **Content**: Show the main interface or key features
- **File size**: Under 500KB each

### 3. Image Optimization
Use tools like:
- [TinyPNG](https://tinypng.com/) - Online compression
- [Squoosh](https://squoosh.app/) - Advanced web optimization
- [ImageOptim](https://imageoptim.com/) - Mac application

## 📱 Mobile Optimization

### 1. Responsive Breakpoints
```css
/* Tablet */
@media screen and (max-width: 1024px) { }

/* Mobile */
@media screen and (max-width: 768px) { }

/* Small Mobile */
@media screen and (max-width: 480px) { }
```

### 2. Touch-Friendly Elements
- Buttons: Minimum 44px height
- Links: Adequate spacing between clickable elements
- Forms: Large input fields with proper spacing

## 🔧 Advanced Customization

### 1. Adding New Sections
1. Create HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Update navigation menu
4. Add scroll behavior in `script.js`

### 2. Animation Customization
```css
/* Custom animation duration */
.fade-in-up {
    animation-duration: 0.8s; /* Adjust timing */
}

/* Custom hover effects */
.custom-hover:hover {
    transform: translateY(-5px) scale(1.02);
    transition: all 0.3s ease;
}
```

### 3. Form Integration
Replace the JavaScript form handler with:
- **Netlify Forms**: Add `netlify` attribute to form
- **Formspree**: Add action URL to form
- **EmailJS**: Integrate client-side email service

## 🚀 Performance Tips

### 1. Image Optimization
- Use WebP format for modern browsers
- Implement lazy loading for images
- Use responsive images with `srcset`

### 2. CSS Optimization
- Remove unused CSS
- Minify CSS files for production
- Use critical CSS for above-the-fold content

### 3. JavaScript Optimization
- Minimize JavaScript execution
- Use defer/async for non-critical scripts
- Implement code splitting for larger applications

## 📋 Pre-Launch Checklist

- [ ] All personal information updated
- [ ] Projects showcase your best work
- [ ] Contact information is accurate
- [ ] All links work properly
- [ ] Images are optimized and loading
- [ ] Responsive design tested on multiple devices
- [ ] Form submission working
- [ ] SEO meta tags updated
- [ ] Favicon added
- [ ] Analytics tracking set up (optional)

## 🎯 SEO Optimization

### 1. Meta Tags
```html
<title>Your Name - Full Stack Developer Portfolio</title>
<meta name="description" content="Professional portfolio showcasing web development projects and skills">
<meta name="keywords" content="web developer, portfolio, react, javascript, your skills">
```

### 2. Open Graph Tags
```html
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Professional web developer portfolio">
<meta property="og:image" content="https://yoursite.com/images/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">
```

Remember to test your website thoroughly after making customizations and ensure it works well across different devices and browsers!
