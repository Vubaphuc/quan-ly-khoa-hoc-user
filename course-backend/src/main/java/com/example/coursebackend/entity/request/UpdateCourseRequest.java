package com.example.coursebackend.entity.request;

import com.example.coursebackend.entity.Image;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UpdateCourseRequest {
    private String name;
    private String description;
    private String type;
    private List<Integer> topics;
    private int userId;
}
