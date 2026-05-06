package com.diet_management_system.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.diet_management_system.entity.User;
import com.diet_management_system.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String path = request.getServletPath();

		if (path.startsWith("/auth")) {
			filterChain.doFilter(request, response);
			return;
		}

		String authHeader = request.getHeader("Authorization");

		System.out.println("AUTH HEADER: " + authHeader);

		if (authHeader != null && authHeader.startsWith("Bearer ")) {

			String token = authHeader.substring(7);

			try {
				String email = jwtUtil.extractEmail(token);

				System.out.println("EMAIL FROM JWT: " + email);

				if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

					User user = userRepository.findByEmail(email);

					if (user != null && jwtUtil.validateToken(token, user.getEmail())) {

						List<GrantedAuthority> authorities = List
								.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

						UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null,
								authorities);

						SecurityContextHolder.getContext().setAuthentication(auth);
						System.out.println("✅ AUTHENTICATED USER: " + email);
					}
				}

			} catch (Exception e) {
				System.out.println("JWT ERROR: " + e.getMessage());
			}
		}

		// Continue filter chain
		filterChain.doFilter(request, response);
	}
}
