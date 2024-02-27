"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, i) => (
        <PromptCard key={i} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts(query) {
      const res = await fetch(`/api/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      const data = await res.json();

      setPosts(data);
    }

    fetchPosts(searchText);
  }, [searchText]);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a username or tag..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
