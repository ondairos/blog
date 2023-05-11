import { getSortedPostsData } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";

export function generateMetadata({ params }: { params: { postId: string } }) {
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

  return (
    <div>
      <p></p>
    </div>
  );
}
