import os
import json



def load_datesets():
    # Load dataset from JSON file and return python data for internal processing.
    file_path = os.path.join(os.path.dirname(__file__), "emotion_data.json")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data_sets = json.load(f)
        if isinstance(data_sets, dict):
            return data_sets
    except (FileNotFoundError, json.JSONDecodeError):
        pass

    return {"emotions": []}
