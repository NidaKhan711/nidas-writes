
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: 'green' | 'red';
  image: string;
}
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Exploring the World of Web Development",
    excerpt: "Join me in diving through the ever-evolving landscape of web development, from frontend frameworks to backend architecture.",
    author: "Alex Johnson",
    date: "Apr 20, 2024",
    readTime: "5 min read",
    category: "Tech",
    categoryColor: "green",
    image: "/assets/images/book.jpg"
  },
  {
    id: 2,
    title: "The Art of Mindful Productivity",
    excerpt: "Discover strategies for enhancing productivity while maintaining a sense of balance and mindfulness in your daily routine.",
    author: "Sarah Chen",
    date: "Apr 18, 2024",
    readTime: "7 min read",
    category: "Self-growth",
    categoryColor: "red",
    image:  "/assets/images/book1.jpg"
  },
  {
    id: 3,
    title: "Reflections on Existential Philosophy",
    excerpt: "Delve into the depths of existential philosophy, and explore the fundamental questions of human existence and meaning.",
    author: "Dr. Marcus Webb",
    date: "Apr 15, 2024",
    readTime: "12 min read",
    category: "Philosophy",
    categoryColor: "green",
    image:  "/assets/images/book2.jpg"
  },
  {
    id: 4,
    title: "Building Scalable React Applications",
    excerpt: "Learn advanced patterns and techniques for creating maintainable and scalable React applications that stand the test of time.",
    author: "Emily Rodriguez",
    date: "Apr 12, 2024",
    readTime: "8 min read",
    category: "Tech",
    categoryColor: "green",
    image:  "/assets/images/book3.jpg"
  },
  {
    id: 5,
    title: "The Psychology of Creative Thinking",
    excerpt: "Understanding the mental processes behind creativity and how to cultivate innovative thinking in both personal and professional contexts.",
    author: "James Miller",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    category: "Self-growth",
    categoryColor: "red",
    image:  "/assets/images/book4.jpg"
  },
  {
    id: 6,
    title: "Modern Stoicism in Daily Life",
    excerpt: "Practical applications of stoic philosophy in contemporary living, exploring resilience, wisdom, and emotional regulation.",
    author: "Maria Santos",
    date: "Apr 08, 2024",
    readTime: "9 min read",
    category: "Philosophy",
    categoryColor: "green",
    image:  "/assets/images/book5.jpg"
  }
];
export default blogPosts;