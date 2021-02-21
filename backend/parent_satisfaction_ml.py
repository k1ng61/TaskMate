# ML Random forest regressor algorithm using scikit-learn
import numpy as np
from numpy.random import choice, randint
import pandas as pd
import matplotlib.pyplot as plt
import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    credentials = credentials.Certificate('quarantine-quest-firebase-adminsdk-tpd7t-416ecc0fed.json')
    app = firebase_admin.initialize_app(credentials)

db = firestore.client()
users = db.collection("user_data")

for i in range(0, 200):
  user = {
    'Average time': randint(1,10),
    'Total finished': randint(3, 40),
    'Total missed': randint(1, 11)
  }
  n = randint(1, 30)
  user['Parent Satisfaction'] = n + (randint(2,10) if user['Average time'] < 4 else randint(0, 2))+ (randint(2,10) if user['Total finished'] > 20 else randint(0,1))+ (randint(2,10) if user['Total missed'] < 4 else randint(0,1))
                                               
  users.add(user)
  
docs = users.get()
data = []
for d in docs:
  data.append(d.to_dict())
  df = pd.DataFrame(data)
df.to_csv('data.csv', index = False)

df = pd.read_csv('data.csv')

from sklearn.model_selection import train_test_split

x = df.drop(labels = 'Parent Satisfaction', axis = 1)
y = df['Parent Satisfaction']

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.33, random_state = 24)

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

model = RandomForestRegressor(max_depth = 3, random_state = 23, n_estimators = 500)
model.fit(X_train, y_train)

predict = model.predict(X_test)
print(format(mean_absolute_error(y_test, predict)))

pd.DataFrame(data = [model.feature_importances_], columns = x.columns)

from sklearn.externals import joblib
joblib.dump(model, 'parent_satisfaction.joblib')
from firebase_admin import storage

bucket = storage.bucket(name = 'quarantine-quest.appspot.com')
b = bucket.blob('machine_learning/parent_satisfaction.joblib')
b.upload_from_filename('parent_satisfaction.joblib')
