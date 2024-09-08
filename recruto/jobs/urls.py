# jobs/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('jobs-woRedis/', JobwoRedisView.as_view(), name='job-list'),
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('scrape-jobs/', ScrapeJobsView.as_view(), name='scrape-jobs'),
    path('delete-all-jobs/', DeleteAllJobsView.as_view(), name='delete-all-jobs'),
]