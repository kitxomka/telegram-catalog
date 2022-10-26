import * as React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className="nav-bar-text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/">Telegram Channels Catalog</Link>
          </Typography>
          <Typography className="nav-bar-btn">
            <Link to="/add-channel">
              <Button color="inherit">Add New Channel</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
