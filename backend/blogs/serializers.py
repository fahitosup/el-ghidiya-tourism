from rest_framework import serializers

from .models import Blog, Comment, Event, GalleryImage


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields = ('name', 'text')

class CommentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields = ('id', 'name', 'text')


class CommentOnBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('name', "text")


        
class BlogCreateEditSerializer(serializers.ModelSerializer):
    up_thumbnail = serializers.FileField(required=False, read_only=True)

    is_event = serializers.BooleanField(read_only=True)
    event_date = serializers.IntegerField(read_only=True)
    class Meta:
        model = Blog
        fields = ['title', 'content', "raw_content", "up_thumbnail", "is_underconstruction", "is_listed", "is_event", "event_date"]
    
    

class BlogListSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['title', 'short_description', 'thumbnail', "slug"]
        
    def get_thumbnail(self, obj):
        if hasattr(obj.thumbnail, "image"):
            request = self.context.get('request')
            return request.build_absolute_uri(obj.thumbnail.image.url)



        
class BlogAdminListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['slug', 'title', 'short_description', 'thumbnail']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title', 'time']

class BlogDetailSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    comments = CommentOnBlogSerializer(many=True)
    event = EventSerializer()
    class Meta:
        model = Blog
        fields = ['slug', 'thumbnail', 'title', 'content', 'comments', 'event', 'creation_time', 'is_underconstruction', 'is_listed']
    
    def get_thumbnail(self, obj):
        if hasattr(obj.thumbnail, "image"):
            request = self.context.get('request')
            return request.build_absolute_uri(obj.thumbnail.image.url)


class EventListSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = ['title', 'thumbnail', 'short_description', 'slug']

    def get_thumbnail(self, obj):
        if hasattr(obj, 'blog') and obj.blog.thumbnail:
            request = self.context.get('request')
            if request is not None:
                thumbnail_url = request.build_absolute_uri(obj.blog.thumbnail.image.url)
                return thumbnail_url
        return ""
    
    def get_short_description(self, obj):
        if hasattr(obj, 'blog'):
            return obj.blog.short_description
        return ""
    
    def get_slug(self, obj):
        if hasattr(obj, 'blog'):
            return obj.blog.slug
        return ""
    

class GalleryListSerializer(serializers.ModelSerializer):
    blog_slug = serializers.SerializerMethodField()
    
    class Meta:
        model = GalleryImage
        fields = ['image', 'blog_slug']

    def get_blog_slug(self, obj):
        if hasattr(obj, "blog"):
            return obj.blog.slug
        return ""
    

class GalleryListAdminSerializer(serializers.ModelSerializer):
    blog_slug = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = [ 'id', 'image', 'blog_slug']

    def get_blog_slug(self, obj):
        if hasattr(obj, "blog"):
            return obj.blog.slug
        return ""
    
    def get_image(self, obj):

        request = self.context.get('request')
        if request is not None:
            print(obj.image)
            return request.build_absolute_uri(obj.image.url)
        