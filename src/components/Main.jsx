import { Table } from "../components";
import React, { useEffect, useState } from "react";
import { GetCountries } from "api";
import { TextField } from "./TextField";
import { Box, CircularProgress } from "@mui/material";

export default function Main() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    async function getCountriesAsync() {
      const response = await GetCountries();
      setCountries(response);
    }
    getCountriesAsync();
  }, []);
  return (
    <>
      {!countries ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "90vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box margin="16px">
          <TextField data={countries} />
          <Table data={countries} />
        </Box>
      )}
    </>
  );
}
