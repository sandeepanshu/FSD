import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

interface IState {
  currentTime: string;
}

const DigitalWatch: React.FC = () => {
  const [state, setState] = useState<IState>({
    currentTime: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        currentTime: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={5} sx={{ p: 6 }}>
      <Card
        sx={{
          m: 1,
          boxShadow: "0 0 3px black",
          backgroundColor: "#e4f8e4",
        }}
      >
        <CardHeader
          title="Digital Watch"
          sx={{ backgroundColor: "teal", color: "white" }}
        />
        <CardContent>
          <Typography variant="h2">{state.currentTime}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DigitalWatch;
