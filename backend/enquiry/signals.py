import os
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Enquiry

@receiver(post_delete, sender=Enquiry)
def delete_photo_on_delete(sender, instance, **kwargs):
    if instance.photo:
        if os.path.isfile(instance.photo.path):
            os.remove(instance.photo.path)


