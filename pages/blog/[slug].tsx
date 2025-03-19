import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { parseEnv } from "util";

// Dummy blog data (Replace with a database or API)
const blogs = [
  { id: "1", title: "Understanding Next.js", slug: "understanding-nextjs", content: "Next.js is a React framework..." },
  { id: "2", title: "SEO Optimization in Next.js", slug: "seo-nextjs", content: "SEO in Next.js improves ranking by using SSR and SSG..." },
  { id: "3", title: "Using Prisma with Next.js", slug: "prisma-nextjs", content: "Prisma helps in managing databases efficiently..." },
];

export default function BlogPost({ post }: { post: typeof blogs[0] }) {
  const router = useRouter();
    console.log("postssksnjd",post)
  // Show loading state while page is generating
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Generate static paths for blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogs.map((post) => ({ params: { slug: post.slug } })),
    fallback: true, // Enables incremental static generation
  };
};

// Fetch post data based on the slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log("params",params)
  const post = blogs.find((p) => p.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, // Enable ISR (Incremental Static Regeneration)
  };
};
