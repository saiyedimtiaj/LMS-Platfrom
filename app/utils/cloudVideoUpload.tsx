import axios from "axios";
import React from "react";

export const cloudVideoUpload = (
    e: React.FormEvent<HTMLInputElement> | React.DragEvent<HTMLInputElement>,
    setProgressBar: React.Dispatch<React.SetStateAction<number | null>>,
    setVideoFileName: React.Dispatch<React.SetStateAction<string>>
): Promise<string | null> => {
    let file: File | null = null;

    // Handle file from input event
    if ('files' in e.target) {
        const inputElement = e.target as HTMLInputElement;
        file = inputElement.files?.[0] || null;
    }

    if ('dataTransfer' in e) {
        const dragEvent = e as React.DragEvent<HTMLInputElement>;
        file = dragEvent.dataTransfer.files?.[0] || null;
    }

    if (!file) return Promise.resolve(null);

    setVideoFileName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(0)}mb)`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "od7lpeqi");

    return axios.post(`https://api.cloudinary.com/v1_1/ddhb3f9rg/image/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (event: any) => {
            setProgressBar(Math.round((100 * event.loaded) / event.total));
        }
    })
        .then((res: any) => {
            setProgressBar(null);
            return res.data.secure_url; // Return the secure URL
        })
        .catch((err: any) => {
            setProgressBar(null);
            console.error("Error uploading the video: ", err.response?.data?.error?.message || err.message);
            return null; // Return null if there's an error
        });
};
