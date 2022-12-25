from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions,status
from .serializers import MyTokenObtainPairSerializer,CustomUserSerializer,TeacherEditSerializer,StudClassSerializer,StudentSerializer,TeacherCreateRetrieveSerializer,TeacherDeleteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Teacher,Student,StudClass
from django.core.mail import send_mail


# Create your views here.
class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny),
    
    def post(self,request, format='json'):
        serializer = CustomUserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

class TeacherCreateRetrieveView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    
    def get(self, request, *args, **kwargs):
        teacherFields = Teacher.objects.all()
        teacher_serialized = TeacherCreateRetrieveSerializer(teacherFields,many=True)
        '''send_mail(
            subject='Test Subject',
            message='Test Message',
            from_email='',
            recipient_list=['tintappi@gmail.com'],
            fail_silently=False,
        )'''
        return Response(teacher_serialized.data)

    def post(self,request, *args, **kwargs): #Add new name and face data
        teacher_serialized = TeacherCreateRetrieveSerializer(data=request.data)
        if(teacher_serialized.is_valid()):
            teacher_serialized.save()
            return Response(teacher_serialized.data,status=status.HTTP_201_CREATED)
        print(teacher_serialized)
        print(teacher_serialized.errors)
        return Response(teacher_serialized.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, *args, **kwargs):
        words = request.headers
        if(Teacher.objects.filter(id=words['Id'])):
            teacher_obj = Teacher.objects.filter(id=words['Id'])
            teacher_obj.delete()
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
class TeacherEditView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    def post(self, request, *args, **kwargs):
        teacher_serialized = TeacherEditSerializer(data=request.data)
        print(request.data)
        if(teacher_serialized.is_valid()):
            teacher_obj = Teacher.objects.filter(id=teacher_serialized.data['id'])
            teacher_obj.update(name=teacher_serialized.data['name'],subject=teacher_serialized.data['subject'])
            #print(teacher_obj)
            return Response(teacher_serialized.data,status=status.HTTP_200_OK)
        return Response(teacher_serialized.errors,status=status.HTTP_400_BAD_REQUEST)


class StudClassCreateRetrieve(APIView):
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

