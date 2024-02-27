"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Form from "@components/Form";

function EditPrompt() {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: "", tag: "" });

	function FormComp() {
		const searchParams = useSearchParams();
		const prompt_id = searchParams.get("id");

		useEffect(() => {
			async function getPromptData() {
				const res = await fetch(`/api/prompt/${prompt_id}`);
				const data = await res.json();
				setPost({ prompt: data.prompt, tag: data.tag });
			}

			if (prompt_id) getPromptData();
		}, [prompt_id]);

		return (
			<Form
				type='edit'
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={updatePrompt}
			/>
		);
	}

	async function updatePrompt(e) {
		e.preventDefault();
		setSubmitting(true);

		try {
			const res = await fetch(`/api/prompt/${prompt_id}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (res.ok) {
				router.push("/");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className='mb-16 w-full'>
			<Suspense fallback='Loading...'>
				<FormComp />
			</Suspense>
		</div>
	);
}

export default EditPrompt;
