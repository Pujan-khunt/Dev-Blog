---
title: "Building a Modern Technical Blog with Astro and Tailwind CSS v4"
description: "A comprehensive guide to building a developer blog with Astro 5, Tailwind CSS v4, and a custom design system featuring dark mode, typography, and automated features."
summary: "This in-depth technical walkthrough covers everything from setting up Astro with Tailwind CSS v4 to implementing dark mode, automatic table of contents, reading time estimation, and a beautiful typography system for your developer blog."
publishedDate: 2024-12-15
updatedDate: 2025-01-05
heroImage:
  src: "/images/technical-blog-design.png"
  alt: "Technical blog design showcase with orange and blue color scheme"
isDraft: false
tags: ["astro", "tailwindcss", "web-development", "tutorial", "design-system"]
author:
  name: "Pujan"
  bio: "Full-stack developer passionate about building beautiful, performant web applications. When not coding, you'll find me exploring new technologies and sharing knowledge with the developer community."
  avatar: "/images/avatar.png"
  socials:
    twitter: "https://twitter.com/pujan"
    github: "https://github.com/pujan"
    website: "https://pujan.dev"
---

# Introduction

Welcome to this comprehensive guide on building a modern technical blog from scratch. In this post, we'll explore how to create a professional developer blog that not only looks stunning but also provides an exceptional reading experience for your audience.

Building a blog might seem like a simple task, but when you factor in performance, accessibility, design consistency, and developer experience, it becomes a fascinating journey of architectural decisions and technical exploration.

## What We'll Cover

In this detailed guide, we'll walk through:

1. **Setting up Astro with Tailwind CSS v4** - The foundation of our modern tech stack
2. **Creating a Design System** - Building a cohesive visual identity
3. **Implementing Dark Mode** - Because developers love dark themes
4. **Typography and Readability** - Making content a pleasure to read
5. **Automated Features** - TOC, reading time, and author bios
6. **Code Examples** - Because this is a technical blog, after all

Let's dive in and explore each of these topics in depth.

---

# Setting Up the Foundation

The first step in building any modern web application is establishing a solid foundation. For our technical blog, we've chosen **Astro 5** as our framework and **Tailwind CSS v4** for styling.

## Why Astro?

Astro has gained significant popularity among developers, and for good reason. It offers several compelling advantages:

### Performance-First Architecture

Astro uses a unique "island architecture" that ships zero JavaScript to the client by default. This means your blog loads instantly, even on slow connections. The static HTML generation ensures that your content is pre-rendered at build time, providing the fastest possible Time to First Byte (TTFB).

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  publishedDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  author: z
    .object({
      name: z.string(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
    })
    .optional(),
});

export const collections = {
  blog: defineCollection({ type: "content", schema: blogSchema }),
};
```

The configuration above shows how Astro's Content Collections provide type-safe access to your markdown files. The `z.object()` schema ensures that every blog post has the required fields, catching errors at build time rather than runtime.

### Developer Experience

Astro's developer experience is exceptional. Hot module replacement (HMR) works flawlessly, and the error messages are genuinely helpful. When you make a mistake, Astro tells you exactly what's wrong and often suggests how to fix it.

> "The best code is the code you don't have to write. Astro's zero-JS-by-default approach means you focus on what matters: your content."

## Why Tailwind CSS v4?

Tailwind CSS v4 represents a paradigm shift from previous versions. Instead of a configuration file, it uses a CSS-first approach that feels more natural and intuitive.

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-primary: #ff9900;
  --color-secondary: #004e66;
  --color-bg: #ffffff;
  --font-sans: "Inter", sans-serif;
}
```

This approach offers several benefits:

1. **No configuration files to manage** - Everything lives in your CSS
2. **Better CSS custom properties support** - Native dark mode handling
3. **Improved performance** - Smaller CSS bundles through better tree-shaking
4. **IntelliSense integration** - Your editor understands your custom theme

---

# Creating a Design System

A design system is more than just a color palette. It's a comprehensive set of standards, guidelines, and components that ensure visual and functional consistency across your application.

## Color Palette Selection

For our technical blog, we've chosen a color palette that balances aesthetics with readability:

| Color Role | Hex Code  | Usage                           |
| ---------- | --------- | ------------------------------- |
| Primary    | `#FF9900` | Links, accents, emphasis        |
| Secondary  | `#004E66` | Headings, borders, navigation   |
| Background | `#FFFFFF` | Primary background (light mode) |
| Text       | `#1A1A1A` | Primary text content            |
| Muted      | `#6B7280` | Metadata, secondary text        |

The orange primary color (`#FF9900`) provides excellent contrast against dark backgrounds while remaining visually appealing. It's often associated with creativity and energy, making it perfect for highlighting important information.

The blue-black secondary color (`#004E66`) offers a professional, technical feel. It pairs beautifully with orange, creating a complementary color scheme that's both modern and timeless.

## Typography System

Typography is arguably the most important element of a blog. After extensive consideration, we've chosen **Inter** as our primary typeface. Inter was specifically designed for computer screens, offering excellent readability at all sizes.

### Type Scale

Our type scale follows a mathematical progression for visual harmony:

| Element | Size            | Weight | Line Height |
| ------- | --------------- | ------ | ----------- |
| H1      | 2.5rem (40px)   | 700    | 1.2         |
| H2      | 2rem (32px)     | 700    | 1.3         |
| H3      | 1.5rem (24px)   | 600    | 1.4         |
| Body    | 1rem (16px)     | 400    | 1.6         |
| Small   | 0.875rem (14px) | 400    | 1.5         |

The generous line height (1.6 for body text) ensures comfortable reading, especially for longer-form content. This is particularly important for technical blogs where code examples and detailed explanations are common.

---

# Implementing Dark Mode

Dark mode has become an expected feature in modern web applications. For developers, it's practically essential. Let's explore how we implemented a robust dark mode system.

## The CSS-First Approach

With Tailwind CSS v4, implementing dark mode is surprisingly elegant:

```css
@layer base {
  html {
    @apply antialiased;
  }

  body {
    @apply bg-bg text-text transition-colors duration-300;
  }

  html.dark body {
    @apply bg-[#0F172A] text-gray-100;
  }
}
```

This approach uses CSS custom properties (through Tailwind's theme system) to define color mappings. When the `dark` class is added to the `<html>` element, the color mappings automatically update.

## Preventing Flash of Unstyled Content (FOUC)

One common issue with dark mode implementations is the "flash" that occurs before JavaScript executes. We've solved this with an inline script in the `<head>`:

```html
<script is:inline>
  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  window.localStorage.setItem("theme", theme);
</script>
```

This script:

1. Checks `localStorage` for a user preference
2. Falls back to system preference if no stored preference exists
3. Applies the appropriate class before any content renders
4. Stores the preference for future visits

## Dark Mode Color Palette

For dark mode, we've adjusted our colors to maintain readability while reducing eye strain:

| Color Role | Light Mode | Dark Mode |
| ---------- | ---------- | --------- |
| Background | `#FFFFFF`  | `#0F172A` |
| Text       | `#1A1A1A`  | `#F1F5F9` |
| Primary    | `#FF9900`  | `#FFB84D` |
| Secondary  | `#004E66`  | `#66B2CC` |

The darker primary color in dark mode (`#FFB84D`) provides better contrast against the dark background, while the lighter secondary color (`#66B2CC`) maintains the visual hierarchy without being too harsh.

---

# Typography and Prose Styling

The heart of any blog is its content. We've invested significant effort in creating a typography system that makes reading a pleasure, regardless of article length.

## The Typography Plugin

Tailwind's Typography plugin provides an excellent foundation for prose content:

```css
@utility prose-custom {
  --tw-prose-body: var(--color-text);
  --tw-prose-headings: var(--color-secondary);
  --tw-prose-links: var(--color-primary);
  --tw-prose-code: var(--color-primary);
  --tw-prose-pre-bg: #1e1e1e;
  max-width: none;
}
```

This custom utility class applies our color palette to all typographic elements within prose content. By setting `max-width: none`, we allow the prose container to span the full width of its parent, giving us more layout flexibility.

## Code Block Styling

As a technical blog, code blocks are essential. We've styled them to be both beautiful and functional:

```typescript
interface BlogPost {
  title: string;
  description: string;
  publishedDate: Date;
  tags: string[];
  author: Author;
}

interface Author {
  name: string;
  bio: string;
  avatar: string;
}

function createBlogPost(post: BlogPost): HTMLArticleElement {
  const article = document.createElement("article");
  article.className = "prose-custom";

  const header = document.createElement("header");
  header.innerHTML = `
    <h1>${post.title}</h1>
    <p class="description">${post.description}</p>
  `;

  article.appendChild(header);
  return article;
}
```

The code blocks feature:

- **Dark background** (`#1E1E1E`) for excellent contrast
- **Orange syntax highlighting** matching our primary color
- **Rounded corners** for a modern look
- **Overflow handling** for long lines
- **Copy button** (implementation left as an exercise)

---

# Automated Features

One of the advantages of building your own blog is the ability to automate tedious tasks. Let's explore some of the automated features we've implemented.

## Automatic Table of Contents

A well-structured table of contents (TOC) helps readers navigate long articles. With Astro, generating a TOC is remarkably simple:

```typescript
const { Content, headings } = await entry.render();

// Headings are automatically extracted from markdown
const toc = headings.filter((h) => h.depth <= 3);
```

The `headings` array contains all headings from the markdown content, including their depth level. We filter to only include h2 and h3 elements to keep the TOC manageable.

### TOC Component Features

Our TOC component includes:

1. **Sticky positioning** - Stays visible while scrolling
2. **Active state highlighting** - Shows which section is currently in view
3. **Smooth scrolling** - When clicking a link, the page scrolls smoothly
4. **Depth-based indentation** - Visual hierarchy at a glance
5. **Mobile consideration** - Hidden on small screens (expandable via drawer)

## Reading Time Estimation

Reading time is a valuable metric for readers deciding whether to commit to an article. We calculate it using a simple formula:

```typescript
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
```

This function:

1. Counts the words in the article
2. Divides by average reading speed (200 WPM)
3. Rounds up to the nearest minute
4. Returns a formatted string

For this article, the estimated reading time is approximately **15-20 minutes**.

---

# Advanced Layout Techniques

Now let's explore some of the more advanced layout techniques we've employed.

## Grid-Based Layout

Our blog post layout uses CSS Grid to create a sophisticated structure:

```css
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 3rem;
  max-width: 1152px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }
}
```

This creates a two-column layout on desktop:

- **Main content** - Takes up the majority of the width
- **TOC sidebar** - Fixed 280px width on the right

On mobile and tablet, the layout collapses to a single column, with the TOC becoming accessible through a drawer or collapsible element.

## Responsive Typography

Typography must adapt to different screen sizes. We use fluid typography and responsive utility classes:

```html
<h1 class="text-3xl sm:text-4xl font-bold text-secondary dark:text-primary">
  {post.title}
</h1>
```

This ensures:

- 3rem (48px) on small screens
- 4rem (64px) on medium and larger screens
- Responsive text color based on dark mode state

---

# Component Architecture

Let's examine some of the key components that make up our blog.

## Author Bio Component

The author bio helps readers connect with the content creator:

```astro
---
interface Props {
  author: {
    name: string;
    bio?: string;
    avatar?: string;
    socials?: {
      twitter?: string;
      github?: string;
      website?: string;
    };
  };
}

const { author } = Astro.props;
---

<footer class="author-bio">
  <img src={author.avatar} alt={author.name} class="avatar" />
  <div class="content">
    <h3>{author.name}</h3>
    <p>{author.bio}</p>
    <div class="socials">
      <!-- Social links -->
    </div>
  </div>
</footer>
```

The author bio features:

- Circular avatar with proper aspect ratio
- Clean typography for name and bio
- Social media links with hover effects
- Consistent styling with the rest of the design

## Theme Toggle Component

The theme toggle allows users to switch between light and dark modes:

```astro
<button id="theme-toggle" aria-label="Toggle dark mode">
  <svg class="sun-icon dark:hidden">...</svg>
  <svg class="moon-icon hidden dark:block">...</svg>
</button>
```

Using Tailwind's `dark:` modifier, we can conditionally show/hide icons based on the current theme. The SVG icons provide clear visual feedback.

---

# Performance Optimization

A fast website is essential for both user experience and SEO. Here are some of the performance optimizations we've implemented:

## Image Optimization

We use Astro's built-in `<Image />` component for automatic image optimization:

```astro
<Image
  src={post.heroImage.src}
  alt={post.heroImage.alt}
  width={1024}
  height={576}
  class="w-full h-auto rounded-xl object-cover aspect-video"
/>
```

This component:

1. **Converts images** to WebP/AVIF automatically
2. **Generates srcset** for responsive images
3. **Enforces aspect ratio** to prevent layout shifts
4. **Lazy loads** images below the fold

## Minimal JavaScript

By default, Astro ships zero JavaScript. We only include scripts where necessary:

- **Theme toggle** - Required for interactivity
- **TOC active state** - Optional enhancement

This approach results in near-instant page loads, even on slow connections.

---

# Accessibility Considerations

A truly professional blog must be accessible to all users. Here are the accessibility features we've implemented:

## Semantic HTML

We use proper semantic elements throughout:

- `<main>` for primary content
- `<nav>` for navigation
- `<article>` for blog posts
- `<aside>` for supplementary content
- `<footer>` for footers

## ARIA Attributes

Interactive elements include appropriate ARIA attributes:

```html
<button
  id="theme-toggle"
  aria-label="Toggle dark mode"
  aria-pressed="false"
></button>
```

The `aria-pressed` attribute communicates the toggle state to screen readers.

## Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- Primary orange on white: 4.5:1+ ratio
- Secondary blue on white: 7:1+ ratio
- Text on dark backgrounds: 7:1+ ratio

---

# Future Enhancements

While our blog is functional and beautiful, there's always room for improvement. Here are some features we're considering for the future:

## Planned Features

1. **Search functionality** - Full-text search across all articles
2. **RSS feed** - For RSS readers and newsletter integration
3. **Comments system** - For reader engagement
4. **Newsletter signup** - To build an audience
5. **Related posts** - Based on tags and content similarity
6. **Code playground** - Interactive code examples
7. **Mascot with tooltips** - As discussed earlier!

## Potential Improvements

- **View transitions** - Smooth page navigation
- **Progressive enhancement** - Offline support via service workers
- **Analytics** - Understanding reader behavior
- **A/B testing** - Optimizing for engagement

---

# Conclusion

Building a technical blog from scratch is a rewarding journey. It teaches you about modern web development, design systems, and the importance of user experience.

In this comprehensive guide, we've covered:

- **Astro and Tailwind CSS v4 setup** - A powerful, modern tech stack
- **Design system creation** - Cohesive visuals and typography
- **Dark mode implementation** - With FOUC prevention
- **Typography and prose** - Optimized for readability
- **Automated features** - TOC and reading time
- **Component architecture** - Reusable, maintainable code
- **Performance optimization** - Fast, efficient websites
- **Accessibility** - Inclusive design practices

The result is a blog that not only looks professional but also provides an exceptional reading experience. The decoupled URL structure means you can change titles without breaking links, and the automated features reduce maintenance overhead.

We hope this guide inspires you to build your own blog or improve an existing one. The web needs more thoughtful, well-designed technical content, and now you have the tools to create it.

Happy coding!

---

## Quick Reference

### Useful Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Format code
pnpm format
```

### File Structure

```
src/
├── content/
│   └── blog/           # Markdown blog posts
├── components/
│   ├── AuthorBio.astro
│   ├── TableOfContents.astro
│   └── ThemeToggle.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── blog/
│       └── [...slug].astro
└── styles/
    └── global.css
```

### Color Palette Summary

| Role            | Hex       | Usage                 |
| --------------- | --------- | --------------------- |
| Primary         | `#FF9900` | Accents, links, icons |
| Secondary       | `#004E66` | Headings, borders     |
| Dark Background | `#0F172A` | Dark mode background  |

---

_Last updated: January 5, 2025_
