from django.db import models
import datetime 

class father_response(models.Model):
    id = models.AutoField(primary_key=True)
    father_content = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.father_content[:50]  # Return the first 50 characters for display
    
    