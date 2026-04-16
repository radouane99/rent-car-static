import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs
      .map((doc) => doc.data().slug)
      .filter((slug) => slug !== undefined && slug !== null)
      .map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating static params for blog:", error);
    return [];
  }
}

async function getPost(slug: string) {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return querySnapshot.docs[0].data();
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
     return notFound();
  }

  return <BlogPostClient post={post as any} />;
}
