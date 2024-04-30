from todo.models import TodoItemModel
from rest_framework import serializers


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoItemModel
        fields = ["id", "content", "completed", "created_at", "updated_at"]
