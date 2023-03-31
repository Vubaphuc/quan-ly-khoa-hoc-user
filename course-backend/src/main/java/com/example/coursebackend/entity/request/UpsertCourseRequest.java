package com.example.coursebackend.entity.request;


import com.example.coursebackend.entity.Category;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UpsertCourseRequest {
    private String name;
    private String description;
    private String type;
    private List<Category> topics;
    private String thumbnail;
    private Integer userId;
}
