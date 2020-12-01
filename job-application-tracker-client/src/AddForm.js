import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Button, Snackbar } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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

  // textfields: {
  //   display: "flex",
  //   flexFlow: "row wrap",
  //   justifyContent: "space-evenly",

  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: "25ch",
  //   },
  // },
}));

const applyStatuses = ["Applied", "Interviewing", "Rejected"];

function AddForm() {
  const classes = useStyles();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleCloseSnakeBar = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const params = {
      title: jobTitle,
      note: note,
      status: status,
      location: location,
      company: company,
      description: description,
    };

    axios
      .post("/jobs", params, { crossDomain: true })
      .then(function (response) {
        console.log(response.data);
        setOpen(true);
        document.getElementById("ad-title").value = "";
        document.getElementById("ad-company").value = "";
        document.getElementById("ad-location").value = "";
        document.getElementById("ad-note").value = "";
        document.getElementById("ad-description").value = "";
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.grow}>
        <TextField
          id={"ad-title"}
          style={{ margin: 8 }}
          fullWidth
          label={"Job Title"}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <TextField
          id={"ad-company"}
          className={classes.textfield}
          label={"Company"}
          onChange={(e) => setCompany(e.target.value)}
        />
        <TextField
          id={"ad-location"}
          className={classes.textfield}
          label={"Location"}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          variant={"filled"}
          className={classes.textfield}
          label={"Status"}
          value={status}
          select
          onChange={(e) => setStatus(e.target.value)}
        >
          {applyStatuses.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id={"ad-note"}
          style={{ margin: 8 }}
          fullWidth
          label={"Note"}
          onChange={(e) => setNote(e.target.value)}
        />
        <TextField
          id="ad-description"
          style={{ margin: 8 }}
          fullWidth
          multiline
          rows={5}
          InputLabelProps={{
            shrink: true,
          }}
          variant={"outlined"}
          label={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={classes.center}>
        <Button onClick={handleSubmit} color={"primary"} variant={"outlined"}>
          Submit
        </Button>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleCloseSnakeBar}
        autoHideDuration={6000}
        message={"Add Successful"}
      />
    </div>
  );
}

export default AddForm;
