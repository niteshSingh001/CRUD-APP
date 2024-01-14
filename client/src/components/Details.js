import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate, useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [getuserdata, setUserdata] = useState([]);

  const getdata = async (e) => {
    const res = await fetch(
      `https://crud-app-ygjt.onrender.com/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log("Get Data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `https://crud-app-ygjt.onrender.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("errror");
    } else {
      navigate("/");
      console.log("user deleted");
    }
  };

  return (
    <div className="container mt-3 ">
      <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="row">
            <div className="add_btn">
              <Link to={`/edit/${getuserdata._id}`}>
                <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button>
              </Link>
              <button
                onClick={() => deleteuser(getuserdata._id)}
                className="btn btn-danger"
              >
                <DeleteOutlinedIcon />
              </button>
            </div>
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="" />
              <h3 className="mt-3">
                Name:<span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age:<span>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Email:<span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Occupation:<span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                Mobile:<span>+91{getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location:<span>{getuserdata.add}</span>
              </p>
              <p className="mt-3">
                Description:
                <span>{getuserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;
