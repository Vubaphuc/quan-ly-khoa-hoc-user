package com.example.coursebackend.service;


import com.example.coursebackend.dto.PageCourse;
import com.example.coursebackend.entity.Category;
import com.example.coursebackend.entity.Course;
import com.example.coursebackend.entity.User;
import com.example.coursebackend.entity.request.UpsertCourseRequest;
import com.example.coursebackend.exception.NotFoundException;
import com.example.coursebackend.repository.CategoryRepository;
import com.example.coursebackend.repository.CourseRepository;
import com.example.coursebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class AdminService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // 1.Xem danh sách khóa học (có phân trang)
    public PageCourse findAllCoursePage(int page, int pageSize) {

        Page<Course> courses = courseRepository.findAll(PageRequest.of(page - 1, pageSize));

        return new PageCourse(courses.getNumber() + 1,
                courses.getSize(),
                courses.getTotalPages(),
                (int) courses.getTotalElements(),
                courses.getContent());
    }


    //2. Tạo khóa học mới
    public Course createCourse(UpsertCourseRequest request) {

        // lấy ra User
        User user = userRepository.findUsersById(request.getUserId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found User with id = " + request.getUserId());
        });

        // lấy ra category
        List<Category> categoryList = getCategory(request.getTopics());

        // tạo mới course
        Course course = Course.builder()
                .name(request.getName())
                .description(request.getDescription())
                .type(request.getType())
                .categories(categoryList)
                .thumbnail(request.getThumbnail())
                .user(user)
                .build();

        // lưu vào csdl
        courseRepository.save(course);

        return course;
    }

    //3. Lấy chi tiết khóa học
    public Course findCourseById(Integer id) {
        Course course = courseRepository.findCoursesById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Course with id = " + id);
        });

        return course;
    }

    //4. Cập nhật thông tin khóa học
    public Course updateCourseById(Integer id, UpsertCourseRequest request) {

        // lấy ra course
        Course course = courseRepository.findCoursesById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Course with id = " + id);
        });
        // lấy ra user
        User user = userRepository.findUsersById(request.getUserId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found User with id = " + request.getUserId());
        });


        // lấy ra list Category
        List<Category> categoryList = getCategory(request.getTopics());

        // set lại dữ liệu
        course.setName(request.getName());
        course.setDescription(request.getDescription());
        course.setType(request.getType());
        course.setCategories(categoryList);
        course.setThumbnail(request.getThumbnail());
        course.setUser(user);

        // lưu vào csdl
        courseRepository.save(course);

        return course;
    }


    //5. Xóa khóa học
    public void deleteCourseById(Integer id) {
        Course course = courseRepository.findCoursesById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Course with id = " + id);
        });

        courseRepository.deleteById(course.getId());

    }




    // lấy ngẫu nhiên Category
    private List<Category> getCategory(int number) {
        List<Category> categoryList = categoryRepository.findAll();
        Random rd = new Random();
        List<Category> rdCategories = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            Category rdct = categoryList.get(rd.nextInt(categoryList.size()));
            if (!rdCategories.contains(rdct)) {
                rdCategories.add(rdct);
            }
        }

        return rdCategories;

    }
}
