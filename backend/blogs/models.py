from django.db import models
from django.utils import timezone

from slugify import slugify
import os




def upload_image_to(instance, filename):
    # instead of uploading an image, make a galleryimage model and link it to that same image over here
    return os.path.join('gallery', filename)

class GalleryImage(models.Model):
    image = models.ImageField(upload_to=upload_image_to, null=False, blank=False)

class Blog(models.Model):

    title = models.CharField(max_length=255)
    # thumbnail = models.ImageField(upload_to=upload_image_to, null=True, blank=True, )
    thumbnail = models.OneToOneField(GalleryImage, on_delete=models.SET_NULL, blank=True, null=True, default=None)
    raw_content = models.TextField()
    content = models.TextField()
    is_underconstruction = models.BooleanField(default=False)
    is_listed = models.BooleanField(default=True)

    short_description = models.CharField(max_length=190)

    event = models.OneToOneField("Event", on_delete=models.SET_NULL, blank=True, null=True, related_name="blog")

    slug = models.SlugField(unique=True, blank=True, null=True)

    creation_time = models.DateTimeField(auto_now_add=True)


    def save(self, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        self.short_description = str(self.raw_content[:187]) + "..."
        super(Blog, self).save(**kwargs)
    
    def __str__(self) -> str:
        return str(self.id) + ": " + self.title

class Comment(models.Model):
    name = models.CharField(max_length=30, default="Anonymous User")
    text = models.CharField(max_length=1024)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return "Comment by " + self.name + " on " + str(self.blog.title)

class Event(models.Model):
    title = models.CharField(max_length=255)
    time = models.DateTimeField()

    def __str__(self) -> str:
        return self.title

