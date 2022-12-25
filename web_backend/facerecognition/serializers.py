from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import TeacherUser,Student,StudClass
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from .models import TeacherUser,StudClass

User = get_user_model()

#Function to find the stud_class of a teacher
def findTeachersStudClass(user_id):
    try:
        stud_class_obj = StudClass.objects.get(teacher=user_id)
        if(stud_class_obj.teacher):
            print("teacher's id = ")
            print(stud_class_obj.teacher)
            return stud_class_obj.stud_class_name
    except:
        pass
    return None

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token = super(MyTokenObtainPairSerializer,cls).get_token(user)
        token['stud_class_name'] = 'Not Assigned'
        try:
            teacher_obj = TeacherUser.objects.get(id=token['user_id'])
            stud_class_name = findTeachersStudClass(token['user_id'])
            if(stud_class_name):
                token['stud_class_name'] = stud_class_name
            print(stud_class_name)
            if(teacher_obj.is_staff == False):
                token['user_type'] = 'teacher'
                return token
        except:
            pass
        token['user_type'] = 'admin'
        token['stud_class_name'] = 'all'
        return token
class TeacherUserCreateSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required = True)
    name = serializers.CharField(required=True)
    #password = serializers.CharField(min_length=4)
    
    class Meta:
        model = TeacherUser
        fields = ('email','username','name','subject')
        #extra_kwargs = {'password': {'write_only': True}} #Dont write password to database yet

    def create(self, validated_data):
        #random_password = User.objects.make_random_password(length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')
        default_password = "12345678"
        #password = validated_data.pop('password', None) #Pops password from validated_data dictionary
        instance = self.Meta.model(**validated_data) #Create a new serializer obj with current validated_data
        if default_password is not None:
            instance.set_password(default_password) #Set hashed password to user instance

        instance.save() #Save serializer data to database (User created)
        print("Default Password is : "+default_password)
        return instance

class TeacherCompleteRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required = True)
    name = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    class Meta:
        model = TeacherUser
        fields = ('username','name','password')


'''
class TeacherEditSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Teacher
        fields = ['id','name','subject']
'''
class TeacherRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        fields = ['id','name','subject','username']
'''
class TeacherDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    class Meta:
        fields = ['id']
'''
class StudClassRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudClass
        fields = ['teacher']

class StudentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = ['id','name','dob','stud_class_name']

class StudentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name','stud_class_name']

class StudClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudClass
        fields = ['stud_class_name','teacher']