import numpy as np

DATA_PATH="MP_Data"
existing_label_map = {'merhaba':1,'tamam':2,'seni seviyorum':3}
new_actions_with_labels = {}
# Five videos worth of data
no_sequences = 5
# Videos are going to be 30 frames in length
sequence_length = 30

actions = np.array(list(existing_label_map.keys()))