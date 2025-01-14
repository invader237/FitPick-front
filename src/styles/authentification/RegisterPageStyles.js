const RegisterPageStyles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      backgroundColor: "#f9f9f9", // Fond neutre
    },
    paper: {
      padding: "2.5rem",
      borderRadius: "10px",
      maxWidth: "500px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Ombre douce
      textAlign: "center",
      backgroundColor: "#fff",
    },
    title: {
      marginBottom: "1.5rem",
      fontWeight: "bold",
      color: "#1976d2",
    },
    progressBar: {
      marginTop: "1rem",
    },
    feedbackBox: {
      marginTop: "0.5rem",
      textAlign: "left",
    },
    feedbackText: {
      fontSize: "0.9rem",
      color: "#e74c3c",
      display: "flex",
      alignItems: "center",
    },
    feedbackIcon: {
      marginRight: "0.5rem",
    },
    submitButton: {
      marginTop: "1.5rem",
      backgroundColor: "#1976d2",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "uppercase",
    },
    link: {
      color: "#1976d2",
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };
  
  export default RegisterPageStyles;
  