from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import ServiceUser, Project, TODO


class ServiceUserModelSerializer(ModelSerializer):
    class Meta:
        model = ServiceUser
        fields = ('id', 'first_name', 'last_name', 'age', 'email')


class ServiceUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = ServiceUser
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    employee = ServiceUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    creator = ServiceUserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'


class TODOModelSerializerBase(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'

