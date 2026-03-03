function PostSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* Title */}
      <div
        style={{
          background: "#e2e8f0",
          height: "24px",
          width: "60%",
          borderRadius: "4px",
          marginBottom: "1rem",
        }}
      ></div>

      {/* Body 1 */}
      <div
        style={{
          background: "#e2e8f0",
          height: "16px",
          width: "100%",
          borderRadius: "4px",
          marginBottom: "0.5rem",
        }}
      ></div>

      {/* Body 2 */}
      <div
        style={{
          background: "#e2e8f0",
          height: "16px",
          width: "90%",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
}

export default PostSkeleton;
