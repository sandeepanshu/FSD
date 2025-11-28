import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface IState {
  message: string;
}

const WishMessage: React.FC = () => {
  const [state, setState] = useState<IState>({
    message: "Hello",
  });

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Card
        sx={{
          m: 1,
          boxShadow: "0 0 3px black",
          backgroundColor: "#e4f8e4",
        }}
      >
        <CardHeader
          title="Wish Message"
          sx={{ backgroundColor: "teal", color: "white" }}
        />

        <CardContent>
          <Typography variant="h4">{state.message}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState({ message: "Good Morning" })}
              sx={{ mr: 1 }}
            >
              Good Morning
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setState({ message: "Good Afternoon" })}
              sx={{ mr: 1 }}
            >
              Good Afternoon
            </Button>

            <Button
              variant="contained"
              onClick={() => setState({ message: "Good Evening" })}
            >
              Good Evening
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WishMessage;
