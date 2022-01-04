import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { TextField } from "@material-ui/core";
import "./App.css";
import { NavLink, useHistory } from "react-router-dom";
import sideImg from "../src/employee.jpg";
import { Form, Button } from "antd";
import { useFormik } from "formik";
import queryString from 'query-string';

const Signup = () => {
    //navigate the page
    const history = useHistory();
    //for store the edited user data
    const [editedData, seteditedData] = useState([])
    //gert edited user id
    const { id } = queryString.parse(window.location.search)

    //use UseFormik
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            profession: "",
            salary: "",
            password: "",
            confirmPassword: "",
        },

        onSubmit: (values) => {
            //update the user data
            if (id) {
                Axios.put(`/updateUser/${id}`, values)
                    .then(() => {
                        history.push('/dashboard');
                    })
                    .catch(err => {
                        console.log("error: " + err)
                    })
            }

            else {
                //add new user
                if (values.password === values.confirmPassword) {
                    Axios.post(`/signUp`, values)
                        .then((res) => {
                            alert("You are Register Successfully");
                            history.push('/signIn');
                        })
                } else {
                    alert("confirm password not match")
                }


            }
        }
    });

    //for getting the edited user data
    useEffect(() => {
        if (id) {
            Axios.get(`/editUser/${id}`)
                .then(res => {
                    seteditedData(res.data);
                })
                .catch(err => {
                    console.log("error: " + err);
                })
        }
    }, [id]);


    //set inputfield when editedData state changed
    useEffect(() => {
        if (id && editedData) {
            formik.setValues(editedData)
        }
    }, [editedData])



    return (
        <>
            <div className="main-div">
                <form className="signupUser" onSubmit={formik.handleSubmit}>
                    <h2>
                        <strong>SIGN UP</strong>
                    </h2>

                    <TextField
                        label="First Name"
                        variant="standard"
                        name="firstName"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <TextField
                        label="Last Name"
                        variant="standard"
                        name="lastName"
                        type="text"

                        required
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        name="email"
                        type="email"

                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <TextField
                        label="Contact"
                        variant="standard"
                        name="contact"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.contact}
                    />
                    <TextField
                        label="profession"
                        variant="standard"
                        name="profession"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.profession}
                    />
                    <TextField
                        label="salary"
                        variant="standard"
                        name="salary"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.salary}
                    />
                    <TextField
                        label="Password"
                        variant="standard"
                        name="password"
                        type="password"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        name="confirmPassword"
                        required
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />

                    <div className="Bottom-class">
                        {!id ?
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="signup-btn"
                                // onClick={settoggleButton(true)}
                                >
                                    SIGN UP
                                </Button>
                            </Form.Item>
                            : (
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="signup-btn"
                                    // onClick={settoggleButton(false)}
                                    // onClick={() => dispatch(updateSelectedUserdata())}
                                    >
                                        UPDATE
                                    </Button>
                                </Form.Item>
                            )}
                    </div>
                    <NavLink to="/signIn">I have already Registered</NavLink>
                </form>

                <div className="Side-image">
                    <img className="img" src={sideImg} alt="side view" />
                </div>
            </div>
        </>
    );
};

export default Signup;