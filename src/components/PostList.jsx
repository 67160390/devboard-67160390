import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  /* task3 challenge2 */
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* task2 challenge2 */
  const [sortOrder, setSortOrder] = useState("desc");
  const sortedPosts = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id,
  );
  /* task3 challenge2 */
  // คำนวณ Pagination จากข้อมูลที่กรองแล้ว
  const totalPages = Math.ceil(filtered.length / postsPerPage); // Math.ceil(): เป็นการ "ปัดเศษขึ้น"
  const indexOfLastPost = currentPage * postsPerPage; // ถ้าอยู่ หน้า 1: 1 * 10 = 10 (ตัวสุดท้ายคือ index ที่ 10)
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // ถ้าอยู่ หน้า 1: 10 - 10 = 0 (เริ่มดึงตั้งแต่ index ที่ 0)

  // ตัดเฉพาะข้อมูลที่จะแสดงในหน้านั้นๆ
  const currentItems = sortedPosts.slice(indexOfFirstPost, indexOfLastPost); // ถ้าอยู่ หน้า 1: จะดึงข้อมูล Index ที่ 0-9

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      {/* task1 challenge1 */}
      <PostCount count={filtered.length} />

      {/* task2 challenge2 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          margin: "0.5rem 0",
        }}
      >
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          style={{
            padding: "0.4rem 1rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            background: "#f1f5f9",
            color: "#1e293b",
            fontWeight: "bold",
            cursor: "pointer",
            outline: "none",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          aria-label={sortOrder === "desc" ? "ใหม่สุดก่อน" : "เก่าสุดก่อน"}
        >
          {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}

          {/* task3 challenge1 */}
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={fetchPosts}
          style={{
            padding: "0.4rem 1rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            background: "#e0e7ef",
            color: "#1e293b",
            fontWeight: "bold",
            cursor: "pointer",
            outline: "none",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          aria-label="โหลดใหม่"
        >
          🔄 โหลดใหม่
        </button>
      </div>

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

      {/* task3 challenge2 */}
      {/* รายการโพสต์ (ใช้ข้อมูลที่ slice แล้ว) */}
      {currentItems.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ (เรียงตาม sortOrder) */}
      {currentItems.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          post={post}
          isFavorite={(favorites || []).includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
      {/* Pagination Button ปุ่มเปลี่ยนหน้า */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ← ก่อนหน้า
        </button>

        <span>
          หน้า {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ถัดไป →
        </button>
      </div>

      {/* task1 challenge3 */}
      {posts.length === 0 && <PostSkeleton />}
    </div>
  );
}

export default PostList;
