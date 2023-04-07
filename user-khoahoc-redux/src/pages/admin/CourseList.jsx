import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetAllCoursePageQuery,
} from "../../app/service/couresService";

function CourseList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error } = useGetAllCoursePageQuery(currentPage);

    
    

  const [deleteCourse] = useDeleteCourseMutation();

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>Error : {error}</h2>;
  }

  const handlerDelete = (id) => {
    deleteCourse(id)
      .unwrap()
      .then(() => alert("xóa thành công"))
      .catch((err) => alert(err));
  };

  console.log(data);

  const totalPages = Math.ceil(data.totalItems / pageSize);

  return (
    <div className="course-list mt-4 mb-4">
      <div className="container">
        <div className="mb-4">
          <Link
            to={"/admin/khoa-hoc/tao-khoa-hoc"}
            className="btn-custom btn-create-course"
          >
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>
            Tạo khóa học
          </Link>
          <Link to={"/admin/khoa-hoc"} className="btn-custom btn-refresh" onClick={() => setCurrentPage(1)}>
            <span>
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
            Refresh
          </Link>
        </div>

        <div className="course-list-inner p-2">
          <table className="table course-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khóa học</th>
                <th>Hình thức</th>
                <th>Chủ đề</th>
              </tr>
            </thead>
            <tbody>
              {data.data.length > 0 &&
                data.data.map((c, index) => (
                  <tr key={c.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>
                      <Link to={`/admin/khoa-hoc/${c.id}`}>{c.name}</Link>
                    </td>
                    <td className="text-info"> {c.type} </td>
                    <td>
                      {c.categories.map((category) => category.name).join(",")}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handlerDelete(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            prev
          </button>
          <button
            className="btn btn-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseList;
