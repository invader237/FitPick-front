const forgotPasswordStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  paper: {
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
  },
  backButtonBox: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  backButton: {
    color: "#1976d2",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "bold",
  },
  iconBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "70px",
    color: "#1976d2",
  },
  title: {
    fontWeight: "bold",
    fontSize: "26px",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    color: "#6c757d",
    marginBottom: "30px",
    fontSize: "15px",
    lineHeight: "1.5",
  },
  textField: {
    marginBottom: "15px",
  },
  submitButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#155fa0",
    },
    "&:disabled": {
      backgroundColor: "#e0e0e0",
      color: "#9e9e9e",
    },
  },
  alertBox: {
    marginTop: "20px",
    padding: "10px 15px",
    borderRadius: "10px",
    textAlign: "left",
  },
};

export default forgotPasswordStyles;
