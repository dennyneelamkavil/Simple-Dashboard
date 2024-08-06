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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../apis/apiSlice";

export default function MyTable() {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { data:users=[], error, isLoading, refetch } = useGetAllUsersQuery();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/edit-user/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          {Array.isArray(users.data) && users.data.length > 0 ? (
              users.data.map(({ _id, username, address, email, image }, index) => (
                <TableRow key={_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>{address}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Avatar alt={username} src={image} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => handleUpdate(_id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
