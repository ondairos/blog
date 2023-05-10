import React from "react";
import { getSortedPostsData } from "@/lib/posts";

export default function Posts() {
  // getting right away, not gonna use async await
  const posts = getSortedPostsData();
  return (
    <section className="mt-6 mx-auto max-2-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
      <ul className="w-full">{posts.map((post) => JSON.stringify(post))}</ul>
    </section>
  );
}
