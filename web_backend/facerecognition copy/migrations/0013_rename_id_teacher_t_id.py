# Generated by Django 4.1.3 on 2022-12-16 17:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('facerecognition', '0012_alter_teacher_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teacher',
            old_name='id',
            new_name='t_id',
        ),
    ]