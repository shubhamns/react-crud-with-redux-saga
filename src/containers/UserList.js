import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUserById } from "./../redux/actions/user";

const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.user?.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    const result = window.confirm("Are you sure to delete this user?");
    if (result) {
      dispatch(deleteUserById(id));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">User List</h1>
      <Link to={"/create"}>
        <button className="btn btn-primary ml-auto">Create User</button>
      </Link>
      {usersList.length === 0 ? (
        <p className="text-center my-4 text-bold">NO RECORDS FOUND...</p>
      ) : (
        <table className="table my-4">
          <thead>
            <tr>
              <th>
                <abbr title="Position">SNo.</abbr>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <Link to={`/update/${item._id}`}>
                        <button className="btn btn-success mx-1">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
