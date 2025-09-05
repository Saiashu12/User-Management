import React, { useEffect, useState } from "react";
import { getUser, deleteUser } from "../services/api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(id).then(({ data }) => setUser(data));
  }, [id]);

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // ✅ Internal CSS Styles
  const styles = {
    page: {
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "20px",
      fontFamily: "Segoe UI, Arial, sans-serif"
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#222"
    },
    subtitle: {
      fontSize: "14px",
      color: "#666"
    },
    backLink: {
      textDecoration: "none",
      color: "#007bff",
      fontSize: "14px"
    },
    actionBtns: {
      display: "flex",
      gap: "10px"
    },
    editBtn: {
      padding: "8px 14px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer"
    },
    deleteBtn: {
      padding: "8px 14px",
      borderRadius: "6px",
      border: "none",
      background: "#dc3545",
      color: "#fff",
      cursor: "pointer"
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "280px 1fr",
      gap: "20px"
    },
    profileCard: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      textAlign: "center"
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0 auto 15px"
    },
    name: { fontSize: "20px", fontWeight: "600", marginBottom: "8px" },
    badge: {
      display: "inline-block",
      background: "#f3f4f6",
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "12px",
      marginBottom: "15px"
    },
    profileInfo: {
      textAlign: "left",
      fontSize: "14px",
      color: "#555",
      marginTop: "10px"
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      marginBottom: "20px"
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px"
    },
    label: { fontSize: "13px", color: "#666", marginBottom: "4px" },
    value: { fontSize: "14px", fontWeight: "500", color: "#111" }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      navigate("/");
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <Link to="/" style={styles.backLink}>⬅ Back to Dashboard</Link>
          <h2 style={styles.title}>User Details</h2>
          <p style={styles.subtitle}>View user information</p>
        </div>
        <div style={styles.actionBtns}>
          <button style={styles.editBtn} onClick={() => navigate(`/edit/${id}`)}>✏️ Edit</button>
          <button style={styles.deleteBtn} onClick={handleDelete}>🗑 Delete</button>
        </div>
      </div>

      {/* Layout */}
      <div style={styles.layout}>
        {/* Left Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>{user.name.charAt(0)}</div>
          <h3 style={styles.name}>{user.name}</h3>
          <span style={styles.badge}>{user.company}</span>
          <div style={styles.profileInfo}>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🏢 {user.company}</p>
          </div>
        </div>

        {/* Right Info Cards */}
        <div>
          {/* Contact Info */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>📇 Contact Information</h4>
            <div style={styles.grid2}>
              <div>
                <div style={styles.label}>Full Name</div>
                <div style={styles.value}>{user.name}</div>
              </div>
              <div>
                <div style={styles.label}>Email Address</div>
                <div style={styles.value}>{user.email}</div>
              </div>
              <div>
                <div style={styles.label}>Phone Number</div>
                <div style={styles.value}>{user.phone}</div>
              </div>
              <div>
                <div style={styles.label}>Company</div>
                <div style={styles.value}>{user.company}</div>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>📍 Address Information</h4>
            <div style={styles.grid2}>
              <div>
                <div style={styles.label}>Street Address</div>
                <div style={styles.value}>{user.address.street}</div>
              </div>
              <div>
                <div style={styles.label}>City</div>
                <div style={styles.value}>{user.address.city}</div>
              </div>
              <div>
                <div style={styles.label}>Zip Code</div>
                <div style={styles.value}>{user.address.zipcode}</div>
              </div>
              <div>
                <div style={styles.label}>Full Address</div>
                <div style={styles.value}>
                  {user.address.street}, {user.address.city}, {user.address.zipcode}
                </div>
              </div>
            </div>
          </div>

          {/* Geo Info */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>🌐 Geographic Coordinates</h4>
            <div style={styles.grid2}>
              <div>
                <div style={styles.label}>Latitude</div>
                <div style={styles.value}>{user.address.geo.lat}</div>
              </div>
              <div>
                <div style={styles.label}>Longitude</div>
                <div style={styles.value}>{user.address.geo.lng}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
