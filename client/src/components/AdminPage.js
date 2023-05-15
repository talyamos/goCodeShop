import "./AdminPage.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TbEdit } from "react-icons/tb";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [delProd, setDelProd] = React.useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editProd, setEditProd] = useState({});
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState("Update");

  useEffect(() => {
    fetch("https://gocodeshoptalya.onrender.com/api/getAllProducts")
      .then((response) => response.json())
      .then((data) => setProductsData(data));
  }, []);

  useEffect(() => {
    const newCategories = productsData
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);
    setCategories(newCategories);
  }, [productsData]);

  const columns = [
    { id: "title", label: "Title", minWidth: 150, align: "center" },
    { id: "category", label: "Category", minWidth: 120, align: "center" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    { id: "description", label: "Description", minWidth: 250, align: "center" },
    { id: "image", label: "Image", minWidth: 140, align: "center" },
    { id: "delete", label: "", minWidth: 10, align: "center" },
    { id: "edit", label: "", minWidth: 10, align: "center" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    if (formState === "Add") {
      setFormState("Update");
    }
    setOpenEdit(false);
    setEditProd({});
  };

  const handleDeleteClose = () => {
    fetch(`http://localhost:8000/api/deleteProduct/${delProd}`, {
      method: "DELETE",
    }).then(() => {
      setProductsData(
        productsData.filter((product) => product._id !== delProd)
      );
      setOpenDelete(false);
    });
  };

  const handleEdit = () => {
    if (formState === "Add") {
      fetch(`http://localhost:8000/api/addProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editProd.title,
          price: editProd.price,
          description: editProd.description,
          category: editProd.category,
          image: editProd.image,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductsData((prevData) => [...prevData, data]);
        })
        .catch((error) => console.error(error));
      setOpenEdit(false);
      setFormState("Update");
      setEditProd({});
    } else {
      fetch(`http://localhost:8000/api/updateProduct/${editProd._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editProd.title,
          category: editProd.category,
          price: editProd.price,
          description: editProd.description,
          image: editProd.image,
          dateCreated: editProd.dateCreated,
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });
      setOpenEdit(false);
      setEditProd({});
    }
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setEditProd({ ...editProd, category: newCategory });
  };

  const handleTitleChange = (event) => {
    const p = editProd;
    p.title = event.target.value;
    setEditProd(p);
  };
  const handlePriceChange = (event) => {
    const p = editProd;
    p.price = event.target.value;
    setEditProd(p);
  };
  const handleDescriptionChange = (event) => {
    const p = editProd;
    p.description = event.target.value;
    setEditProd(p);
  };
  const handleImgChange = (event) => {
    const p = editProd;
    p.image = event.target.value;
    setEditProd(p);
  };
  const handleAddProd = () => {
    setFormState("Add");
    setOpenEdit(true);
  };

  return (
    <div className="AdminPage">
      <div className="APTopDiv">
        <Button
          className="AddProdBtn"
          variant="contained"
          onClick={handleAddProd}
        >
          <AddIcon />
        </Button>
        <h1 className="APTitle">Admin Page</h1>
      </div>
      <Paper>
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow>
                      {columns.map((column) => {
                        if (column.id === "delete") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  setOpenDelete(true);
                                  setDelProd(row._id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        if (column.id === "edit") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  setOpenEdit(true);
                                  const prod = productsData.find(
                                    (prod) => prod._id === row._id
                                  );
                                  setEditProd(prod);
                                }}
                              >
                                <TbEdit />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        if (column.id === "image") {
                          const value = row["image"];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img className="ImgTable" src={value}></img>
                            </TableCell>
                          );
                        }
                        if (column.id === "title") {
                          const value = row["title"];
                          return (
                            <TableCell
                              className="ProdTitleInTable"
                              key={column.id}
                              align={column.align}
                              onClick={() => {
                                navigate(`/products/${row._id}`);
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }
                        if (column.id != "title") {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete this item from the site?
            This action cannot be undone. Click 'OK' to continue with the
            deletion, or click 'Cancel' to keep the item on the site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>{editProd.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={editProd.title ? editProd.title : ""}
            onChange={handleTitleChange}
          />

          <TextField
            fullWidth
            margin="dense"
            id="outlined-select-currency"
            select
            label="Category"
            value={editProd.category ? editProd.category : ""}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => {
              return (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            label="Price"
            type="decimal"
            fullWidth
            variant="standard"
            defaultValue={editProd.price ? editProd.price : ""}
            onChange={handlePriceChange}
          />
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            multiline
            maxRows={4}
            defaultValue={editProd.description ? editProd.description : ""}
            onChange={handleDescriptionChange}
          />
          <div className="ImageDivForm">
            <TextField
              autoFocus
              required
              fullWidth
              margin="dense"
              id="imageUrl"
              label="Image Url"
              type="url"
              variant="standard"
              defaultValue={editProd.image ? editProd.image : ""}
              onChange={handleImgChange}
            />
            <img className="FormImage" src={editProd.image}></img>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEdit}>{formState}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
