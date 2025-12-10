import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSyncStore from "../store/zustan";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

const SyncById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, toStatus } = useSyncStore();

  const task = data.find((item) => item.id == id);

  if (!task) {
    return (
      <Box maxWidth={600} mx="auto" mt={4} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Task not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/sync")}>
          Back to list
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
     

      <Card sx={{ mb: 3, p: 2, borderLeft: `6px solid ${task.status ? "#9e9e9e" : "#4caf50"}` }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Chip
              label={task.status ? "Completed" : "Active"}
              color={task.status ? "default" : "success"}
              size="small"
            />
          </Stack>
        </CardContent>

        
      </Card>

      
    </Box>
  );
};

export default SyncById;
