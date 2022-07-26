import { useCallback, useRef, useState } from "react";
import {
  TableBody as MUITableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Modal } from "components/Modal";
import { Image } from "../Image";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { getComparator, stableSort } from "utils";

export function TableBody(props) {
  const [rowData, setRowData] = useState(null);
  const { data, page, order, orderBy, rowsPerPage } = props;
  const [open, setOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [progress, setProgress] = useState(10);

  const timeout = useRef();
  const indicator = useRef();
  const target = useRef();

  const start = useCallback((event, data, index) => {
    if (event.target) {
      event.target.addEventListener("touchend", event.preventDefault, {
        passive: false,
      });
      target.current = event.target;
    }
    setRowData(data);
    setLoadingIndex(index);
    setLoadingDetails(true);
    timeout.current = setTimeout(() => {
      setOpen(true);
      setProgress(0);
      clearInterval(indicator.current);
    }, 3000);
    indicator.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 10
      );
    }, 300);
  }, []);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    setRowData(null);
    setLoadingDetails(false);
    clearInterval(indicator.current);
    setProgress(0);
    if (target.current) {
      target.current.removeEventListener("touchend", target.preventDefault);
    }
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
    setRowData(null);
    setLoadingDetails(false);
    setProgress(0);
  };

  return (
    <>
      <MUITableBody>
        {data &&
          stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                  onMouseDown={(e) => start(e, row, index)}
                  onMouseUp={clear}
                >
                  <TableCell padding="none">
                    <Image
                      style={{ width: 36, height: 36, marginLeft: 8 }}
                      src={row.flag}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Box display="flex" alignItems="center">
                      <Typography>{row.name}</Typography>
                      {loadingDetails && loadingIndex === index && !open && (
                        <CircularProgress
                          sx={{ marginLeft: "8px" }}
                          size={20}
                          variant="determinate"
                          value={progress}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                  <TableCell align="right">
                    {row.capitalName === "" ? "-" : row.capitalName}
                  </TableCell>
                  <TableCell align="right">{row.population}</TableCell>
                  <TableCell align="right">{row.region}</TableCell>
                  <TableCell align="right">{row.subregion}</TableCell>
                </TableRow>
              );
            })}
      </MUITableBody>
      <Modal open={open} data={rowData} handleClose={handleCloseModal} />
    </>
  );
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
