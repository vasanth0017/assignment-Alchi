import Link from "next/link";

// data/blogs.ts
const blogs = [
    { id: "1", title: "Understanding Next.js", slug: "understanding-nextjs" },
    { id: "2", title: "SEO Optimization in Next.js", slug: "seo-nextjs" },
    { id: "3", title: "Using Prisma with Next.js", slug: "prisma-nextjs" },
  ];
  
export default function BlogList() {
  return (
    <div className="mt-8 text-white px-4">
      <h2 className="text-2xl font-bold">Latest Blogs</h2>
      <ul className="mt-4 space-y-2">
        {blogs.map((post) => (
          <li key={post.id} className="border-b border-gray-600 pb-2">
            <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
