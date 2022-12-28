from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, LibraryUser


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class LibraryUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = LibraryUser
        fields = '__all__'

