from rest_framework.viewsets import ModelViewSet
from .models import Author, LibraryUser
from .serializers import AuthorModelSerializer, LibraryUserModelSerializer


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class LibraryUserModelViewSet(ModelViewSet):
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserModelSerializer

