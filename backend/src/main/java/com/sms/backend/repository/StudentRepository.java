package com.sms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sms.backend.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}