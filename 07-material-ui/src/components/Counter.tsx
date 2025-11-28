import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface IState {
  count: number;
}

const Counter: React.FC = () => {
  const [state, setState] = useState<IState>({ count: 0 });

  const incrCount = () => setState({ count: state.count + 1 });

  const decrCount = () =>
    setState({
      count: state.count > 0 ? state.count - 1 : 0,
    });

  return (
    <Grid container spacing={3} sx={{ m: "0.5rem" }}>
      <Card
        sx={{
          m: "0.5rem",
          boxShadow: "0 0 3px black",
          backgroundColor: "#e4f8e4",
        }}
      >
        <CardContent>
          <Typography variant="h4">{state.count}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              onClick={incrCount}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Increment
            </Button>

            <Button onClick={decrCount} variant="contained" color="secondary">
              Decrement
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Counter;
