import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity

SONGS = pd.read_csv("data.csv")

songs=SONGS.drop(columns=['id', 'name', 'artists', 'release_date', 'year'])
songs.head()

# #EDA
# plt.subplots(figsize=(12, 8))
# sns.heatmap(songs.corr(), annot=True, square=True)
# plt.show()  

def normalize_column(col):
    songs[col] = (songs[col] - songs[col].min()) / (songs[col].max() - songs[col].min())    

for col in songs.columns:
  normalize_column(col)
songs.head()

num_types = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']
num = songs.select_dtypes(include=num_types)

#K-Means clustering for genre classification
from sklearn.cluster import KMeans

km = KMeans(n_clusters=10)
cat = km.fit_predict(num)
songs['cat'] = cat
normalize_column('cat')


vec=songs.copy()
vec.shape
vec.head()

sim=cosine_similarity(vec)
sim.shape

#finds song ID i.e index of song in the csv
def find_songId(title):
    song_id=SONGS.loc[SONGS["name"]=="My Name Is"].index[0]
    return song_id

#finds reccomendations using a given song title
def find_recommendations(title):
    song_id=find_songId(title)
    scores=list(enumerate(sim[song_id]))
    sorted_scores=sorted(scores,key=lambda x:x[1],reverse=True)  #sorts all the songs in the list in reverse order (decreasing order)
    sorted_scores=sorted_scores[1:]                               #skips the first index as it is the same song with highest similarity
    # print(len(sorted_scores))
    # print(scores)
    rec_songs=[]
    for i in sorted_scores:
        indx=i[0]
        rec_songs.append(SONGS.loc[indx]["song_title"]+" by "+SONGS.loc[indx]["artist"])       #adds all song title according to the scores found
    return rec_songs                                          # returns the songs

def recommend_ten(songs_list):
    first_ten=[]
    count=0
    for song in songs_list:
        if count > 9:
            break
        count+=1
        first_ten.append(song)
    return first_ten


title="The Night We Met"
lst=find_recommendations(title)     #example taken
m=recommend_ten(lst)
song_id=find_songId(title)
print("Your Reccomendations for "+title+" by "+SONGS.loc[song_id]["artist"]+" : ")
m