import pandas as pd
from sklearn.datasets import load_diabetes

# Загрузка датасета
diabetes = load_diabetes(as_frame=True)
data = diabetes.frame

# Сохранение в CSV
data.to_csv('diabetes.csv', index=False)