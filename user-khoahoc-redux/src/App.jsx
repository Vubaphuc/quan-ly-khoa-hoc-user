import "./App.css";
import Layout from "./components/layout/Layout";
import ListCourse from "./pages/course/ListCourse"
import OnlineCourse from "./pages/course/OnlineCourse"
import OnlabCourse from "./pages/course/OnlabCourse"
import CourseDetail from "./pages/course/CourseDetail"
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import CourseList from "./pages/admin/CourseList";
import CourseEdit from "./pages/admin/CourseEdit";
import CourseCreate from "./pages/admin/CourseCreate";
import Test from "./pages/admin/Test"

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


      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="khoa-hoc">
            <Route index element={<CourseList />} />
            <Route path="test" element={<Test />} />
            <Route path="tao-khoa-hoc" element={<CourseCreate />} />
            <Route path=":courseId" element={<CourseEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
