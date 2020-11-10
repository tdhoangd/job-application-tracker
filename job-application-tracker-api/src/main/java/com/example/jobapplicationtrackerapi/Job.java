package com.example.jobapplicationtrackerapi;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@Document("jobs")
public class Job {

    @Id
    private String id;
    private Date date;
    private String title;
    private String linkedinId;
    private String status;
    private String jobLocation;
    private String company;
}
