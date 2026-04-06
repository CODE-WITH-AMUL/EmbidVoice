import random

def processing_response(user_input, data_sets):
    user_input = user_input.lower()  # Normalize user input for case-insensitive matching.

    for emotion in data_sets.get("emotions", []):
        responses = emotion.get("responses", [])
        if not responses:
            continue

        for pattern in emotion.get("patterns", []):
            if isinstance(pattern, str) and pattern and pattern.lower() in user_input:
                return random.choice(responses)

    return "Sorry, I couldn't understand that. Can you please rephrase?"

