import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Axios from 'axios'

const Dashboard = () => {
    //store the user data
    const [employeeList, setEmployeeList] = useState([]);
    //destructuring the user data
    const { _id, firstName, lastName, email, contact, profession, salary } = employeeList;
    const history = useHistory();
    useEffect(() => {
        Axios.get(`/getEmployees`)
            .then((res) => {
                setEmployeeList(res.data)
            })
    }, [])

    useEffect(() => {
        Axios.get(`/dashboard`)
            .then((res) => {
                setEmployeeList(res.data)
            })
            .catch(err => {
                //not authenticated then navigate to login page
                console.log(err);
                history.push('/signin')
            })
    }, [])


    const handleDelete = (id) => {
        Axios.delete(`/deleteUser/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log("error" + err);
            })
    }

    return (
        <div className="das-main-div">
            <div className="list-div">
                <div className="employeeData" >
                    <div className="employeeFeild">
                        <label>FirstName:-</label>
                        <p>{firstName}</p>
                    </div>
                    <div className="employeeFeild">
                        <label>LastName:-</label>
                        <p>{lastName}</p>
                    </div>
                    <div className="employeeFeild">
                        <label>Email:-</label>
                        <p>{email}</p>
                    </div>
                    <div className="employeeFeild">
                        <label>Contact:-</label>
                        <p>{contact}</p>
                    </div>
                    <div className="employeeFeild">
                        <label>Profession:-</label>
                        <p>{profession}</p>
                    </div>
                    <div className="employeeFeild">
                        <label>Salary:-</label>
                        <p>{salary}</p>
                    </div>
                    <div className="functionalButtons">
                        <NavLink to={`/editUser/:?id=${_id}`}>
                            <button>Edit</button>
                        </NavLink>
                        <button onClick={() => handleDelete(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;