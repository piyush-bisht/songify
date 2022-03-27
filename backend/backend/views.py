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
    print(key)
    print("/n")
currentUser = ""

#spotipy--
client_credentials_manager = SpotifyClientCredentials(client_id="30f12fba8afd48bba37450e79a1dc1da", client_secret="f6da9786d86c40128214f6ce8368ce2f")
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)


@csrf_exempt
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
        for key,value in docs[slug]:
            songTitle=value['songTitle']
            df=getRecommendations(songTitle)
            print(df)
            songs=songs.append(df,ignore_index = True)

        
        songs.set_index("name", drop=True, inplace=True)
        ans = df.to_dict(orient="index")
        print(ans)
        return HttpResponse(slug)

@csrf_exempt
def getTrackFeatures(request) :
        if request.method == "GET":
            
            
            trackId = request.GET.get('trackId','')
            track = sp.audio_features(trackId)
                
            return HttpResponse(getRecommendations(track))