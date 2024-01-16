from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from .models import Blog, Comment, Event, GalleryImage
from .serializers import BlogAdminListSerializer, BlogListSerializer, BlogDetailSerializer, CommentSerializer, CommentAdminSerializer, BlogCreateEditSerializer, EventListSerializer, GalleryListSerializer, GalleryListAdminSerializer
from datetime import datetime, timezone
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT

from .pagination import StandardPagination

from .utils import create_event_for_blog, create_thumbnail_for_blog

class BlogsViewset(ModelViewSet):
    queryset = Blog.objects.all()
    pagination_class = StandardPagination
    lookup_field = "slug"

    def get_queryset(self):
        queryset = self.queryset.order_by('-creation_time')
        
        # Filter only works for staff
        if self.request.user.is_staff:
            events = self.request.query_params.get('events')
            if events is not None:
                if events == "True":
                    queryset = queryset.filter(event__isnull=False)
        
            search = self.request.query_params.get('q')
            if search is not None:
                queryset = queryset.filter(title__contains=search)
            
            return queryset
        return queryset.filter(is_listed=True)
    
    def get_serializer_class(self):
        if self.request.method == "POST" or self.request.method == "PATCH":
            return BlogCreateEditSerializer
        else:
            print(self.request.user)
            if self.request.user.is_staff:
                if self.action == "list":
                    return BlogAdminListSerializer
                elif self.action == "retrieve":
                    return BlogDetailSerializer
            else:
                print(self.action)
                if self.action == "list":
                    return BlogListSerializer
                elif self.action == "retrieve":
                    return BlogDetailSerializer
        

    def retrieve(self, request, *args, **kwargs):
        blog = self.get_object()
        if not request.user.is_staff:
            if not blog.is_underconstruction:
                serializer = self.get_serializer(blog)
                return Response(serializer.data)
            else:
                return Response({"code": "under_construction"})
        else:
                serializer = self.get_serializer(blog)
                return Response(serializer.data)


    def perform_create(self, serializer):
        thumbnail = None
        if self.request.FILES.get('up_thumbnail') is not None:
            thumbnail = create_thumbnail_for_blog(self.request)
        
        if thumbnail is not None:
            blog = serializer.save(thumbnail=thumbnail)
        else:
            blog = serializer.save()
        create_event_for_blog(self.request, blog)
    
    def perform_update(self, serializer):
        blog = self.get_object()
        thumbnail = None
        if self.request.FILES.get('up_thumbnail') is not None:
            thumbnail = create_thumbnail_for_blog(self.request)
            try:
                if blog.thumbnail:
                    oldgimg = GalleryImage.objects.get(blog=blog)
                    oldgimg.delete()
            except GalleryImage.DoesNotExist:
                pass
        if thumbnail is not None:
            blog = serializer.save(thumbnail=thumbnail)
        else:
            blog = serializer.save()
        
        create_event_for_blog(self.request, blog)

    def destroy(self, request, *args, **kwargs):
        blog = self.get_object()
        event = blog.event
        if event:
            event.delete()
        galleryimg = blog.thumbnail
        if galleryimg:
            galleryimg.delete()
        self.perform_destroy(blog)
        return Response(status=HTTP_204_NO_CONTENT)
        
            
        

    # def perform_create(self, serializer):
    #     thumbnail = self.request.data.get("blogThumbnail")
    #     serializer.save()
        


class CommentViewset(ModelViewSet):
    serializer_class = CommentAdminSerializer
    queryset = Comment.objects.all().order_by('-created_on')

    def get_serializer_class(self):
        if self.request.user:
            if self.request.user.is_staff:
                return CommentAdminSerializer
            else:
                return CommentAdminSerializer

    def get_queryset(self):
        slug = self.request.query_params.get('slug')
        if slug is not None:
            return self.queryset.filter(blog__slug=slug)
        else:
            if self.request.user and self.request.user.is_staff:
                return self.queryset

         
    def perform_create(self, serializer):
        blog_slug = self.request.data.get('slug')

        blog = Blog.objects.get(slug=blog_slug)
        serializer.save(blog=blog)


    
class GalleryViewset(ModelViewSet):
    serializer_class = GalleryListSerializer
    queryset = GalleryImage.objects.all()
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.request.user:
            if self.request.user.is_staff:
                return GalleryListAdminSerializer
            else:
                return GalleryListSerializer





class EventList(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer
    pagination_class = StandardPagination

EventListView = EventList.as_view()

