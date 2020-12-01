import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: 400,
  },
  body1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bgDefault: {
    backgroundColor: "white",
  },
  bgGray: {
    backgroundColor: "#e8e8e8",
  },
  bgLightGreen: {
    backgroundColor: "#ccffcc",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function Job({ job, setShowModal, setUpdatingJob }) {
  const classes = useStyle();

  let bgColor;
  switch (job.status) {
    case "Rejected":
      bgColor = classes.bgGray;
      break;
    case "Interviewing":
      bgColor = classes.bgLightGreen;
      break;
    default:
      bgColor = classes.bgDefault;
      break;
  }

  const appliedDate = new Date(job.date);

  const handleClickEdit = () => {
    // handleUpdatingJob(job);
    setShowModal(true);
    console.log(job);
    setUpdatingJob(job);
  };

  return (
    <Card className={`${classes.root} ${bgColor}`}>
      <div className={classes.header}>
        <Typography variant={"h6"}>{job.title}</Typography>
        <IconButton
          onClick={handleClickEdit}
          className={classes.fixed}
          aria-label={"edit"}
        >
          <EditIcon />
        </IconButton>
      </div>
      <div className={classes.body1}>
        <Typography variant={"body1"}>{job.company}</Typography>
        <Typography variant={"body2"}>
          {appliedDate.toLocaleDateString()}
        </Typography>
      </div>
    </Card>
  );
}

export default Job;
