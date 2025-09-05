import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  // ✅ Internal CSS Styles
  const styles = {
    page: {
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "20px",
      fontFamily: "Segoe UI, Arial, sans-serif"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px"
    },
    titleBox: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      margin: 0
    },
    subtitle: {
      fontSize: "14px",
      color: "#6b7280"
    },
    addBtn: {
      background: "#000",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px"
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px"
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600"
    },
    badge: {
      background: "#f3f4f6",
      color: "#444",
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "12px"
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#6b7280"
    },
    emptyIcon: {
      fontSize: "40px",
      color: "#9ca3af",
      marginBottom: "10px"
    },
    emptyTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111"
    },
    emptySubtitle: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "20px"
    },
    emptyBtn: {
      background: "#000",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      textDecoration: "none"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    th: {
      borderBottom: "2px solid #eee",
      padding: "12px",
      textAlign: "left",
      fontSize: "14px",
      color: "#444"
    },
    td: {
      borderBottom: "1px solid #f3f4f6",
      padding: "12px",
      fontSize: "14px"
    },
    actionBtn: {
      marginRight: "8px",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      cursor: "pointer",
      border: "none",
      fontWeight: "600"
    },
    viewBtn: { background: "#2563eb", color: "#fff" },
    editBtn: { background: "#facc15", color: "#111" },
    deleteBtn: { background: "#dc2626", color: "#fff" }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.titleBox}>
            <span style={{ fontSize: "22px", color: "#2563eb" }}>👥</span>
            <h2 style={styles.title}>User Management Dashboard</h2>
          </div>
          <p style={styles.subtitle}>
            Manage and organize user information
          </p>
        </div>
        <Link to="/create" style={styles.addBtn}>
          ➕ Add New User
        </Link>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>All Users</h3>
          <span style={styles.badge}>{users.length} total</span>
        </div>

        {users.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👥</div>
            <div style={styles.emptyTitle}>No users found</div>
            <div style={styles.emptySubtitle}>
              Get started by adding your first user.
            </div>
            <Link to="/create" style={styles.emptyBtn}>
              Add Your First User
            </Link>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone}</td>
                  <td style={styles.td}>
                    <Link
                      to={`/user/${user._id}`}
                      style={{ ...styles.actionBtn, ...styles.viewBtn }}
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${user._id}`}
                      style={{ ...styles.actionBtn, ...styles.editBtn }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
