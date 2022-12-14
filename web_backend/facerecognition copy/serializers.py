from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser,Student,Teacher,StudClass
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token = super(MyTokenObtainPairSerializer,cls).get_token(user)
        token['fav_color'] = user.fav_color
        return token
class CustomUserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required = True)
    password = serializers.CharField(min_length=4)
    
    class Meta:
        model = CustomUser
        fields = ('email','username','password')
        extra_kwargs = {'password': {'write_only': True}} #Dont write password to database

    def create(self, validated_data):
        password = validated_data.pop('password', None) #Pops password from validated_data dictionary
        instance = self.Meta.model(**validated_data) #Create a new serializer obj with current validated_data
        if password is not None:
            instance.set_password(password) #Set hashed password to user instance
        instance.save() #Save serializer data to database (User created)
        return instance

class TeacherEditSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Teacher
        fields = ['id','name','subject']

class TeacherCreateRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id','name','subject']

class TeacherDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    class Meta:
        fields = ['id']



class StudentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = ['name','dob','studclass']

class StudClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudClass
        fields = ['name','teacher']