import * as React from 'react';
import Container from '@mui/material/Container';
import Header from './inc/header';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AddStudent() {
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        phone: '',
        image: undefined,
        nameErr: '',
        emailErr: '',
        phoneErr: '',
        imageErr: ''
    });

    const handleCapture = ( target ) => {

        //console.log(target.target.files[0]);
        setValues({ ...values, image: target.target.files[0] });
      /* fileReader.readAsDataURL(target.target.files[0]);
        fileReader.onload = (e) => {

        };*/
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitToServerWithFetch = () => {

        let status = false;
        setValues(pval => ({...pval,nameErr: "",emailErr: "",phoneErr:"",imageErr:""}));
        if(values.name.trim().toString() === "") {
            setValues(pval => ({...pval,nameErr: "Name is required." ,}));
            status = true;
        }

        if(values.email.trim().toString() === "") {
            setValues(pval => ({...pval,emailErr: "E-Mail Address is required." ,}));
            status = true;
        }

        if(values.phone.trim().toString() === "") {
            setValues(pval => ({...pval,phoneErr: "Mobile No. is required." ,}));
            status = true;
        }

        if(values.image === undefined) {
            setValues(pval => ({...pval,imageErr: "Profile image is required." ,}));
            status = true;
        }

        if(status === false) {
            var fd = new FormData();
            fd.append("token", values.name);
            fd.append("uname", values.name);
            fd.append("email", values.email);
            fd.append("mobileno", values.phone);
            fd.append("propic", values.image);
            fetch('http://localhost/apidemo/v1/create/',{
                method: 'POST',
                body: fd,
            }).then (data => data.json()).then (data => {
               // console.log(data)
                navigate('/',{replace:true,state:{status: true, succ: "Student Added Successfully."}});
                return data;
            }).catch((error) => {
                console.error(error)
            });
        }

    }


    const submitToServerWithAxios = () => {

        let status = false;
        setValues(pval => ({...pval,nameErr: "",emailErr: "",phoneErr:"",imageErr:""}));
        if(values.name.trim().toString() === "") {
            setValues(pval => ({...pval,nameErr: "Name is required." ,}));
            status = true;
        }

        if(values.email.trim().toString() === "") {
            setValues(pval => ({...pval,emailErr: "E-Mail Address is required." ,}));
            status = true;
        }

        if(values.phone.trim().toString() === "") {
            setValues(pval => ({...pval,phoneErr: "Mobile No. is required." ,}));
            status = true;
        }

        if(values.image === undefined) {
            setValues(pval => ({...pval,imageErr: "Profile image is required." ,}));
            status = true;
        }

        if(status === false) {
            var fd = new FormData();
            fd.append("token", values.name);
            fd.append("uname", values.name);
            fd.append("email", values.email);
            fd.append("mobileno", values.phone);
            fd.append("propic", values.image);

            axios({

                // Endpoint to send files
                url: "http://localhost/apidemo/v1/create/",
                method: "POST",
                /*headers: {

                    // Add any auth token here
                    authorization: "your token comes here",
                },*/

                // Attaching the form data
                data: fd,
            })

                // Handle the response from backend here
                .then((res) => {
                    navigate('/',{replace:true,state:{status: true, succ: "Student Added Successfully."}});
                })

                // Catch errors if any
                .catch((err) => {
                    console.error(err)
                });

        }

    }

    return (
        <Container>
            <Header/>

            <Box marginX={4}>
                <Grid container spacing={2}>
                    <Grid xs={3}>
                    </Grid>
                    <Grid xs={6} paddingY={3}>
                        <Item>
                            <Typography variant="h4" marginTop={2} marginX={4} gutterBottom>Add Students</Typography>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    error={(values.nameErr.toString() !== "") ? true :false}
                                    helperText={values.nameErr}
                                    id="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange('name')}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="dense">
                                <TextField
                                    error={(values.emailErr.toString() !== "") ? true :false}
                                    helperText={values.emailErr}
                                    id="email"
                                    label="E-Mail Address"
                                    value={values.email}
                                    type="email"
                                    onChange={handleChange('email')}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="dense">
                                <TextField
                                    error={(values.phoneErr.toString() !== "") ? true :false}
                                    helperText={values.phoneErr}
                                    id="phone"
                                    label="Mobile No."
                                    value={values.phone}
                                    onChange={handleChange('phone')}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="dense">
                              {/*  <Button
                                    variant="contained"
                                    component="label"

                                >
                                    Upload Profile Pic

                                </Button>*/}
                                <TextField
                                    accept="image/*"
                                    type="file"
                                    error={(values.imageErr.toString() !== "") ? true :false}
                                    helperText={values.imageErr}
                                    onChange={handleCapture}
                                />
                            </FormControl>
                            <Button variant="contained" style={{marginTop:10}} onClick={submitToServerWithAxios}>Submit</Button>
                        </Item>
                    </Grid>

                </Grid>


            </Box>
        </Container>
    );
}

export default AddStudent;
