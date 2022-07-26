import React from 'react'
import PropTypes from "prop-types";
import {TableHead as MUITableHead, TableRow, TableCell, TableSortLabel} from "@mui/material";



export function TableHead(props) {
    const {
      order,
      orderBy,
      onRequestSort,
      cells
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <MUITableHead>
        <TableRow>
          <TableCell padding="normal">Flag</TableCell>
          {cells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </MUITableHead>
    );
  }
  
TableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired,
  };
