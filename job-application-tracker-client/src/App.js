import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar,
  Container,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddForm from "./AddForm";
import axios from "axios";
import Jobs from "./Jobs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function App() {
  const sopt = {
    searchByCompany: 1,
    // searchByLId: 2,
  };
  const classes = useStyles();
  const [searchOpt, setSearchOpt] = useState(sopt.searchByCompany);
  const [searchKey, setSearchKey] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSearchOpt = (e) => {
    setSearchOpt(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchKey(e.target.value);
    console.log(searchKey);
  };

  const handleSubmitSearch = () => {
    axios
      .get("/jobs/sc?company=" + searchKey)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleUpdatedJob = () => {
    handleSubmitSearch();
  }

  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <Typography variant={"h5"}>JAT</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id={"id-search-key"}
              onChange={handleSearchInput}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <Select value={searchOpt} onChange={handleSearchOpt}>
              <MenuItem value={sopt.searchByCompany}>by company</MenuItem>
              {/* <MenuItem value={sopt.searchByLId}>by linkedinId</MenuItem> */}
            </Select>
            <Button
              style={{ marginLeft: "2px" }}
              variant={"outlined"}
              color={"secondary"}
              onClick={handleSubmitSearch}
            >
              Search
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <AddForm />
        <Jobs jobs={jobs} handleUpdatedJob={handleUpdatedJob} />
      </Container>
    </div>
  );
}

export default App;
