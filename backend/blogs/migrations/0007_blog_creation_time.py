# Generated by Django 4.2.6 on 2023-12-16 19:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0006_blog_raw_content_blog_short_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='creation_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
