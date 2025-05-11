package com.task.main.config;

import com.task.main.exceptions.InvalidTokenException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JWTutils {


    @Value("${jwt.secret}")  //Getting from application properties
    private String secretKey;

    @Value("${jwt.expiration}") //Getting from application properties
    private int jwtExpirationMs;

    public String generateToken(UserDetails userDetails){

        String userName= userDetails.getUsername();

        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .claim("roles",role)
                .subject(userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+jwtExpirationMs))
                .signWith(getKey())
                .compact();
    }

    private Key getKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));

    }

    public String jwtFromHeader(HttpServletRequest request){

        String header=request.getHeader("Authorization");
        if(header!=null && header.startsWith("Bearer")){
            return header.substring(7);
        }

        return null;

    }

    public String getUserName(String token) {

        return Jwts.parser()
                .verifyWith((SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    public boolean validateToken(String token) {

        try {
            Jwts.parser()
                    .verifyWith((SecretKey) getKey())
                    .build().parseSignedClaims(token);
            return true;

        } catch (Exception e) {
            throw new InvalidTokenException("Inavlid token");
        }
    }
}
