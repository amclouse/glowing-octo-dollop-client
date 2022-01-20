import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import AppsCreate from "./AppsCreate";
import ApplicationsUpdate from "./ApplicationsUpdate";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function BasicTable({ token }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState([]);
  const [companyName, setcompanyName] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState(false);

  const getApplications = async () => {
    await fetch("http://localhost:4000/apps/myApps", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        console.log(data);
      });
  };

  const deleteApp = (app) => {
    fetch(`http://localhost:4000/apps/delete/${app}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    }).then(() => getApplications());
  };

  useEffect(() => {
    getApplications();
    console.log(apps);
  }, [])

  return (
    <div
      style={{
        width: "100%",
        margin: "1em",
        alignItems: "center",
        float: "right",
      }}
    >
      <div style={{ margin: "1em" }}>
        <AppsCreate getApplications={getApplications} token={token} />
      </div>
      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Reponse</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apps.map((application) => (
              <TableRow key={application.id}>
                <TableCell component="th" scope="row">
                  {application.companyName}
                </TableCell>
                <TableCell align="right">{application.role}</TableCell>
                <TableCell align="right">{application.response}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <Button onClick={() => {deleteApp(application.id)}} ><DeleteIcon></DeleteIcon></Button>
                <ApplicationsUpdate token={token} getApplications={getApplications} application={application} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
