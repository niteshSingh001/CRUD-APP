import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";

function Home() {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const [loading, setLoading] = useState(true);
  const getdata = async (e) => {
    try {
      const res = await fetch("https://crud-app-ygjt.onrender.com/getdata", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      const data = await res.json();
      console.log(data);
      if (res.status === 422 || !data) {
        console.log("error");
      } else {
        setUserdata(data);
        setLoading(false);
        console.log("Get Data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
      console.log("user deleted");
      getdata();
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <Link to="/register" className="btn btn-primary">
              Add Data
            </Link>
          </div>
          {loading ? (
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
              Loading...
            </h3>
          ) : (
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, id) => (
                  <tr key={id + 1}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <Link to={`/view/${element._id}`}>
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </Link>
                      <Link to={`/edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <CreateIcon />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteuser(element._id)}
                        className="btn btn-danger"
                      >
                        <DeleteOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
