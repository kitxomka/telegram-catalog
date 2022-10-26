import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <div className="not-found">
          <Typography variant="h2">404</Typography>
          <Typography component="p">Page not found</Typography>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
