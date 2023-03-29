import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCoursesOnline } from "../../app/slices/courseOnlineSlices"

function OnlineCourse() {

  const coursesOnlines = useSelector(state => state.couresOnline);
  const dispatch = useDispatch();


  useEffect(() => {
    getCoursesOnline();
  }, []);

  const courseType = "online";


  const getCoursesOnline = async () => {
    try {
      const rs = await axios.get(`http://localhost:8080/api/v1/courses?type=${courseType}`);
      dispatch(setCoursesOnline(rs.data));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div class="course-container mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <h2 class="fs-5 mb-4">Chủ đề</h2>
            <div class="topic-item input-group d-flex align-items-center mb-1">
              <input type="radio" value="Backend" id="backend" name="topic" />
              <label for="backend" class="ms-2 fs-5">
                Lập trình Backend
              </label>
            </div>
            <div class="topic-item input-group d-flex align-items-center mb-1">
              <input type="radio" value="Frontend" id="frontend" name="topic" />
              <label for="frontend" class="ms-2 fs-5">
                Lập trình Frontend
              </label>
            </div>
            <div class="topic-item input-group d-flex align-items-center mb-1">
              <input type="radio" value="Di động" id="mobile" name="topic" />
              <label for="mobile" class="ms-2 fs-5">
                Lập trình di động
              </label>
            </div>
            <div class="topic-item input-group d-flex align-items-center mb-1">
              <input type="radio" value="Database" id="database" name="topic" />
              <label for="database" class="ms-2 fs-5">
                Cơ sở dữ liệu
              </label>
            </div>
          </div>

          <div class="col-md-9">
            <div class="row">
              <div class="col-md-4">
                <div class="seach-form d-flex align-items-center rounded shadow-sm mb-4 pe-3">
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học"
                    class="form-control border-0 seach-form-input"
                  />
                  <span class="text-black-50 seach-form-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="course-list row">

                {coursesOnlines.length > 0 && coursesOnlines.map((coursesOnline) => (

                
              <div class="col-md-4">
                <Link to={`/khoa-hoc/${coursesOnline.id}`}>
                  <div class="course-item shadow-sm rounded mb-4">
                    <div class="course-item-image">
                      <img
                        src={coursesOnline.thumbnail ? coursesOnline.thumbnail : "https://media.techmaster.vn/api/static/8028/bpfneoc51co8tcg6lek0"}
                        alt="Marge Innastraightline"
                      />
                    </div>
                    <div class="course-item-info p-3">
                      <h2 class="fs-5 mb-4 text-dark">
                        {coursesOnline.name}
                      </h2>
                      <div class="d-flex justify-content-between align-items-center fw-light text-black-50">
                        <p class="type">{coursesOnline.type}</p>
                        <p class="rating">
                          <span>{coursesOnline.rating}</span>
                          <span class="text-warning">
                            <i class="fa-solid fa-star"></i>
                          </span>
                        </p>
                      </div>
                      <p class="price text-danger fs-5">{coursesOnline.price} VND</p>
                    </div>
                  </div>
                </Link>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineCourse;
