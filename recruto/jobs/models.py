from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=50)
    expected_salary = models.CharField(max_length=50)
    experience = models.CharField(max_length=50)
    source_url = models.CharField(max_length=200, default="NA")

    def __str__(self):
        return f"{self.title} at {self.location}"