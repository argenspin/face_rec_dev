from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CustomUserCreate,ObtainTokenPairWithColorView,HelloWorldView,TeacherCreateRetrieveView,StudClassCreateRetrieve,TeacherEditView
urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),

    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),  # override sjwt stock token

    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('hello/', HelloWorldView.as_view(), name='hello_world'),

    path('teacher/',TeacherCreateRetrieveView.as_view(), name='teacher_operations',),

    path('studclass/',StudClassCreateRetrieve.as_view(), name='stud_class_operations'),

    path('teacher/edit/',TeacherEditView.as_view(), name="teacher_edit"),
]
