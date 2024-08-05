import React, { useEffect } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addUser, getUserById, updateUser } from "../apis";
import { useParams } from "react-router-dom";

export default function MyForm() {
  const { handleSubmit, register, reset, setValue, watch, formState: { errors } } = useForm();

  const { id } = useParams();
  const isEdit = Boolean(id);

  const watchedFields = watch();

  useEffect(() => {
    const loadData = async () => {
      if (!isEdit) return;
      try {
        const res = await getUserById(id);
        let formData = res.data;
        Object.keys(formData).forEach((key) => {
          setValue(key, formData[key]);
        });
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    loadData();
  }, [id, isEdit, setValue]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const formdata = new FormData();
      Object.keys(data).forEach((key) => {
        formdata.append(key, data[key]);
      });
      const fileInput = document.getElementById("image");
      if (fileInput && fileInput.files[0]) {
        formdata.append("image", fileInput.files[0]);
      }
      isEdit ? await updateUser(id, formdata) : await addUser(formdata);
      toast.success(isEdit ? "User updated successfully" : "User added successfully");
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container>
        <Box
          margin={5}
          padding={3}
          component={Paper}
          elevation={6}
          sx={{
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="h4" align="center" marginBottom={2}>
            {isEdit ? "Edit User" : "Add User"}
          </Typography>
          <Grid container component={"form"} onSubmit={handleSubmit(onSubmit)} spacing={2} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("username", { required: "Username is required" })}
              InputLabelProps={{ shrink: Boolean(watchedFields.username) }}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("address", { required: "Address is required" })}
              InputLabelProps={{ shrink: Boolean(watchedFields.address) }}
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                }
              })}
              InputLabelProps={{ shrink: Boolean(watchedFields.email) }}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              sx={{ width: "100%" }}
              type="password"
              {...register("password", { required: "Password is required" })}
              InputLabelProps={{ shrink: Boolean(watchedFields.password) }}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Confirm Password"
              name="confirmpassword"
              variant="outlined"
              sx={{ width: "100%" }}
              type="password"
              {...register("confirmpassword", {
                required: "Confirm Password is required"
              })}
              InputLabelProps={{ shrink: Boolean(watchedFields.confirmpassword) }}
              error={Boolean(errors.confirmpassword)}
              helperText={errors.confirmpassword?.message}
            />
          </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Upload Image</Typography>
              <input type="file" name="image" id="image" />
            </Grid>
            <Button variant="contained" sx={{ width: "30%", marginTop: 2 }} type="submit">
              {isEdit ? "Update User" : "Add User"}
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
