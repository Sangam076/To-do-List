from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Taskapp
from .serializer import TaskappSerializer

@api_view(['GET'])
def get_task(request):
    tasks = Taskapp.objects.all()
    serializedData = TaskappSerializer(tasks, many=True).data

    return Response(serializedData)

@api_view(['POST'])
def create_task(request):
    data = request.data
    serializer = TaskappSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def update_task(request, pk):
    try:
        task = Taskapp.objects.get(pk=pk)
    except task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
    
    elif request.method == 'PUT':
        data = request.data
        serializer = TaskappSerializer(task, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)