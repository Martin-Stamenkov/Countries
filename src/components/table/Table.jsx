import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Table as MUITable, TableContainer, TablePagination, Paper } from "@mui/material";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { headCells } from "utils";
import PropTypes from "prop-types";

export function Table(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <MUITable
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            {data && (
              <TableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                cells={headCells}
              />
            )}
            <TableBody
              data={data}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </MUITable>
        </TableContainer>
        {data && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
};
