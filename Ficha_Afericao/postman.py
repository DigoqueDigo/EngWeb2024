import json
import requests

url = 'http://localhost:5188/pessoas'
files = [
    'datasets/dataset-extra1.json',
    'datasets/dataset-extra2.json',
    'datasets/dataset-extra3.json']

for file in files:
    with open(file,'r',encoding='utf8') as dataset:
        datasetContent = json.load(dataset)
        for person in datasetContent['pessoas']:
            requests.post(url,json=person)
