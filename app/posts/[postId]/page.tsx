import { getPostData, getSortedPostsData } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

export function generateMetadata({ params }: { params: { postId: string } }) {
  // getSortedPostsData from lib logic file
  const posts = getSortedPostsData(); //deduped request we already got the data!
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  //   if no posts
  if (!post) {
    return {
      title: "Post not found!",
    };
  }

  return {
    title: post.title,
  };
}

// component
export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData(); //deduped request we already got the data!
  const { postId } = params;

  //   if no posts
  if (!posts.find((post) => post.id === postId)) {
    return notFound();
  }
  // getPostData from lib logic file
  const { title, date, contentHtml } = await getPostData(postId);
  const publishedDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{publishedDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }}></section>
        <p>
          <Link href="/">Back to Home</Link>
        </p>
      </article>
    </main>
  );
}
