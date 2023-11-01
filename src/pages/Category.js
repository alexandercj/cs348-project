import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
function Category() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const [name, setName] = useState("");
    const fetchCategory = async () => {
        console.log("fetching users");
        fetch("http://localhost:4000/api/categories", { mode: "cors" })
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            setCategories(data);
          })
          .catch((err) => {
            console.log("err", err);
          });
        };
    useEffect(() => {
        // fetch from /api/users
        fetchCategory();
        }, []);
        
    const handleRefetch = () => {
     setCategories([]);
     fetchCategory();
    };
    const resetAllTextField = () => {
        setName(""); 
     };
     const sendCreateUserReq = () => {
        fetch("http://localhost:4000/api/categories", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name
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
        if (event.target.id === "name") {
          setName(event.target.value);
        } 
    };
    return (
        <div>
          {categories.length === 0 ? (
            <div>No User Found</div>
          ) : (
            <>
              <DataGrid
                rows={categories}
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
            Create Category
          </Button>
          <Modal
            open={open}
            onClose={() => handleModalClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={styles.modalStyle}>
              <h2>Create Product</h2>
              <TextField
                id="name"
                label="name"
                variant="outlined"
                value={name}
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
        { field: "name", headerName: "Product Name" },
        ];
        
        
        export default Category;
        

