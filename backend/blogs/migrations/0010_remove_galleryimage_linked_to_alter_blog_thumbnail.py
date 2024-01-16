# Generated by Django 4.2.6 on 2023-12-20 20:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0009_galleryimage_linked_to'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='galleryimage',
            name='linked_to',
        ),
        migrations.AlterField(
            model_name='blog',
            name='thumbnail',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='blogs.galleryimage'),
        ),
    ]