# Generated by Django 4.1.3 on 2022-12-15 12:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('facerecognition', '0008_rename_class_student_studclass'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studclass',
            name='teacher',
            field=models.ForeignKey(default='NULL', null=True, on_delete=django.db.models.deletion.CASCADE, to='facerecognition.teacher'),
        ),
    ]
