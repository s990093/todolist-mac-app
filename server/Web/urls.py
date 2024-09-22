from django.urls import path
from . import views

app_name = "Web"

from django.urls import path
from . import views

urlpatterns = [
    # ListView for Task
    path('tasks/', views.TaskListView.as_view(), name='task-list'),
    
    # API endpoints
    path('api/tasks/', views.TaskListAPI.as_view(), name='api-task-list'),
    path('api/daily-tasks/', views.DailyTaskListAPI.as_view(), name='api-daily-task-list'),
]