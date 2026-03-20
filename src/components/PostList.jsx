import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* task2 challenge2 */
  const [sortOrder, setSortOrder] = useState("desc");
  const sortedPosts = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id,
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      {/* task1 challenge1 */}
      <PostCount count={posts.length} />

      {/* task2 challenge2 */}
      <button
        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        style={{
          margin: "0.5rem 0",
          padding: "0.4rem 1rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          background: "#f1f5f9",
          color: "#1e293b",
          fontWeight: "bold",
          cursor: "pointer",
          outline: "none",
        }}
        aria-label={sortOrder === "desc" ? "ใหม่สุดก่อน" : "เก่าสุดก่อน"}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ (เรียงตาม sortOrder) */}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}

      {/* task1 challenge3 */}
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))
      )}
    </div>
  );
}

export default PostList;
