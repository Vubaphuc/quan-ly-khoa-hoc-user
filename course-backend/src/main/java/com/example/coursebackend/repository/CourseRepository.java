package com.example.coursebackend.repository;

import com.example.coursebackend.dto.CourseDto;
import com.example.coursebackend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {


    // sử dụng dto
    @Query(nativeQuery = true, name = "findUserDemo")
    List<CourseDto>findCourse_Native(@Param("name") String name,
                                     @Param("type") String type,
                                     @Param("category") String category);



    // sử dụng câu lệnh query
    @Query("select c " +
            "from Course c, Category ct " +
            "where (:name is null or c.name = :name) " +
            "and (:type is null or c.type = :type) " +
            "and (:category is null or ct.name = :category)")
    List<Course> findCourseDemo1(@Param("name") String name,
                                 @Param("type") String type,
                                 @Param("category") String category);




    Optional<Course> findCoursesById(Integer id);

    // xóa course nhưng không xóa các bảng liên quan
    @Modifying
    @Query("delete from Course c where c.id = :id")
    void deleteById(@Param("id") Integer id);
}
