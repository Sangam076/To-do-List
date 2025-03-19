from rest_framework import serializers
from .models import Taskapp

class TaskappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taskapp
        fields = '__all__'
        