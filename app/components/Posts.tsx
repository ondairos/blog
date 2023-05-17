"use client";

import React, { useState } from "react";
import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";

export default function Posts() {
  const [searchQuery, setSearchQuery] = useState("");
  // getting right away, not gonna use async await
  const posts = getSortedPostsData();
  return (
    <section className="mt-6 mx-auto max-2-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Posts</h2>
      <ul className="w-full">
        {posts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
