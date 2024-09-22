# core
from django.views.generic import ListView
# rest_framework
from rest_framework import generics
# models & serializers
from .models import Task, DailyTask
from .serializers import TaskSerializer, DailyTaskSerializer

class TaskListView(ListView):
    model = Task
    template_name = 'tasks/task_list.html'  # 指定模板名稱
    context_object_name = 'tasks'  # 在模板中使用的變數名稱
# API to list all tasks
class TaskListAPI(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# API to list all daily tasks
class DailyTaskListAPI(generics.ListAPIView):
    queryset = DailyTask.objects.all()
    serializer_class = DailyTaskSerializer
