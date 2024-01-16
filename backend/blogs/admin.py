from django.contrib import admin


from .models import Blog, Comment, Event, GalleryImage


admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Event)
admin.site.register(GalleryImage)
