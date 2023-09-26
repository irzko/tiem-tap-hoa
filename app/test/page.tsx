"use client";
import React, { useState } from "react";

export default function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        image: selectedImages,
      }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div>
      <h1>Form Upload Ảnh</h1>
      <form onSubmit={handleSubmit}>
        <input name="image" type="file" accept="image/*" multiple />
        <button>Submit</button>
      </form>
    </div>
  );
}
