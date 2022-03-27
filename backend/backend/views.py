from concurrent.futures import process
import os
from django.shortcuts import render
from django.http import HttpResponse
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import pandas as pd
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import numpy as np

from recSystem import getRecommendations
# Fetch the service account key JSON file contents
cred = credentials.Certificate('./secret.json')
# Initialize the app with a service account, granting admin privileges

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        'databaseURL': "https://songify-a8613-default-rtdb.firebaseio.com"
    })

ref = db.reference('/users')
docs=ref.get()
for key,value in docs.items():
    print(value)
    print("/n")
currentUser = ""

#spotipy--
client_credentials_manager = SpotifyClientCredentials(client_id="30f12fba8afd48bba37450e79a1dc1da", client_secret="f6da9786d86c40128214f6ce8368ce2f")
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)


songs = pd.read_csv("data.csv")

# songs=songs.drop(['year','release_date'], axis = 1)
print(songs.columns)
@csrf_exempt
def findRatedItems(df,currUserId):
    df=df.loc[currUserId]
    df=df.index[df==1]
    print("Rated Items number")
    print(df)
    return df
    

def findSimilarUsers(songs,df):
    
    simUsers=pd.DataFrame()
    for song in songs:
        print(song)
        simUsers=simUsers.append(df.loc[df[song]==1])
    print("SHAPE OF SIM USERS: ")
    print(simUsers.shape)
    return simUsers

def find_user_user_Similarity(similarUsers,currUser):

    print("SIMILARITY BETWEEN")
    
    sim_scores=cosine_similarity(currUser,similarUsers)
    # print(similarUsers.index)
    # print(sim_scores.shape)
    df=pd.DataFrame(sim_scores,columns=similarUsers.index)
    df=df.transpose()

    df=df.sort_values(by=df.columns[0],ascending=False)
    print(df)
    return sim_scores

def make_user_user_dataset(request):
    df= pd.read_csv("data.csv")
    user_user=pd.DataFrame(columns=df['name'])
    user_user = user_user.loc[:,~user_user.columns.duplicated()]
    
    for key,value in docs.items():
        user=pd.DataFrame(columns=df['name'])
        user = user.loc[:,~user.columns.duplicated()]
        user.loc[key,:]=0
        
        for song in value['likedSongs']:
            user.loc[key,song]=1    
            user_user = user_user.loc[~user_user.index.duplicated(keep='first')]
            user_user= user_user.append(user)
    
    # user_user=user_user.transpose()
    user_user.fillna(value = 0,inplace = True)
    print(user_user.shape)
    # user_user.to_csv('user_user.csv',header=True, index=True)
    # print("Completed USER USER TABLE")
    ratedSongs=findRatedItems(user_user,"r0B86Bwa6pROwTptgWgKqZMy3uK2")
    similarUsers=findSimilarUsers(ratedSongs,user_user)
    
    # print(user_user.loc[['r0B86Bwa6pROwTptgWgKqZMy3uK2'],:].shape)
    
    
    uSim=find_user_user_Similarity(similarUsers,user_user.loc[['r0B86Bwa6pROwTptgWgKqZMy3uK2'],:])
    return HttpResponse("USER USER DATASET FUNCTION")


def index(request):
    if request.method == "GET":
        print("GET REQ INIT")
        #print(docs)
        return HttpResponse(json.dumps(docs), content_type="application/json")
    elif request.method == "POST":
        val=json.loads(request.body)
        print("POST requested")
        print(val['text'])
        
        return HttpResponse("POST REQ")

def fetchUserSongs(request,slug):
    if request.method == "GET":
        songs=pd.DataFrame({})
        for key,value in docs[slug]['likedSongs'].items():
            songid=value['songId']
            df=getRecommendations(songid)
            print(df)
            songs=songs.append(df,ignore_index = True)

        songs.set_index("name", drop=True, inplace=True)
        ans = df.to_dict(orient="index")
        print(ans)
        return HttpResponse(json.dumps(ans))

@csrf_exempt
def getTrackFeatures(request) :
        if request.method == "GET":
            trackId = request.GET.get('trackId','')
            if((songs['id']==trackId).any()):
                print("TRACK EXISTS")
            else:
                extractFeatures(trackId)
        
        return HttpResponse("Added Song")

def extractFeatures(trackId):
    global songs
    track = sp.audio_features(trackId)
    trackMData=sp.track(trackId)
    print(trackMData)
    trackDf=pd.DataFrame(track)
    trackDf=trackDf.drop(['track_href','analysis_url','uri','type','time_signature'], axis = 1)
    trackDf['name']=trackMData['name']
    trackDf['popularity']=trackMData['popularity']
    trackDf['explicit']=trackMData['explicit']
    trackDf['artists']=trackMData['artists'][0]['name']
    print(trackDf.columns)
    songs=pd.concat([songs,trackDf],ignore_index=True)   
    songs = songs.reset_index(drop=True)
    print(songs.shape)         
    songs.to_csv('data.csv',header=True, index=False)
    