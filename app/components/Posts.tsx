"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";

export default function Posts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  // getting right away, not gonna use async await
  // const posts = getSortedPostsData();

  useEffect(() => {
    const fetchPostsData = async () => {
      const data = await getSortedPostsData();
      setPosts(data);
    };

    fetchPostsData();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handeSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="mt-6 mx-auto max-2-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Posts</h2>
      <input
        type="text"
        placeholder="Search posts"
        value={searchQuery}
        onChange={handeSearchChange}
        className="mt-4 px-2 py-1 border border-gray-300 rounded"
      />
      <ul className="w-full">
        {filteredPosts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
