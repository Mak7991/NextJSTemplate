"use client";

import { useState, useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { getAllProducts } from "@app/api/getProducts/route";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const id = setTimeout(
      () => {
        setIsLoading(true);
        setFirstLoad(false);
        getAllProducts(searchQuery)
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((err) => {
            dispatch(
              Actions.showMessage({
                message: "Failed to fetch data, please refresh",
                variant: "error",
              })
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      firstLoad ? 0 : 1000
    );
    return (_) => {
      clearTimeout(id);
    };
  }, [searchQuery]);

  return (
    <div>
      <span>
        <TextField
          onChange={handleSearch}
          id="search-input"
          value={searchQuery}
          label="Search by title"
          fullWidth
          className="mb-2"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  id="search-icon"
                  onClick={() => {
                    document.getElementById("search-input").focus();
                  }}
                >
                  <img
                    alt="search-icon"
                    src="/assets/search-icon.svg"
                    height="80%"
                    width="80%"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </span>
      <TableContainer
        component={Paper}
        className="overflow-scroll products_table"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="font-bold">
                Title
              </TableCell>
              <TableCell align="left" className="font-bold">
                Price
              </TableCell>
              <TableCell align="left" className="font-bold">
                Rating
              </TableCell>
              <TableCell align="left" className="font-bold">
                Brand
              </TableCell>
              <TableCell align="left" className="font-bold">
                Category
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <CircularProgress size={35} />
                </TableCell>
              </TableRow>
            ) : !products.length && !firstLoad ? (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  No Products
                </TableCell>
              </TableRow>
            ) : (
              products?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.rating}</TableCell>
                  <TableCell align="left">{row.brand}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductListing;
