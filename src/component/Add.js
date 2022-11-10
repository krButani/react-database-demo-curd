import * as React from "react";
import Container from "@mui/material/Container";
import Header from "./inc/header";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

function Add() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    title: "",
    descr: "",
    titleErr: "",
    descrErr: ""
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitToServerWithFetch = () => {
    let status = false;

    if (values.descr.trim() == "") {
      setValues({ ...values, ["descrErr"]: "Description is required." });
      status = true;
    }

    if (values.title.trim() == "") {
      setValues({ ...values, ["titleErr"]: "Title is required." });
      status = true;
    }

    if (status == false) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: {
          title: values.title,
          body: values.descr,
          userId: "1"
        }
      })
        .then((data) => data.json())
        .then((data) => {
          //console.log(data)
          navigate("/", {
            replace: true,
            state: { status: true, succ: "Post Added Successfully." }
          });
          return data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const submitToServerWithAxios = () => {
    let status = false;

    if (values.descr.trim() == "") {
      setValues({ ...values, ["descrErr"]: "Description is required." });
      status = true;
    }

    if (values.title.trim() == "") {
      setValues({ ...values, ["titleErr"]: "Title is required." });
      status = true;
    }

    if (status == false) {
      var kpost = {
        title: values.title,
        body: values.descr,
        userId: "1"
      };
      axios
        .post(`https://jsonplaceholder.typicode.com/posts`, { kpost })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/", {
            replace: true,
            state: { status: true, succ: "Post Added Successfully." }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Container>
      <Header />

      <Box marginX={4}>
        <Grid container spacing={2}>
          <Grid xs={3}></Grid>
          <Grid xs={6} paddingY={3}>
            <Item>
              <Typography variant="h4" marginTop={2} marginX={4} gutterBottom>
                Add Post
              </Typography>
              <FormControl fullWidth>
                <TextField
                  error={values.titleErr != "" ? true : false}
                  helperText={values.titleErr}
                  id="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange("title")}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  error
                  helperText="Incorrect entry."
                  multiline
                  rows={4}
                  value={values.descr}
                  onChange={handleChange("descr")}
                  error={values.descrErr != "" ? true : false}
                  helperText={values.descrErr}
                />
              </FormControl>
              <Button
                variant="contained"
                style={{ marginTop: 10 }}
                onClick={submitToServerWithAxios}
              >
                Submit
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Add;
