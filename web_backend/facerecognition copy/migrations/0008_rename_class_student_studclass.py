# Generated by Django 4.1.3 on 2022-12-15 12:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('facerecognition', '0007_remove_studclass_id_alter_studclass_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='Class',
            new_name='studclass',
        ),
    ]