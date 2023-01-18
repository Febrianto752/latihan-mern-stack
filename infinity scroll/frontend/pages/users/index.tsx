import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

type UserData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
};

function UsersList() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getUsers = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/users",
      params: { page, search: keyword },
    });

    const { users: newUser, limit } = response.data;

    if (newUser.length < limit) {
      setHasMore(false);
    }
    setUsers([...users, ...newUser]);
  };

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const fetchMore = () => {
    setPage(page + 1);
  };

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setHasMore(true);
    setUsers([]);
    setPage(1);
  };

  return (
    <div className="container">
      <h1 className="my-3">Users List</h1>
      <div className="d-flex justify-content-center">
        <div className="mb-3">
          <input
            value={keyword}
            type="text"
            className="form-control"
            onChange={handleSearchKeyword}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
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
      </InfiniteScroll>
    </div>
  );
}

export default UsersList;
