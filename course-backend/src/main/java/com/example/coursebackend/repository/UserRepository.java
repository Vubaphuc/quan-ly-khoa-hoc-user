package com.example.coursebackend.repository;

import com.example.coursebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUsersById(Integer id);

    Optional<User> findUsersByName(String userName);

}