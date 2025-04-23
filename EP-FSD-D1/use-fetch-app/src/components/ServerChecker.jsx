import React from "react";
import { useFetch } from "../hooks/useFetch";

const ServerChecker = () => {
    const { data, loading, error, refetch } = useFetch(
        "https://jsonplaceholder.typicode.com/posts/1"
    );

    return (
        <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
            <h2>Server Checker</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}

            {data && (
                <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
                    <h3>{data.title}</h3>
                    <p>{data.body}</p>
                </div>
            )}

            <button onClick={refetch} style={{ marginTop: "1rem" }}>
                🔄 Refetch (Bypass Cache)
            </button>
        </div>
    );
};

export default ServerChecker;
