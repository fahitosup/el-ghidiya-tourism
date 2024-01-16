

from django.core.mail import send_mail
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

def send_mail_lol(fn, ln, em, m):

    subject = f"Customer Inquiry: {fn} {ln}"
    m = f"From: {em}\n\n{m}"

    send_mail(subject, m, "soueilem@elghidiya.com", ("soueilem@elghidiya.com",))



class CreateMail(CreateAPIView):
    def create(self, request):
        
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        message = request.data.get('last_name')

        send_mail_lol(first_name, last_name, email, message)
        return Response(status=200)
    
CreateMailView = CreateMail.as_view()