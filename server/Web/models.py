from django.db import models

class Task(models.Model):
    DAY_OF_WEEK_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    
    day_of_week = models.CharField(
        max_length=10, 
        choices=DAY_OF_WEEK_CHOICES, 
        verbose_name="Day of the Week"  # 添加 verbose_name
    )
    name = models.CharField(
        max_length=100, 
        verbose_name="Task Name"  # 添加 verbose_name
    )

    def __str__(self):
        return f"{self.name} on {self.day_of_week}"

class DailyTask(Task):
    TASK_TYPE_CHOICES = [
        ('Work', 'Work'),
        ('Exercise', 'Exercise'),
        ('Study', 'Study'),
        ('Leisure', 'Leisure'),
    ]

    task_type = models.CharField(
        max_length=50, 
        choices=TASK_TYPE_CHOICES, 
        verbose_name="Task Type"  # 添加 verbose_name
    )

    def __str__(self):
        return f"{self.name} ({self.task_type}) on {self.day_of_week}"
