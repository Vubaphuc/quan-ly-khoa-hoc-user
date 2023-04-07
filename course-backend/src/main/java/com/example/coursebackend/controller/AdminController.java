package com.example.coursebackend.controller;



import com.example.coursebackend.entity.Image;
import com.example.coursebackend.entity.request.UpdateCourseRequest;
import com.example.coursebackend.entity.request.UpsertCourseRequest;
import com.example.coursebackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    //1. Xem danh sách khóa học (có phân trang)
//    @GetMapping("courses")
//    public ResponseEntity<?> findAllCoursePage(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
//        return ResponseEntity.ok(adminService.findAllCoursePage(page,pageSize));
//    }

    @GetMapping("categorys")
    public ResponseEntity<?> findAllCategorys () {
        return ResponseEntity.ok(adminService.findAllCategorys());
    }


    @GetMapping("users")
    public ResponseEntity<?> findAllUser () {
        return ResponseEntity.ok(adminService.findAllUser());
    }

    @GetMapping("courses")
    public ResponseEntity<?> findAllCourse () {
        return ResponseEntity.ok(adminService.findAllCourse());
    }


    //2. Tạo khóa học mới
    @PostMapping("courses")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createCourse(@RequestBody UpsertCourseRequest request) {
        return ResponseEntity.ok(adminService.createCourse(request));
    }

    //3. Lấy chi tiết khóa học
    @GetMapping("courses/{id}")
    public ResponseEntity<?> findCourseById(@PathVariable Integer id) {
        return ResponseEntity.ok(adminService.findCourseById(id));
    }


    //4. Cập nhật thông tin khóa học
    @PutMapping("courses/{id}")
    public ResponseEntity<?> updateCourseById(@PathVariable Integer id, @RequestBody UpdateCourseRequest request) {
        return ResponseEntity.ok(adminService.updateCourseById(id, request));
    }

    //5. Xóa khóa học
    @DeleteMapping("courses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourseById(@PathVariable Integer id) {
        adminService.deleteCourseById(id);
    }

//    @PutMapping("files/{id}")
//    public ResponseEntity<?> updateCourseThumbnail(@ModelAttribute("file") MultipartFile file,
//                                                   @PathVariable Integer id) {
//        Image image = adminService.readFile(file,id);
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(image.getType()))
//                .body(image.getData());
//    }



}
