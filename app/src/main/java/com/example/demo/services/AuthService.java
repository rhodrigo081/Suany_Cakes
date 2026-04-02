package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.RegisterRequestDTO;
import com.example.demo.dtos.UserResponseDTO;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuário não encontrado: " + email));
    }

    @Transactional
    public UserResponseDTO register(RegisterRequestDTO data) {
        if (userRepository.findByEmail(data.email()).isPresent()) {
            throw new InvalidArgumentException("E-mail já cadastrado");
        }

        if (!data.confirmPass().equals(data.password())) {
            throw new InvalidArgumentException("As senhas não são iguais");
        }

        User newUser = new User();
        newUser.setFirstName(data.firstName());
        newUser.setLastName(data.lastName());
        newUser.setEmail(data.email());
        newUser.setPhone(data.phone());
        newUser.setPassword(passwordEncoder.encode(data.password()));

        userRepository.save(newUser);


        return userService.convertToResponse(newUser);
    }

    @Transactional
    public User socialMediaLogin(String email, String firstName, String lastName) {
        return userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName != null ? lastName : "");
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode("OAUTH2_USER_" + Math.random()));
            newUser.setPhone("");
            return userRepository.save(newUser);
        });
    }
}
