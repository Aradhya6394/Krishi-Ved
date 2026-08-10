# ============================================================
# KrishiVed - Plant Disease Prediction ML Service
# ============================================================

from flask import Flask, request, jsonify

import tensorflow as tf
import numpy as np
import json
import os
from io import BytesIO


# ============================================================
# 1. CREATE FLASK APPLICATION
# ============================================================

app = Flask(__name__)


# ============================================================
# 2. DEFINE BASE DIRECTORY
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(BASE_DIR, "model")

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "best_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    MODEL_DIR,
    "class_names.json"
)


# ============================================================
# 3. LOAD TRAINED MODEL
# ============================================================

print("Loading disease detection model...")

try:
    model = tf.keras.models.load_model(MODEL_PATH)

    print("Disease detection model loaded successfully!")

except Exception as error:
    print("❌ Failed to load disease detection model.")
    print(error)
    raise


# ============================================================
# 4. LOAD CLASS NAMES
# ============================================================

try:

    with open(CLASS_NAMES_PATH, "r") as file:
        class_names = json.load(file)

    print(f"Loaded {len(class_names)} disease classes.")

except Exception as error:

    print("❌ Failed to load class names.")
    print(error)

    raise


# ============================================================
# 5. MODEL SETTINGS
# ============================================================

IMAGE_SIZE = (224, 224)


# ============================================================
# 6. HEALTH CHECK ROUTE
# ============================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "KrishiVed Disease Detection ML Service is running!"
    })


# ============================================================
# 7. PREDICTION ROUTE
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    # --------------------------------------------------------
    # Check whether image was uploaded
    # --------------------------------------------------------

    if "image" not in request.files:

        return jsonify({
            "success": False,
            "message": "No image uploaded."
        }), 400


    image_file = request.files["image"]


    # --------------------------------------------------------
    # Check filename
    # --------------------------------------------------------

    if image_file.filename == "":

        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400


    try:

        # ----------------------------------------------------
        # Read image
        # ----------------------------------------------------

        image_bytes = image_file.read()

        image = tf.keras.utils.load_img(
            BytesIO(image_bytes),
            target_size=IMAGE_SIZE
        )


        # ----------------------------------------------------
        # Convert image to NumPy array
        # ----------------------------------------------------

        image_array = tf.keras.utils.img_to_array(image)


        # ----------------------------------------------------
        # Add batch dimension
        # (224,224,3) → (1,224,224,3)
        # ----------------------------------------------------

        image_array = np.expand_dims(
            image_array,
            axis=0
        )


        # ----------------------------------------------------
        # MobileNetV2 preprocessing
        # ----------------------------------------------------

        image_array = (
            tf.keras.applications.mobilenet_v2.preprocess_input(
                image_array
            )
        )


        # ----------------------------------------------------
        # Make prediction
        # ----------------------------------------------------

        predictions = model.predict(
            image_array,
            verbose=0
        )[0]


        # ----------------------------------------------------
        # Get top 3 predictions
        # ----------------------------------------------------

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


        # ----------------------------------------------------
        # Best prediction
        # ----------------------------------------------------

        best_prediction = top_predictions[0]


        # ----------------------------------------------------
        # Return response
        # ----------------------------------------------------

        return jsonify({

            "success": True,

            "prediction": best_prediction,

            "topPredictions": top_predictions

        })


    except Exception as error:

        print("❌ Prediction error:", error)

        return jsonify({

            "success": False,

            "message": "Failed to process image."

        }), 500


# ============================================================
# 8. START SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=False
    )