# Generated by Django 4.2.6 on 2023-12-20 09:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0008_comment_created_on_alter_blog_event'),
    ]

    operations = [
        migrations.AddField(
            model_name='galleryimage',
            name='linked_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='blogs.blog'),
        ),
    ]
