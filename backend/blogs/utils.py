from datetime import datetime, timezone
from .models import Event, GalleryImage

def create_event_for_blog(request, blog):
    # Check if there is an event there, in that case, create a new event and set the event to the new blog
    is_event = request.data.get("is_event")
    event_date_i = request.data.get("event_date")
    print(is_event, event_date_i)
    if is_event == "true":
        try:
            event_object = Event.objects.get(blog=blog)
            seconds = int(event_date_i) / 1000
            date_object = datetime.utcfromtimestamp(seconds).replace(tzinfo=timezone.utc)
            event_object.title = blog.title  
            event_object.time = date_object
            event_object.save()
        except Event.DoesNotExist:
            seconds = int(event_date_i) / 1000
            date_object = datetime.utcfromtimestamp(seconds).replace(tzinfo=timezone.utc)
            new_event = Event(title=blog.title, time=date_object)
            new_event.save()
            blog.event = new_event
            blog.save()
    else:
        try:

            event_object = Event.objects.get(blog=blog)
            event_object.delete()
        except Event.DoesNotExist:
            pass


def create_thumbnail_for_blog(request):
    img = request.FILES.get('up_thumbnail')
    thumbnail = GalleryImage(image=img)
    thumbnail.save()
    return thumbnail