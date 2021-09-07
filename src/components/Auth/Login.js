import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    color: "white",
  },
  textField: {
    color: "white",
  },
}));

const Login = ({ updateToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // console.log(username, password);
    event.preventDefault();
    if (username && password) {
      fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          user: { username: username, password: password },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
          updateToken(data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill out all fields");
    }
  };

  const classes = useStyles();

  return (
    <div style={{margin: '1em'}}>
      <h1>Login</h1>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          id="input-with-icon-adornment"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </div>
  );
};

export default Login;
