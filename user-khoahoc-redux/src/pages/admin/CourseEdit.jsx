import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
  useUpdateAvatarMutation,
} from "../../app/service/couresService";
import {
  getCategoryOptions,
  getTypeOptions,
  getUserOptions,
} from "./options/options";
import useFetchQuery from "./hooks/useFetchQuery";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "./schemas/schemas";

function CourseEdit() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const { data, isError, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [deleteCourse] = useDeleteCourseMutation();

  const { users, categories } = useFetchQuery();
  const userOptions = getUserOptions(users);
  const categoryOptions = getCategoryOptions(categories);
  const typeOptions = getTypeOptions();

  console.log(data, isLoading);
  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>Error : {error}</h2>;
  }
  if (!data) {
    return <div>không có thông tin nào</div>;
  }

  const handlerDelete = (id) => {
    deleteCourse(id)
      .unwrap()
      .then(() => {
        navigate("/admin/khoa-hoc");
      })
      .catch((err) => alert(err));
  };


  const handlerUploadAvatar = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageFile(file);
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };





  return (
    <div className="course-list mt-4 mb-4">
      <div className="container">
        <form action="">
          <div className="mb-4 d-flex justify-content-between">
            <div>
              <button className="btn-custom btn-update-course" type="submit">
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
                Cập nhật
              </button>
              <Link to={"/admin/khoa-hoc"} className="btn-custom btn-refresh">
                <span>
                  <i className="fa-solid fa-angle-left"></i>
                </span>
                Quay lại
              </Link>
            </div>
            <div>
              <button
                className="btn-custom btn-delete-course bg-danger"
                onClick={() => handlerDelete(data.id)}
              >
                <span>
                  <i className="fa-solid fa-trash-can"></i>
                </span>
                Xóa
              </button>
            </div>
          </div>

          <div className="course-list-inner p-2">
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="course-name" className="form-label fw-bold">
                    Tên khóa học
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="course-name"
                    value={data.name}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="course-description"
                    className="form-label fw-bold"
                  >
                    Mô tả
                  </label>
                  <textarea
                    className="form-control"
                    id="course-description"
                    rows="10"
                    readOnly
                    value={data.description}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="course-type" className="form-label fw-bold">
                    Hình thức học
                  </label>
                  <Select
                    readOnly
                    defaultValue={{ label: data.type, value: data.type }}
                    options={typeOptions}
                    isDisabled
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course-topic" className="form-label fw-bold">
                    Chủ đề
                  </label>
                  <Select
                    isMulti
                    defaultValue={data.categories.map((categorie) => ({
                      label: categorie.name,
                      value: categorie.id,
                    }))}
                    options={categoryOptions}
                    isDisabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="course-supporter"
                    className="form-label fw-bold"
                  >
                    Tư vấn viên
                  </label>
                  <Select
                    readOnly
                    defaultValue={{
                      label: data.user.name,
                      value: data.user.id,
                    }}
                    options={userOptions}
                    isDisabled
                    onChange={(e) => e.target.value}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Thumnail</label>
                  <div className="course-logo-preview mb-3 rounded">
                    <img
                      id="course-logo-preview"
                      className="rounded"
                      src={imageURL || data.thumbnail}
                      alt="Course Thumbnail"
                    />
                  </div>

                  <label
                    htmlFor="course-logo-input"
                    className="btn btn-warning"
                  >
                    Đổi ảnh{" "}
                  </label>
                  <input
                    type="file"
                    id="course-logo-input"
                    className="d-none"
                    onChange={handlerUploadAvatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseEdit;
