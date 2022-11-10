import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function Header() {
  return (
    <Container>
      <Stack spacing={2} marginTop={3} direction="row">
        <Button variant="text" href="/">
          Home
        </Button>
        <Button variant="text" href="/add" color="success">
          Add Post
        </Button>
        <Button variant="text" href="/addStudent" color="warning">
          Add Student
        </Button>
      </Stack>
    </Container>
  );
}

export default Header;
