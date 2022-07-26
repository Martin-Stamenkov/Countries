import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Image } from "./Image";

export function Modal(props) {
  const { data, handleClose, open } = props;

  return (
    data && (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
            <DialogTitle>{data.name}</DialogTitle>
            <Image src={data.flag} style={{ width: 68, height: 68, }} />
          </Box>
          <DialogContent>
            <DialogContentText>Capital: {data.capitalName}</DialogContentText>
            <DialogContentText>Code: {data.code}</DialogContentText>
            <DialogContentText>Population: {data.population}</DialogContentText>
            <DialogContentText>Region: {data.region}</DialogContentText>
            <DialogContentText>Sub Region: {data.subregion}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};
