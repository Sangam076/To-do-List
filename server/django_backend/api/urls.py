from django.urls import path
from .views import get_task, create_task, update_task
urlpatterns = [
    path('tasks/', get_task, name='get_task'),
    path('create/', create_task, name='create_task'),
    path('tasks/<int:pk>/', update_task, name='update_task'),
]