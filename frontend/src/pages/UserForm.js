import React, { useState, useEffect } from "react";
import { createUser, getUser, updateUser } from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" }
    }
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [hoverBack, setHoverBack] = useState(false); // ✅ Hover state

  useEffect(() => {
    if (id) {
      getUser(id).then(({ data }) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child, subChild] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subChild
            ? { ...prev[parent][child], [subChild]: value }
            : value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name & Email required");
    if (id) await updateUser(id, form);
    else await createUser(form);
    navigate("/");
  };

  // ✅ Internal CSS for exact match
  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      background: "#f9fafb",
      minHeight: "100vh",
      padding: "40px"
    },
    container: {
      maxWidth: "900px",
      width: "100%",
      background: "#fff",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      fontFamily: "Segoe UI, Arial, sans-serif"
    },
    backLink: {
      textDecoration: "none",
      color: "#111",
      fontSize: "14px",
      display: "inline-block",
      // marginBottom: "5px",
      padding: "0px 10px",
      borderRadius: "6px",
      transition: "all 0.2s ease-in-out",
      ...(hoverBack ? { background: "#f3f4f6", color: "#000" } : {}) // ✅ hover style
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "2px"
    },
    subtitle: {
      textAlign: "center",
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "30px"
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: "20px 0 10px",
      color: "#111"
    },
    form: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px"
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      color: "#111"
    },
    input: {
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      background: "#f9fafb",
      fontSize: "14px",
      outline: "none"
    },
    fullWidth: {
      gridColumn: "span 2"
    },
    btnRow: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "16px",
      marginTop: "25px",
      gridColumn: "span 2"
    },
    primaryBtn: {
      padding: "12px 20px",
      borderRadius: "8px",
      border: "none",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      background: "#000",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    cancelBtn: {
      padding: "12px 20px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      background: "#fff",
      color: "#111"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ✅ Back Link with hover */}
        <Link
          to="/"
          style={styles.backLink}
          onMouseEnter={() => setHoverBack(true)}
          onMouseLeave={() => setHoverBack(false)}
        >
          ⬅ Back to Dashboard
        </Link>

        <h2 style={styles.title}>{id ? "Update User" : "Add New User"}</h2>
        <p style={styles.subtitle}>Enter user information below</p>

        {/* User Info Section */}
        <h3 style={styles.sectionTitle}>User Information</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name *</label>
            <input style={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input style={styles.input} name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone *</label>
            <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Company *</label>
            <input style={styles.input} name="company" value={form.company} onChange={handleChange} placeholder="Enter company name" />
          </div>

          {/* Address Section */}
          <h3 style={{ ...styles.sectionTitle, gridColumn: "span 2" }}>Address Information</h3>
          <div style={{ ...styles.inputGroup, ...styles.fullWidth }}>
            <label style={styles.label}>Street Address *</label>
            <input style={styles.input} name="address.street" value={form.address.street} onChange={handleChange} placeholder="Enter street address" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>City *</label>
            <input style={styles.input} name="address.city" value={form.address.city} onChange={handleChange} placeholder="Enter city" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Zip Code *</label>
            <input style={styles.input} name="address.zipcode" value={form.address.zipcode} onChange={handleChange} placeholder="Enter zip code" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Latitude *</label>
            <input style={styles.input} name="address.geo.lat" value={form.address.geo.lat} onChange={handleChange} placeholder="e.g., 40.7128" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Longitude *</label>
            <input style={styles.input} name="address.geo.lng" value={form.address.geo.lng} onChange={handleChange} placeholder="e.g., -74.0060" />
          </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button type="submit" style={styles.primaryBtn}>
              🗂 {id ? "Update User" : "Create User"}
            </button>
            <button type="button" style={styles.cancelBtn} onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
