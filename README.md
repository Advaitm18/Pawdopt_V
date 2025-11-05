# 🐾 PawDopt - Pet Adoption Website

![PawDopt Banner](https://images.unsplash.com/photo-1616620649761-48f5ca3e17f8?w=1200&h=400&fit=crop)

An interactive, modern pet adoption website built with React, TypeScript, and Tailwind CSS. Find your perfect companion with smooth animations, advanced filtering, and a beautiful UI.

## ✨ Features

### 🎯 Core Functionality
- **Pet Browsing** - View all available pets with beautiful card layouts
- **Advanced Filtering** - Filter pets by species (Dogs/Cats) and age range
- **Favorites System** - Save your favorite pets to a wishlist
- **Adoption Forms** - Submit adoption requests with contact information
- **Contact System** - Reach out directly via comprehensive contact forms

### 🎨 User Experience
- **Smooth Animations** - Motion/Framer Motion powered interactions
- **Interactive Video Player** - Custom controls with play/pause and mute
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for user actions
- **Beautiful Hero Section** - Eye-catching background with call-to-action

### 🛠️ Technical Features
- **TypeScript** - Type-safe code for reliability
- **Component Architecture** - Modular and reusable components
- **Modern UI Components** - Radix UI primitives
- **Performance Optimized** - Memoized filters and lazy loading
- **Accessible** - WCAG compliant components

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation & Running

```bash
# 1. Navigate to project directory
cd pawdopt-pet-adoption

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open browser to http://localhost:5173
```

**That's it! 🎉** Your PawDopt website should now be running!

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18+** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS v4** | Styling |
| **Motion** | Animations |
| **Radix UI** | Headless Components |
| **Lucide React** | Icons |
| **Sonner** | Toast Notifications |

## 📂 Project Structure

```
pawdopt-pet-adoption/
├── src/
│   └── main.tsx                      # Entry point
├── components/
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component with fallback
│   └── ui/                           # Reusable UI components (35+ files)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── ...
├── styles/
│   └── globals.css                   # Global styles & Tailwind config
├── App.tsx                           # Main application component
├── index.html                        # HTML template
├── package.json                      # Dependencies
├── vite.config.ts                    # Vite configuration
└── tsconfig.json                     # TypeScript config
```

## 🎮 How to Use

### Browse Pets
1. Scroll down to the "Meet Our Adorable Pets" section
2. View all available pets with their photos, names, and details

### Filter Pets
1. Use the species dropdown to filter by Dogs or Cats
2. Use the age range filter for Young, Adult, or Senior pets
3. Click "Clear Filters" to reset

### Add to Favorites
1. Click the heart icon on any pet card
2. View your favorites in the "Your Favorites" section
3. Click the heart again to remove from favorites

### Adopt a Pet
1. Click "Adopt Me" on any pet card
2. Fill out the adoption form with your details
3. Submit to receive a confirmation toast

### Contact Us
1. Navigate to the Contact section
2. View phone numbers, email, location, and hours
3. Fill out the contact form for inquiries
4. Connect via social media links

### Watch Video
1. Find the video section in "Learn About Pet Adoption"
2. Click the play button to start
3. Use the mute/unmute button as needed

## 🎨 Customization

### Add More Pets
Edit the `pets` array in `App.tsx`:

```typescript
const pets: Pet[] = [
  {
    id: 7,
    name: "Your Pet",
    age: "2 years",
    ageInYears: 2,
    image: "your-image-url",
    species: "Dog" // or "Cat"
  },
  // ... more pets
];
```

### Change Colors
Edit `/styles/globals.css` to modify the color scheme:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... */
}
```

### Update Contact Info
Find the Contact Section in `App.tsx` and modify:
- Phone numbers
- Email addresses
- Location/address
- Business hours
- Social media links

## 📜 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint
```

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | 14+ |
| Edge | Latest 2 versions |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Latest |

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Images not loading?
- Check your internet connection
- Unsplash images require internet access
- Check browser console for CORS errors

### Styles not applying?
- Ensure `globals.css` is imported in `main.tsx`
- Clear browser cache
- Restart the dev server

### Port already in use?
```bash
npm run dev -- --port 3000
```

## 🔒 Privacy & Data

This is a **frontend-only demo application**:
- No data is sent to any server
- Form submissions show toast notifications only
- All data is stored locally in browser state
- No cookies or tracking

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

Having issues? Check the troubleshooting section above or open an issue on GitHub.

## 🎯 Future Enhancements

Potential features to add:
- [ ] Backend integration with Supabase
- [ ] User authentication
- [ ] Admin dashboard for pet management
- [ ] Advanced search with multiple filters
- [ ] Pet detail pages
- [ ] Application tracking
- [ ] Email notifications
- [ ] Gallery view
- [ ] Pet comparisons
- [ ] Donation system

## 🌟 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI Components from [Radix UI](https://www.radix-ui.com)
- Animations from [Motion](https://motion.dev)

---

**Made with ❤️ and 🐾 for pet lovers everywhere!**

---

---

**Made with ❤️ and 🐾 by the PawDopt team**

Enjoy! 🎉

