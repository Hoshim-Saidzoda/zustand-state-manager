import React from "react";
import useSyncStore from "../store/zustan";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";

const SyncPage = () => {
  const {
    data,
    inpTitle,
    editId,
    searchQuery,
    filter,
    setInpTitle,
    addUser,
    deleteUser,
    startEdit,
    saveEdit,
    toStatus,
    setSearchQuery,
    setFilter,
  } = useSyncStore();

  const navigate = useNavigate();

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => {
      if (filter === "active") return !item.status;
      if (filter === "completed") return item.status;
      return true;
    });

  return (
    <Box maxWidth={800} mx="auto" mt={4} p={2}>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={3}>
        <TextField
          fullWidth
          label="Task title"
          variant="outlined"
          value={inpTitle}
          onChange={(e) => setInpTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (editId ? saveEdit() : addUser())}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editId ? saveEdit : addUser}
        >
          {editId ? "Save" : "Add"}
        </Button>
      </Stack>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={3}>
        <TextField
          fullWidth
          label="Search tasks"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Inactive</MenuItem>
        </Select>
      </Stack>

      <Stack spacing={2}>
        {filteredData.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6">No tasks found</Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filter"
                : "Add your first task to get started"}
            </Typography>
          </Box>
        ) : (
          filteredData.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                borderLeft: `6px solid ${item.status ? "#9e9e9e" : "#4caf50"}`,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
              >
                <Chip
                  label={item.status ? "Inactive" : "Active"}
                  color={item.status ? "default" : "success"}
                  size="small"
                />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: item.status ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => toStatus(item.id)}
                >
                  {item.title}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => startEdit(item.id, item.title)}>
                  Edit
                </Button>
                <Button size="small" onClick={() => deleteUser(item.id)}>
                  Delete
                </Button>
                <Button size="small" onClick={() => navigate(`/sync/${item.id}`)}>
                  info
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Stack>

     
    </Box>
  );
};

export default SyncPage;
