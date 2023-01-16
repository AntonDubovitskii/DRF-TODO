from rest_framework.viewsets import ModelViewSet
from .models import Author, LibraryUser, Worker, TODO, Project
from .serializers import AuthorModelSerializer, LibraryUserModelSerializer, WorkerModelSerializer, \
    TODOModelSerializer, ProjectModelSerializer


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class LibraryUserModelViewSet(ModelViewSet):
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserModelSerializer


class WorkerModelViewSet(ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerModelSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

