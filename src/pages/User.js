import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

function User() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const fetchUsers = async () => {
    console.log("fetching users");
    fetch("http://localhost:4000/api/users", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setUsers(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    // fetch from /api/users
    fetchUsers();
  }, []);

  const handleRefetch = () => {
    setUsers([]);
    fetchUsers();
  };

  const resetAllTextField = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setUserType("");
  };

  // connect with server to send request
  const sendCreateUserReq = () => {
    fetch("http://localhost:4000/api/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        email: email,
        userType: userType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        handleRefetch();
        resetAllTextField();
        handleModalClose();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleTextFieldChange = (event) => {
    console.log("event", event.target.id);
    if (event.target.id === "user-name") {
      setUserName(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "user-type") {
      setUserType(event.target.value);
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <div>No User Found</div>
      ) : (
        <>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </>
      )}
      <Button variant="contained" onClick={() => handleRefetch()}>
        Fetch
      </Button>
      <Button variant="contained" onClick={() => handleModalOpen()}>
        Create User
      </Button>
      <Modal
        open={open}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalStyle}>
          <h2>Create User</h2>
          <TextField
            id="user-name"
            label="User Name"
            variant="outlined"
            value={userName}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="user-type"
            label="User Type"
            variant="outlined"
            value={userType}
            onChange={handleTextFieldChange}
          />
          <Button
            variant="contained"
            style={styles.modalButton}
            onClick={() => sendCreateUserReq()}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "grey",
    borderRadius: "10px",
    padding: "1rem",
    flexDirection: "column",
    display: "flex",
  },
  modalButton: {
    // centralize the button
    marginTop: "1rem",
  },
};

const columns = [
  { field: "id", headerName: "ID" },
  { field: "userName", headerName: "User name" },
  { field: "userType", headerName: "User type" },
  {
    field: "email",
    headerName: "User Email",
  },
  {
    field: "createdAt",
    headerName: "Created At",
  },
];

export default User;
