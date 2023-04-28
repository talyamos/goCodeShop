import './AdminPage.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TbEdit} from 'react-icons/tb'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import MyContext from '../MyContext';
import { useContext,useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { jsx } from '@emotion/react';
import { ImageListItem } from '@mui/material';
import { useNavigate } from "react-router-dom";




const AdminPage = () => {

    // const {allProducts} = useContext(MyContext)
    // console.log(allProducts)
    const navigate = useNavigate()

    
    const [productsData,setProductsData]=useState([])
    const [openDelete, setOpenDelete] = React.useState(false);
    const [delProd, setDelProd] = React.useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows,setRows]=useState([])
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editProd,setEditProd]=useState({})
    const [categories,setCategories]=useState([])
    const [formState,setFormState]=useState("Update")

  const fetchProducts=async function(){
    const response=await fetch("http://localhost:8000/api/getAllProducts")
    const json= await response.json()
    setProductsData(json)
  }
  useEffect(()=>{fetchProducts()},[])
  
  const loadRows=function(){
    setRows([...productsData])
  }
  useEffect(()=>{loadRows()},[])
  // console.log(rows)
   console.log(productsData)

  const loadCategories=()=>{
    const newCategories = productsData.map(p => p.category)
  .filter((value, index, array) => array.indexOf(value)===index);
  setCategories(newCategories)
  //להביא במקום הפונקציה הזאת את הקטגוריות מהיוז קונטקסט
  }
  useEffect(()=>{loadCategories()},[])

    const columns = [
      { id: 'title', label: 'Name', minWidth: 150,align: 'center' },
      { id: 'category', label: 'Category', minWidth: 120, align: 'center' },
      { id: 'price', label: 'Price', minWidth: 100,align: 'center' },
      { id: 'description', label: 'Description', minWidth: 250, align: 'center' },
      { id: 'image', label: 'Image', minWidth: 140, align: 'center', format: (value) => value.toLocalImage(value) },
      { id: 'delete', label: '', minWidth: 10,align: 'center' },
      { id: 'edit', label: '', minWidth: 10,align: 'center' },
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
    if(formState==="Add")
    {
      setFormState("Update")
    }
    setOpenEdit(false);
    setEditProd({})
  };

  const handleDeleteClose = () => {
    const newRows=[...rows]
    const index=rows.findIndex((prod)=>prod._id===delProd) 
    newRows.splice(index,1)
    setRows(newRows)
    setProductsData(newRows)
    setOpenDelete(false);
    //למחוק בדליט של הפוסטמן
  };

  const handleEdit=()=>{
    if(formState==="Add")
    {
      const newRows=[...rows]
      newRows.push(editProd)
      setRows(newRows)
      setProductsData(newRows)
      console.log(rows)
      setOpenEdit(false)
      setFormState("Update")
      setEditProd({})
      //פוסטמןן
    }
    else{
      const newRows=[...rows]
      const index=rows.findIndex((prod)=>prod._id===editProd) 
      newRows.splice(index,1,editProd)
      setRows(newRows)
      setProductsData(newRows)
      setOpenEdit(false);
      setEditProd({})
      //לעדכן בפוסטמן
    }
  }

  const handleCategoryChange = (event) => {
    const p=editProd
    p.category=event.target.value
    setEditProd(p)
    console.log(editProd)
  };

  const handleTitleChange=(event)=>{
    const p=editProd
    p.title=event.target.value
    setEditProd(p)
  }
  const handlePriceChange=(event)=>{
    const p=editProd
    p.price=event.target.value
    setEditProd(p)
  }
  const handleDescriptionChange=(event)=>{
    const p=editProd
    p.description=event.target.value
    setEditProd(p)
  }
  const handleImgChange=(event)=>{
    const p=editProd
    p.image=event.target.value
    setEditProd(p)
  }
  const handleAddProd=()=>{
    setFormState("Add")
    setOpenEdit(true)
  }

    return(
    <div className='AdminPage'>
      <div className='APTopDiv'>
        <Button className='AddProdBtn' variant='contained' onClick={handleAddProd}><AddIcon/></Button>
        <h1>Admin Page</h1>
      </div>
       <Paper /*sx={{ width: '100%', overflow: 'hidden'}}*/>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                 <TableCell
                   key={column.id}
                   align={column.align}
                   style={{ minWidth: column.minWidth }}>
                     {column.label}
                 </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow  /*hover role="checkbox" tabIndex={-1} key={row.code}*/>
                    {columns.map((column) => {
                      if(column.id==='delete')
                      {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton aria-label="delete" onClick={()=>{setOpenDelete(true);setDelProd(row._id)}}><DeleteIcon /></IconButton>
                          </TableCell>
                        );
                      }
                      if(column.id==='edit')
                      {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton aria-label="edit" onClick={()=>{setOpenEdit(true);const prod= rows.find((prod)=>prod._id===row._id);setEditProd(prod);}}><TbEdit/></IconButton>
                          </TableCell>
                        );
                      }
                      if(column.id==='image')
                      {
                        const value = row['image'];
                        return (
                         <TableCell key={column.id} align={column.align}>
                          <img className='ImgTable' src={value}></img>
                         </TableCell>
                         );
                      }
                      if(column.id==='title')
                      {
                        const value = row['title'];
                        return (
                          <TableCell className='ProdTitleInTable' key={column.id} align={column.align} 
                            onClick={()=>{navigate(`/products/${row._id}`)}}>
                            {value}
                          </TableCell>
                        );
                      } 
                      if(column.id!='title')
                      {
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
        count={rows.length}
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
        <DialogTitle id="alert-dialog-title">
          {"Delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to permanently delete this item from the site? This action cannot be undone.
          Click 'OK' to continue with the deletion, or click 'Cancel' to keep the item on the site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>{editProd.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            type='string'
            fullWidth
            variant="standard"
            defaultValue={editProd.title}
            onChange={handleTitleChange}
          />
          
          <TextField
          fullWidth
          margin='dense'
          id="outlined-select-currency"
          select
          label="Category"
          defaultValue={editProd.category}
          onChange={handleCategoryChange}
        >
          {
            categories.map((c)=>{
              return <MenuItem key={c} value={c}>{c}</MenuItem>})
          }
        </TextField>
        <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            label="Price"
            type='decimal'
            fullWidth
            variant="standard"
            defaultValue={editProd.price}
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
          defaultValue={editProd.description}
          onChange={handleDescriptionChange}
        />
        <div className='ImageDivForm' fullWidth>
        <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="imageUrl"
            label="Image Url"
            type='url'
            variant="standard"
            defaultValue={editProd.image}
            onChange={handleImgChange}
          />
          <img className='FormImage' src={editProd.image} ></img>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEdit}>{formState}</Button>
        </DialogActions>
      </Dialog>
    {/* <div>hi yonyon</div> */}
     </div>
    )
  }

  export default AdminPage;