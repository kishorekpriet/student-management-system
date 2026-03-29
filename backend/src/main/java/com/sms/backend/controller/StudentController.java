package com.sms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sms.backend.entity.Student;
import com.sms.backend.repository.StudentRepository;
import com.sms.backend.service.ExcelExportService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*") // This allows your future React frontend to talk to this backend safely
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private ExcelExportService excelExportService;

    // 1. GET ROUTE: Fetch all students from the MySQL database
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 2. POST ROUTE: Add a new student to the database
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }
 // 3. GET SINGLE ROUTE: Fetch a specific student by their ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return ResponseEntity.ok(student);
    }

    // 4. UPDATE ROUTE: Modify an existing student's data
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Student updateStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // Overwrite the old data with the new data
        updateStudent.setFirstName(studentDetails.getFirstName());
        updateStudent.setLastName(studentDetails.getLastName());
        updateStudent.setEmail(studentDetails.getEmail());
        updateStudent.setDepartment(studentDetails.getDepartment());

        studentRepository.save(updateStudent); // Save the changes
        return ResponseEntity.ok(updateStudent);
    }

    // 5. DELETE ROUTE: Remove a student from the database
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        studentRepository.delete(student);
        return ResponseEntity.ok("Student deleted successfully!");
    }
 // 6. EXCEL EXPORT ROUTE: Download the database as a .xlsx file
    @GetMapping("/export/excel")
    public org.springframework.http.ResponseEntity<org.springframework.core.io.InputStreamResource> exportToExcel() {
        List<Student> students = studentRepository.findAll();
        java.io.ByteArrayInputStream in = excelExportService.exportStudentsToExcel(students);

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=students.xlsx");

        return org.springframework.http.ResponseEntity.ok()
                .headers(headers)
                .contentType(org.springframework.http.MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new org.springframework.core.io.InputStreamResource(in));
    }
}