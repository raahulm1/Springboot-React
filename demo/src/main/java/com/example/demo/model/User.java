package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Data // ✅ Lombok will auto-generate getters/setters
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private int age;
}
