

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
from tqdm import tqdm

import warnings
warnings.filterwarnings("ignore")

songs = pd.read_csv("data.csv")

viz_songs=songs.drop(columns=['id', 'name', 'artists', 'release_date', 'year'])

def normalize_column(col):
    songs[col] = (songs[col] - songs[col].min()) / (songs[col].max() - songs[col].min())    

num_types = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']
num = songs.select_dtypes(include=num_types)

for col in num.columns:
  normalize_column(col)

num_2 = viz_songs.select_dtypes(include=num_types)

for col in num_2.columns:
  normalize_column(col)


#K-Means clustering for genre classification
from sklearn.cluster import KMeans

km = KMeans(n_clusters=12)
cat = km.fit_predict(num)
songs['cat'] = cat
normalize_column('cat')


class SpotifyRecommender():
    def __init__(self, rec_data):
        #our class should understand which data to work with
        self.rec_data_ = rec_data
    
    #if we need to change data
    def change_data(self, rec_data):
        self.rec_data_ = rec_data
    # num_types = ['string']
    # non_num_col=songs.select_dtypes(include=num_types)

    #function which returns recommendations, we can also choose the amount of songs to be recommended
    def get_recommendations(self, song_name, amount=1):
        distances = []
        #choosing the data for our song
        song = self.rec_data_[(self.rec_data_.name.str.lower() == song_name.lower())].head(1).values[0]
        #dropping the data with our song
        res_data = self.rec_data_[self.rec_data_.name.str.lower() != song_name.lower()]
        for r_song in tqdm(res_data.values):
            dist = 0
            for col in np.arange(len(res_data.columns)):
                #indeces of non-numerical columns
                if not col in [3, 8, 14,16]:
                    #calculating the manhettan distances for each numerical feature
                    dist = dist + np.absolute(float(song[col]) - float(r_song[col]))
            distances.append(dist)
        res_data['distance'] = distances
        #sorting our data to be ascending by 'distance' feature
        res_data = res_data.sort_values('distance')
        columns = ['artists', 'name']
        return res_data[columns][:amount]


def getRecommendations(title):
    recommender = SpotifyRecommender(songs)

    return recommender.get_recommendations("My Name Is", 5)
    

