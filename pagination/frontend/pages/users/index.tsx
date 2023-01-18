import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

type UserData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
};

function UsersList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserData[]>([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    const response = await axios({
      method: "get",
      url: `http://localhost:4000/api/v1/users`,
      params: { page, search },
    });
    const { users_perpage, total_page } = response.data;
    setUsers(users_perpage);
    setPages(total_page);
  };

  useEffect(() => {
    getUsers();
  }, [page, search]);

  const handleChangePage = ({ selected }: { selected: number }) => {
    console.log(selected); // selected dimulai dari 0
    setPage(selected + 1);
    if (selected === 9) {
      setMessage(
        "jika data yang anda cari belum ketemu, maka cari di kolom pencarian!"
      );
    } else {
      setMessage("");
    }
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(keyword);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Users List</h1>
      <div className="d-flex justify-content-center">
        <div className="mb-3 w-50 ">
          <form onSubmit={handleOnSubmit} className="d-flex">
            <input
              type="text"
              className="form-control"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
              placeholder="search name by keyword..."
            />
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
          </form>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + (page - 1) * 10 + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="my-3">
        page : {page} of {pages}
      </p>
      {message && <p className="text-danger text-center">{message}</p>}

      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ReactPaginate
          previousLabel="< Prev"
          nextLabel="Next >"
          pageCount={Math.min(10, pages)}
          onPageChange={handleChangePage}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="page-item active"
          disabledClassName="disabled"
          breakLabel="&nbsp; ... &nbsp;"
        />
      </nav>
    </div>
  );
}

export default UsersList;
