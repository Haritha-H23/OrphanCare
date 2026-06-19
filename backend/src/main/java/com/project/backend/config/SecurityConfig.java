package com.project.backend.config;

import com.project.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers("/api/payment/**").hasRole("DONOR")
                        .requestMatchers("/api/auth/**","/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/children/update/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/children/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/requirements/**").permitAll()

                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/children/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/children/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/children/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/requirements/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/requirements/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/requirements/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/donations").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/donations").authenticated()
                        .requestMatchers("/api/donations/user/**").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}