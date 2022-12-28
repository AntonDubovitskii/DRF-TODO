from django.db import models
from uuid import uuid4


class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()


class LibraryUser(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    username = models.CharField(max_length=32, unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(unique=True)