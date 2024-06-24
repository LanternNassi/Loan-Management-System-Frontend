// src/components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from '../state/authSlice';
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Custom_Axios } from "../../AxiosInstance";
import FeedBack from "../../components/FeedBack";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logging_in, set_logging_in] = useState(false);
  const [error, set_error] = useState(null);
  const [feedback , setfeedback] = React.useState(null)


  const CustomAxios = Custom_Axios("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    set_logging_in(true);
    CustomAxios.post("/Users/login", credentials).then((Response) => {
      if (Response.status == 200) {

        dispatch({ type: "add_login_info", User: Response.data });
        dispatch({ type: "add_token", token: Response.data.token });

        localStorage.setItem('User' , JSON.stringify(Response.data))

        setfeedback({
            'status' : 'success',
            'outlined' : true,
            'message' : 'Login successful. Welcome back ' + Response.data.username 
        })

        setTimeout(() => {
            setfeedback(null)
          navigate("/");
        }, 2500);
      }
    }).catch((reason)=>{
        setfeedback({
            'status' : 'error',
            'message' : 'Login unsuccessful'
        })

        setTimeout(()=>{
            setfeedback(null)
            set_logging_in(false)
        },2000)
    });

    // dispatch(loginUser(credentials)).then((action) => {
    //   if (loginUser.fulfilled.match(action)) {
    //     navigate('/dashboard');
    //   }
    // });
  };

  const token = useSelector((state) => state.AppReducer.User);

  console.log(token);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: 3,
      }}
    >
    <FeedBack outlined = {(feedback)? (feedback.outlined) : (false)} open ={(feedback != null)?(true):(false)} message={(feedback != null)?(feedback.message):('')} status={(feedback != null)?(feedback.status):('success')} />

      <Box
        sx={{
          width: 300,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
          />
          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error.message}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={logging_in}
          >
            {logging_in ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
