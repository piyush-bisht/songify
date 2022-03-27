import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
from tqdm import tqdm
import json

import warnings
warnings.filterwarnings("ignore")

songs = pd.read_csv("tracks_features.csv")

viz_songs=songs.drop(columns=['id', 'album', 'album_id', 'artist_ids', 'name', 'artists', 'track_number', 'disc_number', 'explicit', 'release_date', 'year'])

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

# km = KMeans(n_clusters=12)
# cat = km.fit_predict(num)
# songs['cat'] = cat
# normalize_column('cat')



def check_songId(song_vec, title):
    print("in song_id fun")
    try:
        song_id=songs.loc[songs["id"]=='7lmeHLHBe4nmXzuXc0HDjk']
    except:
        viz_songs.append(song_vec)
    return song_id

def find_songVector(title):
        # song_id=find_songId(title)
        print("hello")
        print(viz_songs.loc[songs['id']==title].shape)
        
        return viz_songs.loc[songs['id']==title]
    #finds reccomendations using a given song title
def get_recommendations(song_vec, songId, limit):
        sim=cosine_similarity(viz_songs,song_vec)
        print("SHAPE ")
        print(sim.shape)
        scores=list(enumerate(sim))
        sorted_scores=sorted(scores,key=lambda x:x[1],reverse=True)  #sorts all the songs in the list in reverse order (decreasing order)
        sorted_scores=sorted_scores[1:]                               #skips the first index as it is the same song with highest similarity
        # print(len(sorted_scores))
        # print(scores)
        rec_songs=[]
        for i in range(0,limit):
            indx=sorted_scores[i][0]
            print(sorted_scores[i])
            rec_songs.append(songs.loc[indx]["id"])       #adds all song title according to the scores found
        return json.dumps(rec_songs) #returns the songs




def getRecommendations(track):
    songDetails = pd.DataFrame(track)
    songId = songDetails['id']
    song_vec = songDetails.drop(columns=['type', 'id', 'uri', 'track_href', 'analysis_url'])
    print(song_vec.columns)
    return get_recommendations(song_vec, songId, 5)
