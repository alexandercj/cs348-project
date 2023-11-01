import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

function Product() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

const fetchProducts = async () => {
console.log("fetching users");
fetch("http://localhost:4000/api/products", { mode: "cors" })
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);
    setProducts(data);
  })
  .catch((err) => {
    console.log("err", err);
  });
};
useEffect(() => {
// fetch from /api/users
fetchProducts();
}, []);

const handleRefetch = () => {
setProducts([]);
fetchProducts();
};
const resetAllTextField = () => {
setName("");
setDescription("");
setPrice("");
};
const sendCreateUserReq = () => {
fetch("http://localhost:4000/api/products", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: name, // 
    description: description,
    price: price,
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
} else if (event.target.id === "description") {
  setDescription(event.target.value);
} else if (event.target.id === "price") {
  setPrice(event.target.value);
} 
};

return (
<div>
  {products.length === 0 ? (
    <div>No User Found</div>
  ) : (
    <>
      <DataGrid
        rows={products}
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
        id="name"
        label="name"
        variant="outlined"
        value={name}
        onChange={handleTextFieldChange}
      />
      <TextField
        id="price"
        label="price"
        variant="outlined"
        value={price}
        onChange={handleTextFieldChange}
      />
      <TextField
        id="description"
        label="description"
        variant="outlined"
        value={description}
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
{ field: "description", headerName: "Product Description" },
{ field: "price", headerName: "Product Price" },
];


export default Product;
