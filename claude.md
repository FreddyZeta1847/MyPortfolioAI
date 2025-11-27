# Claude.md - Portfolio Improvement Project

## Project Overview
This is Federico Santini's personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Main Goal
Help improve and transform this personal portfolio website to make it:
- **Better** - Improved code quality, performance, and UX
- **Stunning** - Modern, eye-catching design with smooth animations
- **Professional** - Clean, polished look that impresses recruiters and clients

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Navigation**: React Scroll
- **Backend**: Node.js + Express (contact form)

## Project Structure
```
src/
├── components/     # React components (Navbar, Hero, Education, Skills, Projects, Contact, Footer)
├── data/           # Static data files (navItems, education, skills, projects)
├── types/          # TypeScript interfaces
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
backend/
└── server.js       # Express server for contact form
```

## Areas for Improvement

### Design & Visual
- [ ] Modernize the overall design aesthetic
- [ ] Add more engaging animations and micro-interactions
- [ ] Improve color scheme and gradients
- [ ] Enhance typography hierarchy
- [ ] Add visual depth with shadows and layering
- [ ] Improve image presentations
- [ ] Add dark/light mode toggle

### User Experience
- [ ] Improve navigation flow
- [ ] Add loading states and transitions
- [ ] Enhance mobile responsiveness
- [ ] Add scroll-triggered animations
- [ ] Improve accessibility (a11y)

### Components to Enhance
- [ ] **Hero**: Make it more impactful and memorable
- [ ] **Skills**: Better visualization (progress bars, icons, categories)
- [ ] **Projects**: More interactive cards with better hover effects
- [ ] **Education**: Improved timeline design
- [ ] **Contact**: More engaging form design
- [ ] **Navbar**: Smoother transitions, better mobile menu

### Performance
- [ ] Optimize images
- [ ] Lazy loading for components
- [ ] Reduce bundle size

### Content
- [ ] Review and improve copy/text
- [ ] Ensure all links work
- [ ] Add more project details

## Current Color Palette
- Primary: Teal/Turquoise shades
- Accent: Amber/Orange shades
- Fonts: Inter (body), Poppins (display)

## Notes
- Backend runs on port 3001
- Contact form saves to messages.json
- Uses react-scroll for smooth navigation
