import React, { useState } from "react";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@mui/material";

interface IState {
  username: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [state, setState] = useState<IState>({
    username: "",
    email: "",
    password: "",
  });

  const [terms, setTerms] = useState(false);

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
    >
      <Card sx={{ borderRadius: 2, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
        <CardHeader
          title="Registration"
          sx={{
            backgroundColor: "teal",
            color: "white",
            textAlign: "center",
            py: 2,
          }}
        />

        <CardContent
          sx={{
            backgroundColor: "#ffeeba",
            p: 3,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2, // PERFECT SPACING
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              value={state.username}
              name="username"
              onChange={updateForm}
              label="Username"
              variant="outlined"
            />

            <TextField
              fullWidth
              value={state.email}
              name="email"
              onChange={updateForm}
              label="Email"
              variant="outlined"
            />

            <TextField
              fullWidth
              value={state.password}
              name="password"
              onChange={updateForm}
              label="Password"
              type="password"
              variant="outlined"
            />

            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  color="primary"
                />
              }
              label="Accept Terms & Conditions"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, py: 1.2 }}
            >
              Register
            </Button>
          </Box>

          <Typography
            variant="h6"
            sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
          >
            {state.username}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Registration;
