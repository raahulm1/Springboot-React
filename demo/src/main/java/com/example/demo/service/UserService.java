package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public void deleteUser(String id) {
        repo.deleteById(id);
    }

    public User updateUser(String id, User updatedUser) {
        User existing = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existing.setName(updatedUser.getName());
        existing.setEmail(updatedUser.getEmail());
        existing.setAge(updatedUser.getAge());
        return repo.save(existing);
    }

}
