import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodoStore from "../store/async";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

const AboutById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, currentUser } = useTodoStore();

  useEffect(() => {
    if (id) fetchUserById(id);
  }, [id, fetchUserById]);

  if (!currentUser) return null; 

  return (
    <Box maxWidth={700} mx="auto" mt={4} p={2}>
      <Button
        variant="outlined"
        onClick={() => navigate("/async")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Card
        sx={{
          mb: 3,
          p: 2,
          borderLeft: `6px solid ${currentUser.isCompleted ? "#9e9e9e" : "#4caf50"}`,
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">{currentUser.name}</Typography>
            <Chip
              label={currentUser.isCompleted ? "Completed" : "Active"}
              color={currentUser.isCompleted ? "default" : "success"}
              size="small"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            ID: {currentUser.id}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.description || "No description"}
          </Typography>

          {currentUser.images && currentUser.images.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
              {Array.isArray(currentUser.images)
                ? currentUser.images.map((img, index) => (
                    <Avatar
                      key={index}
                      src={img}
                      variant="rounded"
                      sx={{ width: 100, height: 100 }}
                    />
                  ))
                : (
                  <Avatar
                    src={currentUser.images}
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                  />
                )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutById;
