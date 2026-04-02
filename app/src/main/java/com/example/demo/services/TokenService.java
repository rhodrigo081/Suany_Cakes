package com.example.demo.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.demo.exception.UnauthorizedAccessException;
import com.example.demo.models.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return com.auth0.jwt.JWT.create().withIssuer("SuanyCakes-API").withSubject(user.getEmail()).withExpiresAt(getExpirationDate()).sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token.", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm).withIssuer("SuanyCakes-API").build().verify(token).getSubject();
        } catch (TokenExpiredException e) {
            throw new UnauthorizedAccessException("Token expirado.");
        } catch (SignatureVerificationException e) {
            throw new UnauthorizedAccessException("Assinatura do token inválida.");
        } catch (JWTVerificationException e) {
            throw new UnauthorizedAccessException("Token inválido.");
        }
    }

    private Instant getExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
