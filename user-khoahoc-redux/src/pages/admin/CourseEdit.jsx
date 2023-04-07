import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
} from "../../app/service/couresService";
import {
  getCategoryOptions,
  getTypeOptions,
  getUserOptions,
} from "./options/options";
import useFetchQuery from "./hooks/useFetchQuery";
import Select from "react-select";
import { Controller } from "react-hook-form";
import useUpdate from "./hooks/useUpdate";

function CourseEdit() {

  const { courseId } = useParams();

  const {
    data: dataCourses,
    isLoading: isLoadingCourse,
    isError: isErrorCourse,
  } = useGetCourseByIdQuery(courseId);

  const { control, register, handleSubmit, errors, onSubmit } =
    useUpdate(courseId);

  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const [deleteCourse] = useDeleteCourseMutation();

  const { users, categories } = useFetchQuery();
  const userOptions = getUserOptions(users);
  const categoryOptions = getCategoryOptions(categories);
  const typeOptions = getTypeOptions();

  if (isLoadingCourse) {
    return <h2>Loading ...</h2>;
  }

  if (isErrorCourse) {
    return <h2>Error : {error}</h2>;
  }

  if (!dataCourses) {
    return <h2>Loading...</h2>;
  }

  const handlerDelete = (id) => {
    deleteCourse(id)
      .unwrap()
      .then(() => {
        navigate("/admin/khoa-hoc");
      })
      .catch((err) => alert("có lỗi"));
  };

  const categoryDefault = getCategoryOptions(dataCourses.categories);

  return (
    <div className="course-list mt-4 mb-4">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                onClick={() => handlerDelete(dataCourses.id)}
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
                    defaultValue={dataCourses?.name}
                    {...register("name")}
                  />
                  <p className="text-danger fst-italic mt-2">
                    {errors.name?.message}
                  </p>
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
                    defaultValue={dataCourses?.description}
                    {...register("description")}
                  ></textarea>
                  <p className="text-danger fst-italic mt-2">
                    {errors.description?.message}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="course-type" className="form-label fw-bold">
                    Hình thức học
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={{
                          label: dataCourses.type,
                          value: dataCourses.type,
                        }}
                        options={typeOptions}
                        value={typeOptions.find((c) => c.value === field.value)}
                        onChange={(val) => field.onChange(val.value)}
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course-topic" className="form-label fw-bold">
                    Chủ đề
                  </label>
                  <Controller
                    name="topics"
                    control={control}
                    defaultValue={dataCourses.categories.map((e) => e.id)}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        closeMenuOnSelect={false}
                        defaultValue={categoryDefault}
                        options={categoryOptions}
                        inputRef={ref}
                        value={categoryOptions.find((c) => c.value === value)}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        isMulti
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="course-supporter"
                    className="form-label fw-bold"
                  >
                    Tư vấn viên
                  </label>
                  <Controller
                    name="userId"
                    control={control}
                    defaultValue={dataCourses.user.id}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={{
                          label: dataCourses.user.name,
                          value: dataCourses.user.id,
                        }}
                        options={userOptions}
                        value={userOptions.find((c) => c.value === field.value)}
                        onChange={(val) => field.onChange(val.value)}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="thumbnail"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange } }) => (
                    <div className="mb-3">
                      <label className="form-label fw-bold">Thumbnail</label>
                      <div className="course-logo-preview mb-3 rounded">
                        <img
                          id="course-logo-preview"
                          className="rounded"
                          alt="Course Thumbnail"
                          src={
                            previewImage || dataCourses?.thumbnail
                          }
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
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setPreviewImage(URL.createObjectURL(file));
                          onChange(file);
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseEdit;
