const loginPageStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
  },
  paper: {
    padding: "2.5rem",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "2rem",
    fontWeight: "bold",
    color: "#1976d2",
    fontSize: "2rem",
  },
  alert: {
    marginBottom: "1.5rem",
    transition: "all 0.3s ease-in-out", // Animation fluide
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
  },
  form: {
    marginTop: "1rem",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px",
    width: "100%",
    textTransform: "uppercase",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default loginPageStyles;
