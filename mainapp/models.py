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


class Worker(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)


class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_name = models.CharField(max_length=64, unique=True, verbose_name="Project name")
    repo_link = models.CharField(max_length=64, unique=True, verbose_name="Repository link")
    worker = models.ManyToManyField(Worker)


class TODO(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, verbose_name="Task")
    description = models.TextField(verbose_name="Description", blank=True, null=True)
    creator = models.OneToOneField(Worker, null=True, on_delete=models.SET_NULL)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created", editable=False)
    active = models.BooleanField(default=True)
