# Generated by Django 4.2.6 on 2023-12-30 19:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0013_blog_is_listed_blog_is_underconstruction_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='event',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blog', to='blogs.event'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='thumbnail',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='blogs.galleryimage'),
        ),
    ]