from django.shortcuts import render
from .models import TextModel
from .ApiV1.emotion_embid import load_datesets
from .ApiV1.processing import processing_response



def index(request):
    template_name = "index.html"
    context = {}

    if request.method == "POST":
        user_input = request.POST.get("text_input") or request.POST.get("user_input")

        if not user_input:
            context["error"] = "Please enter a message."
        else:
            data_sets = load_datesets()
            response = processing_response(user_input, data_sets)

            # Save the user input for simple chat history.
            TextModel.objects.create(text_content=user_input)

            context["response"] = response
            context["user_input"] = user_input

    return render(request, template_name, context)