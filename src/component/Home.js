import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Header from "./inc/header";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toast";
import Button from "@mui/material/Button";

import axios from "axios";


function Home() {
  let location = useLocation();
  let history = useNavigate();

  const [makeRows, setMakeRows] = useState([]);

  const getDataWithFetch = () => {
    // first then is used to fetch data
    // second then is like try catch
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => {
        const kc = data.map((d) => {
          return {
            title: d.title,
            body: d.body,
            id: d.id,
            userId: d.userId,
            disa: false
          };
        });

        //console.log(typeof kc);

        if (typeof kc == "object") {
          if (kc.length > 0) {
            setMakeRows(kc);
          }
        }
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataWithAxios = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        let data = res.data;
        const kc = data.map((d) => {
          return {
            title: d.title,
            body: d.body,
            id: d.id,
            userId: d.userId,
            disa: false
          };
        });

        //console.log(typeof kc);

        if (typeof kc == "object") {
          if (kc.length > 0) {
            setMakeRows(kc);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDataWithAxios();
  }, []);

  function getSuccessMsg() {
    if (
      location.hasOwnProperty("state") &&
      location.state != null &&
      location.state.hasOwnProperty("succ") &&
      location.state.succ.toString() !== ""
    ) {
      return (
        <Box sx={{ marginX: 4, marginBottom: 2 }}>
          <Alert severity="success">{location.state.succ}</Alert>
        </Box>
      );
    } else {
      return "";
    }
  }
  window.onbeforeunload = function (event) {
    if (
      location.hasOwnProperty("state") &&
      location.state != null &&
      location.state.hasOwnProperty("succ") &&
      location.state.succ.toString() !== ""
    )
      history("/", { replace: true, state: {} });
  };

  const handleDeleteWithFetch = (e, postIndex, id) => {
    let newData = makeRows[postIndex];
    newData.disa = true;
    setMakeRows((prevPosts) => [
      ...prevPosts.slice(0, postIndex),
      newData,
      ...prevPosts.slice(postIndex + 1)
    ]);

    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => {
        toast.success("Record deleted successfully!!");
        setMakeRows((prevPosts) =>
          prevPosts.filter((_, index) => index !== postIndex)
        );
        return data;
      })
      .catch((error) => {
        console.error(error);
        newData.disa = false;
        setMakeRows((prevPosts) => [
          ...prevPosts.slice(0, postIndex),
          newData,
          ...prevPosts.slice(postIndex + 1)
        ]);
      });
  };

  const handleDeleteWithAxios = (e, postIndex, id) => {
    let newData = makeRows[postIndex];
    newData.disa = true;
    setMakeRows((prevPosts) => [
      ...prevPosts.slice(0, postIndex),
      newData,
      ...prevPosts.slice(postIndex + 1)
    ]);

    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((res) => {
        let data = res.data;
        toast.success("Record deleted successfully!!");
        setMakeRows((prevPosts) =>
          prevPosts.filter((_, index) => index !== postIndex)
        );
      })
      .catch((error) => {
        console.error(error);
        newData.disa = false;
        setMakeRows((prevPosts) => [
          ...prevPosts.slice(0, postIndex),
          newData,
          ...prevPosts.slice(postIndex + 1)
        ]);
      });
  };

  const getURLCK = (e, id) => {
    history(`/add/${id}`, { replace: true });
  };

  return (
    <Container>
      <Header />

      <Typography variant="h4" marginTop={2} marginX={4} gutterBottom>
        Display Post
      </Typography>
      {getSuccessMsg()}

      <Box sx={{ marginX: 4, marginBottom: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {makeRows?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.body.substr(0, 50)}...</TableCell>
                  {/* <TableCell align="right"  onClick={handleCellClick}>*/}
                  <TableCell align="right">
                    <Stack spacing={2} marginTop={3} direction="row">
                      <Button
                        variant="contained"
                        id={row.id}
                        size="small"
                        color="warning"
                        onClick={(e) => getURLCK(e, row.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        id={row.id}
                        disabled={row.disa}
                        size="small"
                        color="error"
                        onClick={(e) => handleDeleteWithAxios(e, index, row.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer position="top-right" />
    </Container>
  );
}

export default Home;
