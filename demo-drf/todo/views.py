from rest_framework import viewsets

from todo.models import TodoItemModel
from todo.serializer import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = TodoItemModel.objects.all()  # type: ignore
    serializer_class = TodoSerializer
    permission_classes = []
