import logging

from fastapi import FastAPI
import joblib
import numpy as np
from tensorflow.keras.models import load_model

app = FastAPI()

# Загрузка моделей
model_rf = joblib.load('best_modelRF.pkl')
model_xgb = joblib.load('best_modelXGB.pkl')
model_nn = load_model('best_modelNN.h5')

logger = logging.getLogger('uvicorn.error')

@app.post("/predict")
def predict(data: dict):
  # Преобразование входных данных в массив
  input_data = np.array(list(data.values())).reshape(1, -1)

  # Предсказания
  prediction_rf = model_rf.predict(input_data)[0]
  prediction_xgb = model_xgb.predict(input_data)[0]
  prediction_nn = model_nn.predict(input_data)[0][0]  # Нейронная сеть возвращает 2D массив

  # Возврат результатов
  return {
    "Random Forest": float(prediction_rf),
    "XGBoost": float(prediction_xgb),
    "Neural Network": float(prediction_nn)
  }