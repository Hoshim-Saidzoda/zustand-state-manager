import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Container, Button, Stack } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
       <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          component={NavLink}
          to="/"
          end
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            background: (theme) =>
              `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "white",
            "&.active": {
              boxShadow: 3,
            },
            "&:not(.active)": {
              bgcolor: "grey.200",
              color: "grey.800",
              "&:hover": {
                background: (theme) =>
                  `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                color: "white",
              },
            },
          }}
        >
          Sync
        </Button>

        <Button
          component={NavLink}
          to="/async"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            background: (theme) =>
              `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "white",
            "&.active": {
              boxShadow: 3,
            },
            "&:not(.active)": {
              bgcolor: "grey.200",
              color: "grey.800",
              "&:hover": {
                background: (theme) =>
                  `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                color: "white",
              },
            },
          }}
        >
          Async
        </Button>
      </Stack>

       <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
