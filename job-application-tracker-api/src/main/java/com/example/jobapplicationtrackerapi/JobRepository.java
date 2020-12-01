package com.example.jobapplicationtrackerapi;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@RepositoryRestResource(collectionResourceRel = "jobs", path="jobs")
@Repository
public interface JobRepository extends MongoRepository<Job, String> {


    List<Job> findByCompanyLikeIgnoreCase(@Param("company") String company);
    Optional<Job> findById(String id);

}
