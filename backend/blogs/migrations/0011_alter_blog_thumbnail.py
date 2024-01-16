# Generated by Django 4.2.6 on 2023-12-20 20:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0010_remove_galleryimage_linked_to_alter_blog_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='thumbnail',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='blogs.galleryimage'),
        ),
    ]