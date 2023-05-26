"use client";
import React, { useState, useEffect } from "react";
import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPostsData();
  }, []);

  const fetchPostsData = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const filteredPosts = posts.filter((post: BlogPost) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="mt-6 mx-auto max-2-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Posts</h2>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search posts by title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
      </div>
      <ul className="w-full">
        {filteredPosts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
