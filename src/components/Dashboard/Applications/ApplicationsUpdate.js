import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ApplicationsUpdate( { application, getApplications, token} ) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editCompanyName, setEditCompanyName] = useState(application.companyName);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editApplication = async (e) => {
      e.preventDefault();
      await fetch(`http://localhost:4000/apps/update/${application.id}`, {
          method: 'PUT',
          body: JSON.stringify({ companyName: editCompanyName }),
          headers: new Headers({
              'Content-Type' : 'application/json',
              'Authorization' : token
          })
      })
      .then(res => {
          getApplications()
      }) 
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
            <Input value={editCompanyName} onChange={(e) => setEditCompanyName(e.target.value)} ></Input>
            <Button onClick={editApplication} >Update</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
