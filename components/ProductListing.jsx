"use client";

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ProductListing() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/products`);
    const data = await response.json();
    console.log(data);
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className="overflow-scroll products_table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="font-bold">Title</TableCell>
              <TableCell align="left" className="font-bold">Price</TableCell>
              <TableCell align="left" className="font-bold">Rating</TableCell>
              <TableCell align="left" className="font-bold">Brand</TableCell>
              <TableCell align="left" className="font-bold">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductListing;
