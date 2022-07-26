import React, { useState } from "react";
import { TextField as MUITextField, Autocomplete, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Image } from "./Image";
import { Modal } from "./Modal";
import { GetCountryByName } from "api";

const itemsLength = 10;

export function TextField(props) {
  const { data } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState(null);
  const [open, setOpen] = useState(false);

  const getFirstTenItems = data
    ?.filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, itemsLength);

  const handleClickAsync = async (name) => {
    const response = await GetCountryByName(name);
    setCountry(response)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width="40%">
      <Autocomplete
        freeSolo
        disableClearable
        options={getFirstTenItems}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleClickAsync(option.name)}
          >
            <Image
              style={{ width: 32, height: 32, marginRight: 8 }}
              src={option.flag}
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <MUITextField
            {...params}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Find Countries"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <Modal open={open} data={country} handleClose={handleClose} />
    </Box>
  );
}

TextField.propTypes = {
  data: PropTypes.array.isRequired,
};
