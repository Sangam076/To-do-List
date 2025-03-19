from django.db import models

# Create your models here.
class Taskapp(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=100)
    task_time = models.IntegerField(max_length=20)

    def __str__(self):
        return self.task_name
    