import json

with open('pessoas.json','w') as outFile:
    print('[', file=outFile)
    with open('datasets/dataset.json','r',encoding='utf8') as dataset:
        datasetContent = json.load(dataset)
        for person in datasetContent['pessoas']:
            print(json.dumps(person,ensure_ascii=False), ',', file=outFile)
    print(']',file=outFile)