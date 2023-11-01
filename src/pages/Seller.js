import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

function Seller() {
const [sellers, setSellers] = useState([]);
const [open, setOpen] = useState(false);
const handleModalOpen = () => setOpen(true);
const handleModalClose = () => setOpen(false);
const [storeName, setStoreName] = useState("");
const [address, setAddress] = useState("");
const [rating, setRating] = useState("");
const fetchSellers = async () => {
    console.log("fetching users");
    fetch("http://localhost:4000/api/sellers", { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
        console.log("data", data);
        setSellers(data);
        })
        .catch((err) => {
        console.log("err", err);
        });
    };
    useEffect(() => {
    // fetch from /api/users
    fetchSellers();
    }, []);
    
    const handleRefetch = () => {
    setSellers([]);
    fetchSellers();
    };
    const resetAllTextField = () => {
    setStoreName("");
    setAddress("");
    setRating("");
    };
    const sendCreateUserReq = () => {
    fetch("http://localhost:4000/api/sellers", {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        storeName:storeName, // 
        address:address,
        rating:rating,
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
    if (event.target.id === "store-name") {
        setStoreName(event.target.value);
    } else if (event.target.id === "address") {
        setAddress(event.target.value);
    } else if (event.target.id === "rating") {
        setRating(event.target.value);
    } 
    };
    
    return (
    <div>
        {sellers.length === 0 ? (
        <div>No User Found</div>
        ) : (
        <>
            <DataGrid
            rows={sellers}
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
        Create Product
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
            id="store-name"
            label="storeName"
            variant="outlined"
            value={storeName}
            onChange={handleTextFieldChange}
            />
            <TextField
            id="address"
            label="address"
            variant="outlined"
            value={address}
            onChange={handleTextFieldChange}
            />
            <TextField
            id="rating"
            label="rating"
            variant="outlined"
            value={rating}
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
                { field: "storeName", headerName: "Store Name" },
                { field: "address", headerName: "Location" },
                { field: "rating", headerName: "Ratings" },
            ];
            
            
            export default Seller;
            