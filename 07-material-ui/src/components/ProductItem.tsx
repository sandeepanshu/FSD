import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IProduct {
  sno: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

const ProductItem: React.FC = () => {
  const [productState, setProductState] = useState<{ product: IProduct }>({
    product: {
      sno: "AA00AB12",
      name: "Mi Watch",
      image:
        "https://www.kamalwatch.com/cdn/shop/files/PLPEWGK0040301_1_1.jpg?v=1741861633&width=600",
      price: 2500,
      qty: 2,
    },
  });

  const incrQty = () => {
    setProductState((prev) => ({
      product: {
        ...prev.product,
        qty: prev.product.qty + 1,
      },
    }));
  };

  const decrQty = () => {
    setProductState((prev) => ({
      product: {
        ...prev.product,
        qty: prev.product.qty > 1 ? prev.product.qty - 1 : 1,
      },
    }));
  };

  const { product } = productState;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <TableContainer component={Card} sx={{ p: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "teal" }}>
              <TableCell sx={{ color: "white" }}>SNO</TableCell>
              <TableCell sx={{ color: "white" }}>Image</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>Qty</TableCell>
              <TableCell sx={{ color: "white" }}>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow hover>
              <TableCell>{product.sno}</TableCell>
              <TableCell>
                <img src={product.image} alt="" width={50} height={50} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell>
                <IconButton onClick={decrQty} color="primary">
                  <RemoveCircleIcon />
                </IconButton>

                <Typography component="span">{product.qty}</Typography>

                <IconButton onClick={incrQty} color="primary">
                  <AddCircleIcon />
                </IconButton>
              </TableCell>

              <TableCell>{product.price * product.qty}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ProductItem;
