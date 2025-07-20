# Personal Blog - Bhavik Makwana

A modern, responsive personal blog built with HTML, CSS, and JavaScript. Features categorization for different types of content including tech, photography, and learning.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Category Filtering**: Filter posts by category (Tech, Photography, Learning)
- **Modern UI**: Beautiful gradient design with smooth animations
- **Modal Posts**: Click on any post to view full content in a modal
- **Interactive Navigation**: Smooth scrolling and mobile-friendly navigation
- **Post Statistics**: Dynamic post counts for each category
- **Search Ready**: Built-in search functionality (can be enabled)

## File Structure

```
bhavik-makwana.github.io/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This fi]le
```

## How to Use

1. **Open the blog**: Simply open `index.html` in your web browser
2. **Navigate**: Use the navigation menu to jump to different sections
3. **Filter posts**: Click on category cards or filter buttons to view specific content
4. **Read posts**: Click on any post card to open the full article in a modal
5. **Mobile**: The site is fully responsive - try resizing your browser window

## Customization

### Adding New Posts

To add a new blog post, edit the `blogPosts` array in `script.js`:

```javascript
{
    id: 7, // Unique ID
    title: "Your Post Title",
    excerpt: "Brief description of your post",
    content: `
        <h2>Your Content</h2>
        <p>Your full post content with HTML formatting...</p>
    `,
    category: "tech", // "tech", "photography", or "learning"
    date: "2024-01-25",
    readTime: "5 min read",
    icon: "fas fa-code" // FontAwesome icon class
}
```

### Changing Categories

To modify categories, update both the HTML and JavaScript:

1. **HTML**: Update category cards in `index.html`
2. **CSS**: Update category-specific styles in `styles.css`
3. **JavaScript**: Update the `blogPosts` array and filter logic in `script.js`

### Styling

The blog uses a modern gradient color scheme. To change colors, update the CSS variables in `styles.css`:

```css
/* Main gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Enabling Search

To enable search functionality, uncomment the last line in `script.js`:

```javascript
// Uncomment the line below to add search functionality
addSearchFunctionality();
```

## Sample Content

The blog comes with 6 sample posts across three categories:

### Tech Posts
- Getting Started with React Hooks
- Building a REST API with Node.js

### Photography Posts
- Photography Tips for Beginners
- Street Photography in Urban Environments

### Learning Posts
- Learning How to Learn
- The Power of Habit Formation

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Lightweight and fast loading
- No external dependencies (except FontAwesome icons)
- Optimized for modern browsers
- Smooth animations and transitions

## Deployment

This blog can be deployed to:
- GitHub Pages (recommended for personal blogs)
- Netlify
- Vercel
- Any static hosting service

For GitHub Pages, simply push your files to a repository and enable GitHub Pages in the repository settings.

## Future Enhancements

Potential features you could add:
- Dark mode toggle
- RSS feed
- Comments system
- Social sharing buttons
- Related posts
- Tags system
- Archive page
- Contact form

## License

This project is open source and available under the MIT License.

---

Built with ❤️ and lots of coffee by Bhavik Makwana 