from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions,status
from .serializers import MyTokenObtainPairSerializer,TeacherUserCreateSerializer,StudClassSerializer,StudentSerializer,TeacherCompleteRegistrationSerializer,TeacherRetrieveSerializer,StudentCreateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import TeacherUser,Student,StudClass
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
import requests
import json
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
back_url = "http://localhost:8000/api/"
front_url = "http://localhost:3000/"

User = get_user_model()

#function to identify type of user from jwt token
def identifyUserType(request):
    access_token = request.META['HTTP_AUTHORIZATION'][4:]
    token_decoded = jwt.decode(access_token,'secret',algorithms=['HS256'],options={'verify_signature': False,})
    return token_decoded['user_type']

def identifyTeacherStudClass(request):
    access_token = request.META['HTTP_AUTHORIZATION'][4:]
    token_decoded = jwt.decode(access_token,'secret',algorithms=['HS256'],options={'verify_signature': False,})
    return token_decoded['stud_class_name']

def identifyTeacherUserId(request):
    access_token = request.META['HTTP_AUTHORIZATION'][4:]
    token_decoded = jwt.decode(access_token,'secret',algorithms=['HS256'],options={'verify_signature': False,})
    return token_decoded['user_id']

# Create your views here.
class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    
class TeacherUserCreate(APIView):
    permission_classes = (permissions.AllowAny),
    
    def post(self,request, format='json'):
        serializer = TeacherUserCreateSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                random_password = User.objects.make_random_password(length=10, allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')
                teacher_email = serializer.data['email']
                teacher_password = random_password
                teacher_obj = TeacherUser.objects.get(username=serializer.data['username'])
                teacher_obj.set_password(teacher_password)
                teacher_obj.save()
                #request.data = {'username':serializer.data['username'],'password': serializer.data['username'] }
                req = requests.post(back_url+'token/obtain/', data={'username':serializer.data['username'],'password':teacher_password})
                req_as_dict = json.loads(req.text)
                print(req_as_dict)
                register_link = front_url + 'register/' + req_as_dict['refresh'] + "/" + serializer.data['username']
                mail_subject = "email: "+teacher_email + "\nPassword: "+teacher_password+"\n"+register_link
                send_mail(
                    subject='Teacher Login Details',
                    message=mail_subject,
                    from_email='',
                    recipient_list=[teacher_email],
                    fail_silently=False,
                )
                json_data = serializer.data
                return Response(json_data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherUserCompleteRegistration(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = [MultiPartParser,FormParser]
    def post(self, request,*args, **kwargs):
        print(request.data)
        serializer = TeacherCompleteRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            teacher = TeacherUser.objects.get(username = serializer.data['username'])
            if(teacher.register_complete == False):
                teacher.name = serializer.data['name']
                teacher.set_password(serializer.data['password'])
                teacher.register_complete = True
                teacher.save()
                return Response(serializer.data,status=status.HTTP_200_OK)

            else:
                return Response(status=status.HTTP_403_FORBIDDEN)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlackListRefreshView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        token = RefreshToken(request.data.get('refresh'))
        token.blacklist()
        return Response("blacklisted successfully")

class RetrieveTeacherUserName(APIView):
    def get(self, request, *args, **kwargs):
        user_id = identifyTeacherUserId(request)
        teacher_obj = TeacherUser.objects.get(id=user_id)
        print(teacher_obj.username)
        data = {'loggedUser': teacher_obj.username}
        return Response(data,status=status.HTTP_200_OK)
        
class TeacherRetrieveView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    def get(self, request, *args, **kwargs):
        print("acces toekn rest")
        access_token = request.META['HTTP_AUTHORIZATION'][4:]
        print(access_token)
        print(jwt.decode(access_token,'secret',algorithms=['HS256'],options={'verify_signature': False,}))
        teacherFields = TeacherUser.objects.all()
        teacher_serialized = TeacherRetrieveSerializer(teacherFields,many=True)
        return Response(teacher_serialized.data)

class RetrieveUserTypeAndStudClassName(APIView):
    def get(self, request, *args, **kwargs):
        user_type = identifyUserType(request)
        stud_class_name = identifyTeacherStudClass(request)
        data = {'user_type':user_type, 'stud_class_name':stud_class_name}
        return Response(data,status=status.HTTP_200_OK)

class TeacherDeleteView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    def delete(self,request, *args, **kwargs):
        words = request.headers
        if(TeacherUser.objects.get(id=words['Id'])):
            teacher_obj = TeacherUser.objects.get(id=words['Id'])
            if(teacher_obj.is_staff):
                return Response(status=status.HTTP_403_FORBIDDEN)
            teacher_obj.delete()
            return Response(status=status.HTTP_200_OK)

class StudentRetrieveView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    
    #Retrieve all students
    def get(self, request, *args, **kwargs):
        user_type = identifyUserType(request)
        if(user_type=='teacher'):
            stud_class_name = identifyTeacherStudClass(request)
            if(stud_class_name=='Not Assigned'):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:
                studentfields = Student.objects.filter(stud_class_name=stud_class_name)
        elif(user_type=='admin'):
            studentfields = Student.objects.all()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        student_serialized = StudentSerializer(studentfields,many=True)
        return Response(student_serialized.data,status=status.HTTP_200_OK)
class StudentCreateView(APIView):
    parser_classes = [MultiPartParser,FormParser]

    def post(self,request):
        serializer = StudentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

        

class StudClassRetrieve(APIView):
    parser_classes = [MultiPartParser,FormParser]

    def get(self, request, *args, **kwargs):
        studclassFields = StudClass.objects.all()
        studclass_serialized = StudClassSerializer(studclassFields,many=True)
        return Response(studclass_serialized.data)
    
    def post(self, request, *args, **kwargs):
        studclass_serialized = StudClassSerializer(data=request.data)
        if(studclass_serialized.is_valid()):
            print(studclass_serialized)
            studclass_serialized.save()
            return Response(studclass_serialized.data,status=status.HTTP_201_CREATED)
        print(studclass_serialized)

        return Response(studclass_serialized.errors,status=status.HTTP_400_BAD_REQUEST)

