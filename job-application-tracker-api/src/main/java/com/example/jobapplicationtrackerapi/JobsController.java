package com.example.jobapplicationtrackerapi;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobsController {

    private final JobRepository jobRepository;

    public JobsController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping({"", "/"})
    public List<Job> getJobs() {
        return jobRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Job> getById(@PathVariable(value = "id") String id) {
        Optional<Job> opt = jobRepository.findById(id);

        if (opt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(opt.get());
    }

    @GetMapping("/sc")
    public List<Job> searchByCompany(@RequestParam(name = "company") String company) {
        return jobRepository.findByCompanyLikeIgnoreCase(company);
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Job> addJob(@Valid @RequestBody Job job) {
        if (job.getTitle() == null || job.getLocation() == null
            || job.getTitle().equals("") || job.getLocation().equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (job.getDate() == null) job.setDate(new Date());
        if (job.getStatus() == null || job.getStatus().equals("")) job.setStatus("applied");

        Job createdJob = jobRepository.save(job);
        return ResponseEntity.ok(createdJob);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable String id) {
        Optional<Job> opt = jobRepository.findById(id);

        if (opt.isPresent()) {
            jobRepository.delete(opt.get());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updatedJob(@PathVariable(value = "id") String id,
                                        @Valid @RequestBody Job jobDetails) throws ResourceNotFoundException {

        Optional<Job>  opt = jobRepository.findById(id);

        if (opt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Job job = opt.get();

        job.setTitle(jobDetails.getTitle());
        job.setNote(jobDetails.getNote());
        job.setStatus(jobDetails.getStatus());
        job.setLocation(jobDetails.getLocation());
        job.setCompany(jobDetails.getCompany());
        job.setDescription(jobDetails.getDescription());

        final Job updatedJob = jobRepository.save(job);
        return ResponseEntity.ok(updatedJob);
    }
}
