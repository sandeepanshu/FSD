import React, { useState } from "react";
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IProduct {
  sno: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface IState {
  products: IProduct[];
}

const ShoppingCart: React.FC = () => {
  const [productState, setProductState] = useState<IState>({
    products: [
      // your product list remains unchanged
      {
        sno: "AA00AB12",
        name: "Mi Watch",
        image: "data:image/jpeg;base64,...", // trimmed
        price: 2500,
        qty: 2,
      },
      {
        sno: "AA00AB13",
        name: "Apple Watch",
        image: "data:image/jpeg;base64,...",
        price: 8500,
        qty: 2,
      },
      {
        sno: "AA00AB14",
        name: "Oppo Watch",
        image: "data:image/jpeg;base64,...",
        price: 3500,
        qty: 2,
      },
    ],
  });

  const incrQty = (sno: string) => {
    setProductState((prev) => ({
      products: prev.products.map((p) =>
        p.sno === sno ? { ...p, qty: p.qty + 1 } : p
      ),
    }));
  };

  const decrQty = (sno: string) => {
    setProductState((prev) => ({
      products: prev.products.map((p) =>
        p.sno === sno ? { ...p, qty: p.qty > 1 ? p.qty - 1 : 1 } : p
      ),
    }));
  };

  const { products } = productState;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <TableContainer
        component={Card} sx={{ p: 2 }}
      >
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
            {products.map((product) => (
              <TableRow
                key={product.sno}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{product.sno}</TableCell>

                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>

                <TableCell>
                  <RemoveCircleIcon
                    onClick={() => decrQty(product.sno)}
                    sx={{ color: "teal", cursor: "pointer", mr: 1 }}
                  />

                  <strong>{product.qty}</strong>

                  <AddCircleIcon
                    onClick={() => incrQty(product.sno)}
                    sx={{ color: "teal", cursor: "pointer", ml: 1 }}
                  />
                </TableCell>

                <TableCell>{product.price * product.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ShoppingCart;
