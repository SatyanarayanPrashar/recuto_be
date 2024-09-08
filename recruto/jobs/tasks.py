# tasks.py in your Django app
from celery import shared_task
from .models import Job
from .serializers import JobSerializer
from .scrapers import scrape_jobs
import logging

logger = logging.getLogger(__name__)

@shared_task
def scrape_and_save_jobs():
    logger.info("Scrape and save jobs task started")
    try:
        scraped_data = scrape_jobs()

        if scraped_data:
            jobs_saved = []
            for job_data in scraped_data:
                job_instance = Job(
                    title=job_data.get('title'),
                    location=job_data.get('location'),
                    job_type=job_data.get('job_type'),
                    expected_salary=job_data.get('expected_salary'),
                    experience=job_data.get('experience'),
                    source_url=job_data.get('source_url', 'NA')
                )
                job_instance.save()
                jobs_saved.append(JobSerializer(job_instance).data)

            return {"jobs_saved": jobs_saved}
        else:
            return {"message": "No jobs were scraped."}

    except Exception as e:
        return {"error": str(e)}
