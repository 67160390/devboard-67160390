function UserCard({ name, email }) {
  // ดึงตัวอักษรแรกมาทำ avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  //task1 challenge2
  let avatarColor = name.charCodeAt(0) % 3;

  switch (avatarColor) {
    case 0:
      avatarColor = "#1e40af"; // Blue
      break;
    case 1:
      avatarColor = "#059669"; // Green
      break;
    case 2:
      avatarColor = "#7c3aed"; // Purple
      break;
    default:
      avatarColor = "#1e40af"; // Default to Blue
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: avatarColor,
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
