from django.contrib import admin
from .models import CustomUser,Student,Teacher,StudClass
# Register your models here.

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Student,CustomUserAdmin)
admin.site.register(Teacher,CustomUserAdmin)
admin.site.register(StudClass,CustomUserAdmin)