from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    #email = models.EmailField(blank=False)
    #password = models.CharField(min_length=4,write_only=True)
    fav_color = models.CharField(default='No COlor', blank=False, max_length=120)
