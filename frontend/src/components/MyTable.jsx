import {
  Avatar,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyTable() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let res = await getAllUsers();
        setLists(res.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    init();
  });

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      let updatedList = lists.filter((item) => item._id !== id);
      setLists(updatedList);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Avatar alt={row.username} src={row.image} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleUpdate(row._id);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleDelete(row._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
