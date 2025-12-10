import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTodoStore from "../store/async";
import {
  Container, Typography, Button, TextField, Checkbox, Dialog, DialogTitle,
  DialogContent, DialogActions, Card, CardContent, CardActions,
  Grid, Box, Stack, Chip, Avatar, Tooltip, Paper
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from "@mui/icons-material";

const Async = () => {
  const navigate = useNavigate();
  const { data, getTodos, saveTodo, deleteTodo, toggleComplete } = useTodoStore();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => { getTodos(); }, [getTodos]);

  const handleOpenAdd = () => { setMode("add"); setName(""); setDesc(""); setCurrentTodo(null); setOpen(true); };
  const handleOpenEdit = (todo) => { setMode("edit"); setName(todo.name); setDesc(todo.description || ""); setCurrentTodo(todo); setOpen(true); };
  const handleClose = () => setOpen(false);
  const handleSave = async () => { if (!name.trim()) return; await saveTodo({ name: name.trim(), description: desc }, mode, currentTodo); handleClose(); };

  const filteredTodos = data.filter(todo => filter === "active" ? !todo.status : filter === "inactive" ? todo.status : true);

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: 3 }}>New</Button>
        </Box>

        <Grid container spacing={3}>
          {filteredTodos.map(todo => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={todo.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 6,
                  bgcolor: todo.status ? "action.disabledBackground" : "background.paper",
                  "&:hover": { boxShadow: 12 },
                  transition: "0.3s",
                }}
              >
                <CardContent sx={{ display: "flex", p: 3 }}>
                  {todo.images?.[0] && (
                    <Avatar src={todo.images[0]} variant="rounded" sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }} />
                  )}
                  <Box flex={1}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Checkbox
                        checked={!!todo.status}
                        onChange={() => toggleComplete(todo)}
                        color={todo.status ? "success" : "primary"}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          textDecoration: todo.status ? "line-through" : "none",
                          opacity: todo.status ? 0.6 : 1,
                        }}
                      >
                        {todo.name} ({todo.status ? "inactive" : "active"})
                      </Typography>
                    </Stack>

                    {todo.description && <Typography variant="body2" color="text.secondary">{todo.description}</Typography>}

                    {todo.images?.length > 1 && (
                      <Stack direction="row" spacing={1} mt={2}>
                        {todo.images.slice(1).map((img, i) => (
                          <Avatar key={i} src={img} variant="rounded" sx={{ width: 50, height: 50 }} />
                        ))}
                      </Stack>
                    )}

                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", gap: 1, px: 3, pb: 2 }}>
                  <Tooltip title="Details">
                    <Button size="small" startIcon={<InfoIcon />} onClick={() => navigate(`/async/${todo.id}`)}>Info</Button>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Button size="small" color="warning" startIcon={<EditIcon />} onClick={() => handleOpenEdit(todo)}>Edit</Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo.id)}>Delete</Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredTodos.length === 0 && (
          <Paper elevation={0} sx={{ textAlign: "center", py: 12, borderRadius: 4 }}>
            <Typography variant="h6" color="text.secondary">No tasks</Typography>
          </Paper>
        )}
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === "edit" ? "Edit" : "Add"}</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Description" multiline rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} sx={{ mt: 3 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!name.trim()}>{mode === "edit" ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Async;
