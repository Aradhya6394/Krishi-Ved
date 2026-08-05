# ============================================================
# KrishiVed - Plant Disease Prediction ML Service
# ============================================================

# Flask is used to create our Python API
from flask import Flask, request, jsonify

# TensorFlow is used to load and run our trained model
import tensorflow as tf

# Used for image processing and numerical operations
import numpy as np

# Used to read class_names.json
import json

# Used to work with file paths
import os
from io import BytesIO


# ============================================================
# 1. CREATE FLASK APPLICATION
# ============================================================

app = Flask(__name__)


# ============================================================
# 2. DEFINE MODEL PATHS
# ============================================================

# Folder where our trained model and class names are stored
MODEL_DIR = "model"

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

model = tf.keras.models.load_model(MODEL_PATH)

print("Disease detection model loaded successfully!")


# ============================================================
# 4. LOAD CLASS NAMES
# ============================================================

with open(CLASS_NAMES_PATH, "r") as file:
    class_names = json.load(file)

print(f"Loaded {len(class_names)} disease classes.")


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

    # Check whether an image was included
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded."
        }), 400

    image_file = request.files["image"]

    # Make sure a file was actually selected
    if image_file.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    try:

        # ----------------------------------------------------
        # Load image and resize it to the size used during
        # model training
        # ----------------------------------------------------

        image = tf.keras.utils.load_img(
        BytesIO(image_file.read()),
        target_size=IMAGE_SIZE
        )

        # Convert image to NumPy array
        image_array = tf.keras.utils.img_to_array(image)

        # Add batch dimension
        # (224,224,3) → (1,224,224,3)
        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        # ----------------------------------------------------
        # Apply MobileNetV2 preprocessing
        # ----------------------------------------------------

        image_array = tf.keras.applications.mobilenet_v2.preprocess_input(
            image_array
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

        top3_indices = np.argsort(
            predictions
        )[-3:][::-1]

        top_predictions = []

        for class_id in top3_indices:

            top_predictions.append({
                "disease": class_names[str(class_id)]
                    if isinstance(class_names, dict)
                    else class_names[class_id],

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
        # Send response
        # ----------------------------------------------------

        return jsonify({
            "success": True,

            "prediction": best_prediction,

            "topPredictions": top_predictions
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to process image.",
            "error": str(error)
        }), 500


# ============================================================
# 8. START SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )