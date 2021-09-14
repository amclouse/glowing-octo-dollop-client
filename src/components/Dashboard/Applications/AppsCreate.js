import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import  Button  from "@material-ui/core/Button";


const AppsCreate = ({getApplications, token}) => {


  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState([])
  const [companyName, setcompanyName] = useState("")
  const [role, setRole] = useState("")
  const [date, setDate] = useState("")
  const [response, setResponse] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postApplication = async (e) => {
    await fetch('http://localhost:4000/apps/create', {
      method: 'POST',
      headers: new Headers ({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({ application: { companyName: companyName } })
    })
    .then(res => res.json())
    .then((appData) => {
      console.log(appData);
      setcompanyName(companyName);
      setRole(role);
      setResponse(response);
    })
    .then(getApplications())
  };


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
        }
      }));

      const classes = useStyles();


    return (
        <div>
            <h1>My apps</h1>
        <p1  >Add new application</p1>
        <Button
          variant="contained"
          color="default"
          style={{ height: "20px", margin: "3px", width: "25px" }}
          type="button"
          onClick={handleOpen}
        > 
          +
        </Button>
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
              <TextField value={companyName} onChange={(e) => setcompanyName(e.target.value)} label="Company"></TextField>
              <TextField value={role} onChange={(e) => setRole(e.target.value)} label="Role"></TextField>
              <TextField value={response} onChange={(e) => setResponse(e.target.value)} label="Response"></TextField>
              <Button variant="contained" color="secondary" onClick={postApplication} >Submit</Button>
            </div>
          </Fade>
        </Modal>
        </div>
    )
}

export default AppsCreate
