package com.packagetracker.config;

import com.packagetracker.model.Role;
import com.packagetracker.model.User;
import com.packagetracker.repository.RoleRepository;
import com.packagetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles
        if (roleRepository.count() == 0) {
            Role adminRole = new Role(null, "ADMIN");
            Role customerRole = new Role(null, "CUSTOMER");
            Role agentRole = new Role(null, "AGENT");

            roleRepository.save(adminRole);
            roleRepository.save(customerRole);
            roleRepository.save(agentRole);

            // Create default admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@packagetracker.com");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole(adminRole);
            userRepository.save(admin);

            // Create default agent user
            User agent = new User();
            agent.setUsername("agent");
            agent.setPasswordHash(passwordEncoder.encode("agent123"));
            agent.setEmail("agent@packagetracker.com");
            agent.setFirstName("Agent");
            agent.setLastName("User");
            agent.setRole(agentRole);
            userRepository.save(agent);

            // Create default customer user
            User customer = new User();
            customer.setUsername("customer");
            customer.setPasswordHash(passwordEncoder.encode("customer123"));
            customer.setEmail("customer@packagetracker.com");
            customer.setFirstName("Customer");
            customer.setLastName("User");
            customer.setRole(customerRole);
            userRepository.save(customer);

            System.out.println("Default users created:");
            System.out.println("Admin - username: admin, password: admin123");
            System.out.println("Agent - username: agent, password: agent123");
            System.out.println("Customer - username: customer, password: customer123");
        }
    }
}

