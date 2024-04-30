from django.db import models


class TodoItemModel(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)  # type: ignore

    def __str__(self) -> str:
        return str(self.content)
