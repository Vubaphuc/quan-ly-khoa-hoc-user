package com.example.coursebackend.service;


import com.example.coursebackend.dto.PageCourse;
import com.example.coursebackend.entity.Category;
import com.example.coursebackend.entity.Course;
import com.example.coursebackend.entity.Image;
import com.example.coursebackend.entity.User;
import com.example.coursebackend.entity.request.UpdateCourseRequest;
import com.example.coursebackend.entity.request.UpsertCourseRequest;
import com.example.coursebackend.entity.response.FileResponse;
import com.example.coursebackend.exception.BadRequestException;
import com.example.coursebackend.exception.NotFoundException;
import com.example.coursebackend.repository.CategoryRepository;
import com.example.coursebackend.repository.CourseRepository;
import com.example.coursebackend.repository.ImageRepository;
import com.example.coursebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private ImageRepository imageRepository;

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
                .price(request.getPrice())
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
    public Course updateCourseById(Integer id, UpdateCourseRequest request) {

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

        // lấy địa chỉ url của thumbnail
        FileResponse fileResponse = readFileAvatar(request.getThumbnail());



        // set lại dữ liệu
        course.setName(request.getName());
        course.setDescription(request.getDescription());
        course.setType(request.getType());
        course.setCategories(categoryList);
        course.setUser(user);
        course.setThumbnail(fileResponse.getUrl());

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
    private List<Category> getCategory(List<Integer> topics) {
        List<Category> categories = categoryRepository.findAll();
        List<Category> categoryList = new ArrayList<>();
        for (int i = 0; i < topics.size(); i++) {
            for (int j = 0; j < categories.size(); j++) {
                if (topics.get(i).equals(categories.get(j).getId())) {
                    categoryList.add(categories.get(j));
                }
            }
        }

        return categoryList;

    }
    public List<Course> findAllCourse() {
        return courseRepository.findAll();
    }

    public List<User> findAllUser() {

        return userRepository.findAll();
    }

    public List<Category> findAllCategorys() {
        return categoryRepository.findAll();
    }



    public Image readFile(MultipartFile file, Integer id) {

        validataFile(file);
        try {
            Course course = courseRepository.findCoursesById(id).orElseThrow(() -> {
                throw new NotFoundException("Not Found Course with id " + id);
            });
            Image image = Image.builder()
                    .type(file.getContentType())
                    .data(file.getBytes())
                    .build();
            imageRepository.save(image);
            FileResponse fileResponse = new FileResponse("api/v1/admin/files" +  image.getId());
            course.setThumbnail(fileResponse.getUrl());
            return readFile(image.getId());
        } catch (IOException e) {
            throw new RuntimeException("Có lỗi xảy ra");
        }
    }

    private FileResponse readFileAvatar (MultipartFile file) {
        validataFile(file);
        try {
            Image image = Image.builder()
                    .type(file.getContentType())
                    .data(file.getBytes())
                    .build();


            imageRepository.save(image);


            FileResponse fileResponse = new FileResponse("api/v1/admin/files" +  image.getId());

            return fileResponse;


        } catch (IOException e) {
            throw new RuntimeException("Có lỗi xảy ra");
        }

    }


    private void validataFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        // tên file không được để trống
        if (fileName == null || fileName.isEmpty()) {
            throw new BadRequestException("Tên File Không hợp lệ");
        }

        // type (loại) file có nằm trong danh sánh cho phép hay không
        // avatar.png, image.jpg => lấy ra đuôi file png và jpg
        String fileExtension = getFileExtension(fileName);
        if (!checkFileExtension(fileExtension)) {
            throw new BadRequestException("Type File Không hợp lệ");
        }

        // kích thước size có trong phạm  vi cho phép không
        double fileSize = (double) file.getSize() / 1048576;
        if (fileSize > 2) {
            throw new BadRequestException("Size File không được vượt quá 2MB");
        }
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf(".");
        if (lastIndex == -1) {
            return "";
        }
        return fileName.substring(lastIndex + 1);
    }

    private boolean checkFileExtension (String fileExtension) {
        List<String> fileExtensions = List.of("png","jpeg","jpg");
        return fileExtensions.contains(fileExtension);

    }

    private Image readFile(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Image with id = " + id);
        });
        return image;
    }
}
