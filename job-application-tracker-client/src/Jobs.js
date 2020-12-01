import React from "react";
import Job from "./Job";
import { makeStyles } from "@material-ui/core/styles";
import UpdateForm from "./UpdateForm";
import {
  Snackbar
} from "@material-ui/core";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function Jobs({ jobs, handleUpdatedJob }) {
  const classes = useStyle();
  const [showModal, setShowModal] = React.useState(false);
  const [updatingJob, setUpdatingJob] = React.useState({
    id: "",
    date: "",
    description: "",
    company: "",
    location: "",
    note: "",
    status: "",
    title: "",
  });
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleCloseSnakeBar = () => {
    setOpen(false);
  };

  const handleUpdatingJob = (params) => {

    if (
      params.title === updatingJob.title &&
      params.location === updatingJob.location &&
      params.description === updatingJob.description &&
      params.company === updatingJob.company &&
      params.note === updatingJob.note &&
      params.status === updatingJob.status
    ) {
      console.log("no change in job details");
      setSnackbarMsg("No change in job details");
      setOpen(true);
      return;
    }

    axios
      .put("/jobs/" + updatingJob.id, params)
      .then(function (response) {
        setSnackbarMsg("Update Successful");
        setOpen(true);
        handleUpdatedJob();
        console.log(response.data);
      })
      .catch(function (err) {
        setSnackbarMsg("Update Unsuccessful");
        setOpen(true);
        console.log(err);
      });

  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        {jobs.map((job, index) => (
          <Job
            key={index}
            job={job}
            setShowModal={setShowModal}
            setUpdatingJob={setUpdatingJob}
          />
        ))}
      </div>
      {showModal ? (
        <UpdateForm
          job={updatingJob}
          setShowModal={setShowModal}
          handleUpdatingJob={handleUpdatingJob}
        />
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleCloseSnakeBar}
        autoHideDuration={3000}
        message={snackbarMsg}
      />
    </React.Fragment>
  );
}

export default Jobs;
