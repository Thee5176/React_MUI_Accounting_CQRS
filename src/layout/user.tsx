import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

export default function AuthLayout({children} : {children: React.ReactNode}) {

  return (
    <Container 
      sx={{ 
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex", 
          flexDirection: "column",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        {children}
      </Card>
    </Container>
  );
}
