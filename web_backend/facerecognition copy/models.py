from django.db import models
from datetime import date
# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    #email = models.EmailField(blank=False)
    #password = models.CharField(min_length=4,write_only=True)
    fav_color = models.CharField(default='No COlor', blank=False, max_length=120)

class TeacherUser(AbstractUser):
    teacher_name = models.CharField(blank=False,max_length=50)
    department = models.CharField(max_length=50)
class Teacher(models.Model):
    id = models.AutoField(primary_key=True,auto_created=True)
    name = models.CharField(null=False,max_length=30)
    subject = models.CharField(null=True,default='Not Assigned',max_length=30)

class StudClass(models.Model):
    name = models.CharField(unique=True,null=False,max_length=30,primary_key=True)
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True,blank=True)
class Student(models.Model):
    name = models.CharField(null=False,max_length=30)
    dob = models.DateField(null=True,default=date.today())
    studclass = models.ForeignKey(StudClass,on_delete=models.CASCADE,null=True,to_field='name')