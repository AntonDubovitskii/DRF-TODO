from rest_framework import mixins, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Author, LibraryUser, Worker, TODO, Project
from .serializers import AuthorModelSerializer, LibraryUserModelSerializer, WorkerModelSerializer, \
    TODOModelSerializer, ProjectModelSerializer, TODOModelSerializerBase, ProjectModelSerializerBase


class ProjectPaginator(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 100

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class ToDoPaginator(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'size'
    max_page_size = 1000


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class LibraryUserModelViewSet(mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              mixins.ListModelMixin,
                              viewsets.GenericViewSet):
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserModelSerializer


class WorkerModelViewSet(ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerModelSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = ToDoPaginator

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.active = False
        todo.save()
        return Response(data='delete success')

    def get_queryset(self):
        proj_id = self.request.query_params.get('project_id', '')
        todo = TODO.objects.all()
        if proj_id:
            todo = todo.filter(project_id__contains=proj_id)
        return todo

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TODOModelSerializer
        return TODOModelSerializerBase


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginator

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(project_name__contains=name)
        return projects


