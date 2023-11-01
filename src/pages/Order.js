import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

function Order() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [status, setStatus] = useState("");

  const fetchOrders = async () => {
    console.log("fetching orders");
    fetch("http://localhost:4000/api/orders", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setOrders(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    // fetch from /api/users
    fetchOrders();
  }, []);
  const handleRefetch = () => {
    setOrders([]);
    fetchOrders();
  };
  const resetAllTextField = () => {
    setTotalPrice("");
    setStatus("");
  };
  const sendCreateUserReq = () => {
    fetch("http://localhost:4000/api/orders", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_price: totalPrice,
        status: status,
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
  // unchanged yet
  const handleTextFieldChange = (event) => {
    console.log("event", event.target.id);
    if (event.target.id === "total-price") {
      setTotalPrice(event.target.value);
    } else if (event.target.id === "status") {
      setStatus(event.target.value);
    }
  };
  return (
    <div>
      {orders.length === 0 ? (
        <div>No User Found</div>
      ) : (
        <>
          <DataGrid
            rows={orders}
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
        Create Order
      </Button>
      <Modal
        open={open}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalStyle}>
          <h2>Create Order</h2>
          <TextField
            id="total-price"
            label="totalPrice"
            variant="outlined"
            value={totalPrice}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="status"
            label="Status"
            variant="outlined"
            value={status}
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
  { field: "total_price", headerName: "Total Price" },
  { field: "status", headerName: "Status" },
  {
    field: "created_at",
    headerName: "Created At",
  }
];

export default Order;
