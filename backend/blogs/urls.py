from rest_framework import routers
from .views import BlogsViewset, CommentViewset, EventListView, GalleryViewset
from django.urls import path


router = routers.SimpleRouter()
router.register(r'blogs', BlogsViewset)
router.register(r'comments', CommentViewset)
router.register(r'gallery', GalleryViewset)


urlpatterns = [
    path('events/', EventListView, name='event_list')
]

urlpatterns += router.urls
