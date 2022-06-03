import React, { useState } from 'react';
<link href="./css/bootstrap.css" rel="stylesheet"/>
<link href="./css/bootstrap.min.css" rel="stylesheet"/>
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const API = "https://jsonplaceholder.typicode.com";

const columns = [
    { id: 'id', label: 'ID', minWidth: 150 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'body', label: 'Body', minWidth: 100 },
];


function App() {
    const [itemdata, setData] = useState([]);
    const [photo, setPhoto] = useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchPost = () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(json => setData(json));
    }
    const rows = itemdata;

    const fetchPhotos = () => {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(json => setPhoto(json));
    }

    const dataPhoto = photo;

    return (
        <div className="container">
            <div className={classes.root}>
                <Box>
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => fetchPost()}>Informacion</Button>
                </Box>
            </div>
            <container>
            <br />
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </StyledTableRow >
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </container>
            <div className={classes.root}>
                <br />
                <Box>
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => fetchPhotos()}>Fotos</Button>
                </Box>
            </div>
            <container>
            <br />
                <Row md={3}>
                    {
                        dataPhoto.map((item) => (
                            <Col key={item.id}>
                                <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Header>{`${item.id}`}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{`${item.title}`}</Card.Title>
                                        <Card.Img variant="top" src={`${item.url}`} />
                                        <Card.Img variant="top" src={`${item.thumbnailUrl}`} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </container>
        </div >
    );
}

export default App;