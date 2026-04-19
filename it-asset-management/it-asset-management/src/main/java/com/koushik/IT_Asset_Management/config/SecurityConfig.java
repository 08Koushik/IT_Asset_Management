package com.koushik.IT_Asset_Management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Static resources and public pages — always open
                        .requestMatchers(
                                "/", "/index.html", "/register.html",
                                "/**/*.js", "/**/*.css", "/**/*.png", "/**/*.ico",
                                "/api/public/**"
                        ).permitAll()

                        // Admin pages — must have ROLE_ADMIN in DB
                        .requestMatchers(
                                "/dashboard.html", "/view-assets.html", "/add-asset.html",
                                "/assign-asset.html", "/manage-requests.html"
                        ).hasAuthority("ROLE_ADMIN")

                        // User pages — must have ROLE_USER in DB
                        .requestMatchers(
                                "/user-dashboard.html", "/browse-assets.html",
                                "/my-assets.html", "/view-available-assets.html"
                        ).hasAuthority("ROLE_USER")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/index.html")
                        .loginProcessingUrl("/perform_login")
                        // Role-based redirect: ROLE_ADMIN → dashboard, ROLE_USER → user-dashboard
                        .successHandler((request, response, authentication) -> {
                            boolean isAdmin = authentication.getAuthorities().stream()
                                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                            response.sendRedirect(isAdmin ? "/dashboard.html" : "/user-dashboard.html");
                        })
                        .failureUrl("/index.html?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/index.html?logout=true")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }
}