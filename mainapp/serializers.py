from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Author, LibraryUser, Worker, Project, TODO


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class LibraryUserModelSerializer(ModelSerializer):
    class Meta:
        model = LibraryUser
        fields = '__all__'


class WorkerModelSerializer(ModelSerializer):
    class Meta:
        model = Worker
        exclude = ['id']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    worker = WorkerModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(HyperlinkedModelSerializer):
    creator = WorkerModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'

