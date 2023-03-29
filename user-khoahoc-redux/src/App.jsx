import "./App.css";
import Layout from "./components/layout/Layout";
import ListCourse from "./pages/course/ListCourse"
import OnlineCourse from "./pages/course/OnlineCourse"
import OnlabCourse from "./pages/course/OnlabCourse"
import CourseDetail from "./pages/course/CourseDetail"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/khoa-hoc">
            <Route index element={<ListCourse />} />
            <Route path="online" element={<OnlineCourse />} />
            <Route path="onlab" element={<OnlabCourse />} />
            <Route path=":courseId" element={<CourseDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
