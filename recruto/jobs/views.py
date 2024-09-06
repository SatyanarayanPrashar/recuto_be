from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from .scrapers import scrape_jobs
from .models import Job
from .serializers import JobSerializer

class JobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

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