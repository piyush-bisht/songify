from django.shortcuts import render
from django.http import HttpResponse
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import pandas as pd

from recSystem import getRecommendations
config ={
    "apiKey": "AIzaSyDDbmo5GRLP3H8TTJcFiTUCHkgTDH9qHMI",
    "authDomain": "songify-9e677.firebaseapp.com",
    "databaseURL": "https://songify-9e677-default-rtdb.firebaseio.com",
    "projectId": "songify-9e677",
    "storageBucket": "songify-9e677.appspot.com",
    "messagingSenderId": "1046063845211",
    "appId": "1:1046063845211:web:2360ca2e9f63ec3ffbd47e",
    "measurementId": "G-S0YYR7F2WZ"
}
# Fetch the service account key JSON file contents
cred = credentials.Certificate('./secret.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://songify-9e677-default-rtdb.firebaseio.com"
})
ref = db.reference('/users')
docs=ref.get()
for key,value in docs.items():
    print(key)
    # print(value['likedSongs'])
    print("/n")

@csrf_exempt
def index(request):
    if request.method == "GET":
        print("GET REQ INIT")
        # ans=[]
        
        return HttpResponse(docs)
    elif request.method == "POST":
        val=json.loads(request.body)
        print("POST requested")
        print(val['text'])
        
        return HttpResponse("POST REQ")

def fetchUserSongs(request,slug):
    if request.method == "GET":
        songs=[]
        for key,value in docs[slug]['likedSongs'].items():
            songTitle=value['songTitle']
            print(songTitle)
            songs.append(getRecommendations(songTitle).values.tolist())

        print(songs)
        return HttpResponse(songs)
        