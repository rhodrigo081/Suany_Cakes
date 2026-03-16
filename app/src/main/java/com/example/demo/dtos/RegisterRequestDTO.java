package com.example.demo.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RegisterRequestDTO(@NotBlank String firstName,
                                String lastName,
                                 @Email @NotBlank String email,
                                 @NotBlank @Size(min = 8) String password,
                                 @NotBlank @Size(max = 11) String phone,
                                 @NotBlank @Size(min = 8) String confirmPass) {
}
