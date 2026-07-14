package com.example.diary.repository;

import java.util.Optional;
import java.util.UUID;
import com.example.diary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, UUID>{
     Optional<User> findByEmail(String email);
}
    

