from django.contrib import admin
from .models import Task, DailyTask

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'day_of_week')  # 在列表中顯示 'Task Name' 和 'Day of the Week'
    list_filter = ('day_of_week',)  # 添加過濾選項
    search_fields = ('name',)  # 添加搜尋功能

@admin.register(DailyTask)
class DailyTaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'day_of_week', 'task_type')  # 顯示 'Task Name'、'Day of the Week' 和 'Task Type'
    list_filter = ('day_of_week', 'task_type')  # 添加過濾選項
    search_fields = ('name',)  # 添加搜尋功能
