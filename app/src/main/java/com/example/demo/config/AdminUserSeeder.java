package com.example.demo.config;

import com.example.demo.enums.UserRole;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${EMAIL_ADMIN}")
    private String adminEmail;

    @Value("${PASSWORD_ADMIN}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
            User admin = new User();
            admin.setFirstName("Suany");
            admin.setLastName("Cakes");
            admin.setEmail(adminEmail);
            admin.setPhone("81996581539");
            admin.setPassword(passwordEncoder.encode(adminPassword));

            admin.setRole(UserRole.ROLE_ADMIN);

            userRepository.save(admin);
    }
}