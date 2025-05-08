'use client';

import React, { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type CommentData = {
    id: number;
    text: string;
    timestamp: string;
    timeValue: number; // days ago
};

const initialComments: CommentData[] = [
    { id: 1, text: "Comment 1 - Posted by: User", timestamp: "1 year ago", timeValue: 365 },
    { id: 2, text: "Comment 2 - Posted by: User", timestamp: "4 months ago", timeValue: 120 },
    { id: 3, text: "Comment 3 - Posted by: User", timestamp: "12 days ago", timeValue: 12 },
    { id: 4, text: "Comment 4 - Posted by: User", timestamp: "2 hours ago", timeValue: 0.08 },
    { id: 5, text: "Comment 5 - Posted by: User", timestamp: "14 minutes ago", timeValue: 0.01 },
    { id: 6, text: "Comment 6 - Posted by: User", timestamp: "just now", timeValue: 0 },
];

export default function CafeComments() {
    const [likes, setLikes] = useState<{ [key: number]: number }>({});
    const [filter, setFilter] = useState("all");
    const [comments, setComments] = useState<CommentData[]>(initialComments);

    // Load likes from localStorage
    useEffect(() => {
        const storedLikes = localStorage.getItem("likes");
        if (storedLikes) {
            setLikes(JSON.parse(storedLikes));
        }
    }, []);

    // Save likes to localStorage
    useEffect(() => {
        localStorage.setItem("likes", JSON.stringify(likes));
    }, [likes]);

    const handleLike = (id: number) => {
        setLikes((prev) => ({
            ...prev,
            [id]: (prev[id] || 444) + 1,
        }));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFilter(value);

        const sorted = [...initialComments].sort((a, b) => {
            if (value === "newest") return a.timeValue - b.timeValue;
            if (value === "oldest") return b.timeValue - a.timeValue;
            return 0;
        });

        setComments(sorted);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>
                <em>Cafe 1:</em>
            </h1>
            <div style={styles.filter}>
                Filter By:{" "}
                <select onChange={handleFilterChange} style={styles.select}>
                    <option value="all">All</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {comments.map((comment) => (
                <div key={comment.id} style={styles.card}>
                    <div style={styles.left}>
                        <button style={styles.imageBtn}>Image</button>
                        <div style={styles.likes}>
                            <button style={styles.likeBtn} onClick={() => handleLike(comment.id)}>👍</button>
                            <span>{likes[comment.id] ?? 444}</span>
                        </div>
                    </div>
                    <div style={styles.right}>
                        <p>{comment.text}</p>
                        <span style={styles.timestamp}>{comment.timestamp}</span>
                    </div>
                </div>
            ))}

            <div style={styles.pagination}>
                <button style={{ ...styles.page, ...styles.active }}>1</button>
                <button style={styles.page}>2</button>
                <button style={styles.page}>3</button>
                <button style={styles.page}>5</button>
                <button style={styles.page}>6</button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: "#e9ddbb",
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        color: "#fff",
    },
    heading: {
        color: "#4f5b43",
        fontStyle: "italic",
    },
    filter: {
        textAlign: "right",
        color: "#4f5b43",
        marginBottom: 20,
        fontStyle: "italic",
    },
    select: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
    },
    card: {
        backgroundColor: "#233218",
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        margin: "10px 0",
        borderRadius: 5,
    },
    left: {
        display: "flex",
        alignItems: "center",
        gap: 15,
    },
    imageBtn: {
        backgroundColor: "#1e2a13",
        color: "#fff",
        border: "none",
        padding: 10,
        borderRadius: 5,
    },
    likes: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#bfbfbf",
        color: "#000",
        padding: "5px 10px",
        borderRadius: 8,
        gap: 5,
    },
    likeBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1em",
    },
    right: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 20,
    },
    timestamp: {
        fontSize: "0.9em",
        color: "#c6c6c6",
        fontStyle: "italic",
    },
    pagination: {
        textAlign: "center",
        marginTop: 20,
    },
    page: {
        backgroundColor: "#2e3c1d",
        color: "#fff",
        border: "none",
        margin: "0 5px",
        padding: "8px 12px",
        borderRadius: 5,
        cursor: "pointer",
    },
    active: {
        backgroundColor: "#000",
    },
};
