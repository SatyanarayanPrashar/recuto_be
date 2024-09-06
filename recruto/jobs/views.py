from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from .scrapers import scrape_jobs
from .models import Job
from .serializers import JobSerializer

from django.core.cache import cache
import time
import redis
redis_instance = redis.StrictRedis(host='127.0.0.1', port=6379, db=1)

# class JobListView(generics.ListCreateAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer
class JobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get(self, request, *args, **kwargs):
        # Define a cache key
        cache_key = 'job_list'
        # Try to get the data from cache
        cached_jobs = cache.get(cache_key)

        if cached_jobs is not None:
            # If cache exists, use it
            return Response(cached_jobs)

        # If cache doesn't exist, get data from the database
        response = super().get(request, *args, **kwargs)

        # Store the data in cache
        cache.set(cache_key, response.data, timeout=60*15)  # Cache timeout is 15 minutes

        return response


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class DeleteAllJobsView(APIView):
    def delete(self, request):
        try:
            # Delete all Job objects
            Job.objects.all().delete()
            return Response({"message": "All jobs have been deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ScrapeJobsView(APIView):
    def get(self, request):
        try:
            scraped_data = scrape_jobs()
            
            if scraped_data:
                jobs_saved = []
                for job_data in scraped_data:
                    # Assuming the scraped data contains 'title', 'location', 'job_type', 'expected_salary', 'experience', 'source_url'
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
                
                return Response({"jobs_saved": jobs_saved}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "No jobs were scraped."}, status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)