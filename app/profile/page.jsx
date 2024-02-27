"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }

    if (session?.user.id) fetchPosts();
  }, []);

  function handleEdit(post) {
    router.push(`/edit-prompt?id=${post._id}`);
  }

  async function handleDelete(post) {
    const isConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const filteredPosts = await res.json();
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="mb-16 w-full">
      <Profile
        name="My"
        desc="Welcome to your personalized profile page!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default MyProfile;
