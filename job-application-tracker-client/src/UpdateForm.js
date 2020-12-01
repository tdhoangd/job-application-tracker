import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    position: "absolute",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  root: {},

  grow: {
    display: "flex",
    flexWrap: "wrap",
  },

  textfield: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const applyStatuses = ["Applied", "Interviewing", "Rejected"];

export default function UpdateForm({ job, setShowModal, handleUpdatingJob }) {
  const classes = useStyles();

  const [updatedTitle, setUpdatedTitle] = useState(job.title);
  const [updatedCompany, setUpdatedCompany] = useState(job.company);
  const [updatedNote, setUpdatedNote] = useState(job.note);
  const [updatedStatus, setUpdatedStatus] = useState(job.status);
  const [updatedLocation, setUpdatedLocation] = useState(job.location);
  const [updatedDescription, setUpdatedDescription] = useState(job.description);

  const handleClickUpdate = () => {
    setShowModal(false);

    const params = {
      ...job,
      title: updatedTitle,
      company: updatedCompany,
      note: updatedNote,
      status: updatedStatus,
      location: updatedLocation,
      description: updatedDescription,
    };

    handleUpdatingJob(params);
  };

  return (
    <Modal
      BackdropComponent={Backdrop}
      open={true}
      onClose={handleClickUpdate}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <div className={classes.root}>
          <div className={classes.grow}>
            <TextField
              style={{ margin: 8 }}
              fullWidth
              label={"Job Title"}
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <TextField
              className={classes.textfield}
              label={"Company"}
              value={updatedCompany}
              onChange={(e) => setUpdatedCompany(e.target.value)}
            />
            <TextField
              className={classes.textfield}
              label={"Location"}
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
            />
            <TextField
              variant={"filled"}
              className={classes.textfield}
              label={"Status"}
              value={updatedStatus}
              select
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              {applyStatuses.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ margin: 8 }}
              fullWidth
              label={"Note"}
              value={updatedNote}
              onChange={(e) => setUpdatedNote(e.target.value)}
            />
            <TextField
              style={{ margin: 8 }}
              fullWidth
              multiline
              rows={9}
              InputLabelProps={{
                shrink: true,
              }}
              variant={"outlined"}
              label={"Description"}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
          <div className={classes.center}>
            <Button
              onClick={handleClickUpdate}
              color={"primary"}
              variant={"outlined"}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
