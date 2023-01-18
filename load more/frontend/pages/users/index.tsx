import axios from "axios";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";

type UserData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
};

function UsersList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserData[]>([]);
  const [dataAvailable, setDataAvailable] = useState(true);

  const getUsers = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/users",
      params: { page },
    });

    const { users: newUsers } = response.data;
    if (newUsers.length === 0) {
      setDataAvailable(false);
    }
    setUsers([...users, ...newUsers]);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const handleCLickLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(page + 1);
  };

  return (
    <div className="container">
      <h1 className="my-4">Users List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {dataAvailable && (
        <button
          className="btn btn-primary mx-auto"
          onClick={handleCLickLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default UsersList;
