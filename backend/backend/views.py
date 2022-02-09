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
    print("/n")

@csrf_exempt
def index(request):
    if request.method == "GET":
        print("GET REQ INIT")
        
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
        