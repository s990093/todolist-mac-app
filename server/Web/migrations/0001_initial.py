# Generated by Django 5.0.6 on 2024-09-22 16:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_of_week', models.CharField(choices=[('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'), ('Sunday', 'Sunday')], max_length=10, verbose_name='Day of the Week')),
                ('name', models.CharField(max_length=100, verbose_name='Task Name')),
            ],
        ),
        migrations.CreateModel(
            name='DailyTask',
            fields=[
                ('task_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='Web.task')),
                ('task_type', models.CharField(choices=[('Work', 'Work'), ('Exercise', 'Exercise'), ('Study', 'Study'), ('Leisure', 'Leisure')], max_length=50, verbose_name='Task Type')),
            ],
            bases=('Web.task',),
        ),
    ]