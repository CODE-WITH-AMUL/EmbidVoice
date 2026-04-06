from django.db import models




class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        

class TextModel(TimeStampModel):
    text_id = models.AutoField(primary_key=True)
    text_content = models.TextField(db_index=True)
    
    def __str__(self):
        return self.text_content[:50]  # Return the first 50 characters for display
