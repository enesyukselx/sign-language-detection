import cv2
import numpy as np
import mediapipe as mp
from keras.models import load_model
from urllib.request import urlopen
from utils.mediapipe_detection import mediapipe_detection as mpdetection
from utils.extract_keypoints import extract_keypoints
from utils.draw_styled_landmarks import draw_styled_landmarks as dslandmarks
from settings.create_model import existing_label_map

colors = [(245,117,16), (117,245,16), (16,117,245)]
def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
    return output_frame

model = load_model('sign_language.h5')

mp_holistic = mp.solutions.holistic.Holistic()

url = "https://i.ytimg.com/vi/5XIzXpyz22E/maxresdefault.jpg" 
arr = np.asarray(bytearray(urlopen(url).read()), dtype=np.uint8)
img = cv2.imdecode(arr, -1)

image, results = mpdetection(img, mp_holistic)

#cv2.imshow("Processed Image", image)
#cv2.waitKey(0)
#cv2.destroyAllWindows()

keypoints = extract_keypoints(results)

X = np.expand_dims(keypoints, axis=0)
X = np.expand_dims(X, axis=0)

y_pred = model.predict(X)

for key, value in existing_label_map.items():
    print(f"{key}: %{y_pred[0][value-1]*100}")

print("Tahmin: ", max(existing_label_map, key=lambda k: y_pred[0][existing_label_map[k]-1]))