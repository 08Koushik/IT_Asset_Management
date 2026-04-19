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
                        // Public access
                        .requestMatchers("/index.html", "/register.html", "/*.js", "/*.css", "/api/public/**").permitAll()

                        // Admin specific pages - using hasAuthority to avoid ROLE_ prefix issues
                        .requestMatchers("/dashboard.html", "/view-assets.html", "/add-asset.html", "/assign-asset.html", "/manage-requests.html").hasAuthority("ADMIN")

                        // User specific pages
                        .requestMatchers("/user-dashboard.html", "/browse-assets.html", "/my-items.html").hasAuthority("USER")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/index.html")
                        .loginProcessingUrl("/perform_login")
                        .defaultSuccessUrl("/dashboard.html", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/index.html")
                        .permitAll()
                );

        return http.build();
    }
}