import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tableSchema } from '../../Validations/TableFormValidation';
import { getFormValue, getPosts } from '../../redux/MisrajTable';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, TableFooter } from '@mui/material';
import "./Table.css"
const TableMisraj = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [id, setId] = useState()
    const [title, setTitle] = useState("")
    const [isValidValue, setIsValidValue] = useState(null)
    const dispatch = useDispatch()
    const misrajApi = useSelector((state) => state.misraj.misrajApi);
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    const tableData = misrajApi
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleIdChange = (e) => {
        setId(e.target.value)
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(getFormValue({ id: id, title: title }))
        let formData = {
            id: e.target[0].value,
            title: e.target[1].value
        }
        const isValid = await tableSchema.isValid(formData)
        if (isValid === true) {
            setIsValidValue(true)
        }
        else {
            setIsValidValue(false)
        }

    }


    return (<>

        <div className='container-fluid table-misraj-main-container'>
            <div className='row'>
                <div className='col-md-6 col-sm-12 table-container'>
                    <div className='table'>
                        <TableContainer component={Paper} >
                            <Table aria-label="Misraj Table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell >Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row =>
                                            <TableRow key={row.id}>

                                                <TableCell>{row.id}</TableCell>
                                                <TableCell >{row.title}</TableCell>
                                            </TableRow>)}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={2}
                                            count={tableData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
                                            rowsPerPageOptions={[5, 7]}
                                            labelRowsPerPage={<span>Rows:</span>}
                                            labelDisplayedRows={({ page }) => {
                                                return `Page: ${page}`;
                                            }}
                                            backIconButtonProps={{
                                                color: "secondary"
                                            }}
                                            nextIconButtonProps={{ color: "secondary" }}
                                            SelectProps={{
                                                inputProps: {
                                                    "aria-label": "page number"
                                                }
                                            }}
                                            showFirstButton={true}
                                            showLastButton={true}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className='col-md-6 col-sm-12'>

                    <div className='form-conatiner'>
                        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded shadow-con" >
                            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="Id" className="form-label">Id</label>
                                    <input type="text" className="form-control" id="Id" placeholder="Enter Your Id" onChange={(e) => handleIdChange(e)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="Title" placeholder="Enter Your Title" onChange={(e) => handleTitleChange(e)} required />
                                </div>
                                <div className='btn-container'>
                                    <button className='btn btn-primary'>Add New</button>

                                </div>
                                {isValidValue === true && <div className="alert alert-success " style={{ marginTop: "10px" }} role="alert">
                                    successfully Added
                                </div>}
                                {isValidValue === false && <div className="alert alert-danger" role="alert" style={{ marginTop: "10px" }}>
                                    Error
                                </div>}
                            </form>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </>
    )
}

export default TableMisraj



