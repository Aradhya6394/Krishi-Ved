from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json
import os
import joblib
import pandas as pd
from io import BytesIO

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

DISEASE_MODEL_PATH = os.path.join(
    MODEL_DIR,
    "best_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    MODEL_DIR,
    "class_names.json"
)

CROP_MODEL_PATH = os.path.join(
    MODEL_DIR,
    "crop_recommendation_model.pkl"
)

print("Loading disease detection model...")

try:
    disease_model = tf.keras.models.load_model(DISEASE_MODEL_PATH)
    print("Disease detection model loaded successfully!")
except Exception as error:
    print("Failed to load disease detection model.")
    print(error)
    raise


try:
    with open(CLASS_NAMES_PATH, "r") as file:
        class_names = json.load(file)

    print(f"Loaded {len(class_names)} disease classes.")

except Exception as error:
    print("Failed to load class names.")
    print(error)
    raise


print("Loading crop recommendation model...")

try:
    crop_model = joblib.load(CROP_MODEL_PATH)
    print("Crop recommendation model loaded successfully!")
except Exception as error:
    print("Failed to load crop recommendation model.")
    print(error)
    raise


IMAGE_SIZE = (224, 224)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "KrishiVed ML Service is running!"
    })


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded."
        }), 400

    image_file = request.files["image"]

    if image_file.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    try:
        image_bytes = image_file.read()

        image = tf.keras.utils.load_img(
            BytesIO(image_bytes),
            target_size=IMAGE_SIZE
        )

        image_array = tf.keras.utils.img_to_array(image)

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        image_array = (
            tf.keras.applications.mobilenet_v2.preprocess_input(
                image_array
            )
        )

        predictions = disease_model.predict(
            image_array,
            verbose=0
        )[0]

        top3_indices = np.argsort(predictions)[-3:][::-1]

        top_predictions = []

        for class_id in top3_indices:

            class_id = int(class_id)

            if isinstance(class_names, dict):
                disease_name = class_names[str(class_id)]
            else:
                disease_name = class_names[class_id]

            top_predictions.append({
                "disease": disease_name,
                "confidence": round(
                    float(predictions[class_id]) * 100,
                    2
                )
            })

        best_prediction = top_predictions[0]

        return jsonify({
            "success": True,
            "prediction": best_prediction,
            "topPredictions": top_predictions
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to process image."
        }), 500


@app.route("/recommend-crops", methods=["POST"])
def recommend_crops():

    try:
        data = request.get_json()

        required_fields = [
            "N",
            "P",
            "K",
            "temperature",
            "humidity",
            "ph",
            "rainfall"
        ]

        missing_fields = [
            field
            for field in required_fields
            if field not in data
        ]

        if missing_fields:
            return jsonify({
                "success": False,
                "message": "Missing required fields.",
                "missingFields": missing_fields
            }), 400

        input_data = pd.DataFrame([{
            "N": float(data["N"]),
            "P": float(data["P"]),
            "K": float(data["K"]),
            "temperature": float(data["temperature"]),
            "humidity": float(data["humidity"]),
            "ph": float(data["ph"]),
            "rainfall": float(data["rainfall"])
        }])

        probabilities = crop_model.predict_proba(input_data)[0]

        results = [
            {
                "crop": crop,
                "confidence": round(
                    float(probability) * 100,
                    2
                )
            }
            for crop, probability
            in zip(
                crop_model.classes_,
                probabilities
            )
        ]

        results.sort(
            key=lambda item: item["confidence"],
            reverse=True
        )

        top_recommendations = results[:5]

        return jsonify({
            "success": True,
            "recommendations": top_recommendations
        })

    except Exception as error:

        print("Crop recommendation error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to generate crop recommendations."
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=False
    )