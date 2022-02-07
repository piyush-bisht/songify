import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics.pairwise import cosine_similarity

songs = pd.read_csv("data.csv")

vec=songs.iloc[:,1:15]
vec.shape
vec.head()

sim=cosine_similarity(vec)
sim.shape

def find_songId(title):
    song_id=songs[songs.song_title==title]["id"].values[0]
    return song_id
def find_recommendations(title):
    song_id=find_songId(title)
    scores=list(enumerate(sim[song_id]))
    sorted_scores=sorted(scores,key=lambda x:x[1],reverse=True)
    sorted_scores=sorted_scores[1:]
    rec_songs=[]
    for i in sorted_scores:
        indx=i[0]
        rec_songs.append(songs.loc[indx]["song_title"])
    return rec_songs

def recommend_ten(songs_list):
    first_ten=[]
    count=0
    for song in songs_list:
        if count > 9:
            break
        count+=1
        first_ten.append(song)
    return first_ten

lst=find_recommendations("Redbone")
m=recommend_ten(lst)

m
find_songId(m[0])
songs.loc[1]