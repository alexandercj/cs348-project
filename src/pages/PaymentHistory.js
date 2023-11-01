import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

function PaymentHistory() {
  const [paymenthistories, setPaymentHistories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const fetchPaymentHistories = async () => {
    console.log("fetching users");
    fetch("http://localhost:4000/api/paymenthistories", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPaymentHistories(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    // fetch from /api/users
    fetchPaymentHistories();
  }, []);

  const handleRefetch = () => {
    setPaymentHistories([]);
    fetchPaymentHistories();
  };
  const resetAllTextField = () => {
    setAmount("");
    setPaymentMethod("");
  };
  const sendCreateUserReq = () => {
    fetch("http://localhost:4000/api/paymenthistories", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount:amount,
        payment_method:paymentMethod
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
    if (event.target.id === "amount") {
      setAmount(event.target.value);
    } else if (event.target.id === "paymentMethod") {
      setPaymentMethod(event.target.value);
    } 
  };
  return (
    <div>
      {paymenthistories.length === 0 ? (
        <div>No User Found</div>
      ) : (
        <>
          <DataGrid
            rows={paymenthistories}
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
        Create PaymentHistory
      </Button>
      <Modal
        open={open}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalStyle}>
          <h2>Create PaymentHistory</h2>
          <TextField
            id="amount"
            label="amount"
            variant="outlined"
            value={amount}
            onChange={handleTextFieldChange}
          />
          <TextField
            id="paymentMethod"
            label="paymentMethod"
            variant="outlined"
            value={paymentMethod}
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
  { field: "amount", headerName: "Amount" },
  { field: "payment_method", headerName: "Payment Method" },
  {
    field: "payment_date",
    headerName: "Payment Date"
  },
];



export default PaymentHistory;
