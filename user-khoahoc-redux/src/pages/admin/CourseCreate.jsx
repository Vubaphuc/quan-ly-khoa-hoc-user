import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateCourseMutation,
  useGetAllUserQuery,
} from "../../app/service/couresService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Select from "react-select";

function CourseCreate() {


  const [selectTopics, setSelectTopics] = useState([]);

  const [addCourse, addCourseResult] = useCreateCourseMutation();

  const [optionsUser, setOptionsUser] = useState([]);
  const { data, isLoading, isError, error } = useGetAllUserQuery();


useEffect (() => {
    if (data) {
        let newOptionsUser = data.map((d) => ({
            value: d.id, label: d.name,
        }));
        setOptionsUser(newOptionsUser);
        
    }
}, [data])

  const options = [
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "Mobile", label: "Mobile" },
    { value: "Lập Trình Wed", label: "Lập Trình Wed" },
    { value: "Database", label: "Database" },
    { value: "Devops", label: "Devops" },
  ];

  const schema = yup.object().shape({
    name: yup.string().required("tên khóa học không được để trống"),
    description: yup.string().required("Mô tả không được để trống"),
    type: yup.string().required("Hình thức học không được để trống"),
    topics: yup.array().min(1, "chọn ít nhất 1 chủ đề"),
    userId: yup.string().required("Chọn tư vấn viên"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm ({
    resolver: yupResolver(schema),
  });


  const onSubmit = data => {
    console.log(data)
    addCourse(data);
  };

 





  return (
    <div className="course-list mt-4 mb-4">
      <div className="container">
        <div className="mb-4">
          <button 
            className="btn-custom btn-create-course" 
            type="submit"
          >
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>
            Tạo
          </button>
          <Link to={"/admin/khoa-hoc"} className="btn-custom btn-refresh">
            <span>
              <i className="fa-solid fa-angle-left"></i>
            </span>
            Quay lại
          </Link>
        </div>

        <div className="course-list-inner p-2">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('name')}
                    
                  />
                  <p className="text-danger">{errors.name?.message}</p>
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
                    {...register("description")}
                  ></textarea>
                  <p className="text-danger">{errors.description?.message}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="course-type" className="form-label fw-bold">
                    Hình thức học
                  </label>
                  <select
                    className="form-control"
                    id="course-type"
                    name="type"
                    {...register("type")}
                  >
                    <option hidden>- Chọn hình thức học</option>
                    <option value="online">Online</option>
                    <option value="onlab">Onlab</option>
                  </select>
                </div>
                <p className="text-danger">{errors.type?.message}</p>
                <div className="mb-3">
                  <label htmlFor="course-topic" className="form-label fw-bold">
                    Chủ đề
                  </label>

                  <Select
                  id="topics"
                    placeholder="Chọn chủ đề"
                    isMulti
                    options={options}
                    {...register("topics")}
                  />
                  <p className="text-danger">{errors.topics?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="course-supporter" className="form-label fw-bold">
                    Tư vấn viên
                  </label>
                  <Select
                  id="userId"
                    placeholder="chọn tư vấn viên"
                    options={optionsUser}
                    {...register("userId")}
                  />
                  {errors.userId && <span>{errors.userId.message}</span>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseCreate;
