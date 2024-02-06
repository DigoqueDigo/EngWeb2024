import traceback
from sys import exit
from os import listdir
from os.path import isfile, join
from colorama import Fore, Style
import xml.etree.ElementTree as ET


path = 'texto'

try:
    files = [path + '/' + f for f in listdir(path) if isfile(join(path, f))]

except FileNotFoundError:
    print(f'{Fore.RED}{Style.BRIGHT}Invalid folder: {path}{Style.RESET_ALL}')
    exit(1)

except Exception:
    traceback.print_exc()
    exit(1)


indexList = list()

for file in files:

    tree = ET.parse(file)
    root = tree.getroot()
    numbers = root.findall('.//número')
    names = root.findall('.//nome')

    if len(names) > 0 and len(numbers) > 0:
        indexList.append((int(numbers[0].text.strip()),names[0].text.strip()))


indexList = sorted(indexList, key = lambda x : x[0])


with open('html/.base.html') as baseFile:
    indexFileContent = baseFile.read()


indexFileContent = indexFileContent.replace('Title', 'Página Inicial', 1)
indexFileContent = indexFileContent.replace('PageTitle', 'Índice das Ruas', 1)
indexFileContent = indexFileContent.replace('CSSLink', '<link rel="stylesheet" href="css/index.css">')

bodyContent = '<ul class="pagination">'

for item in indexList:
    bodyContent += f'<li><a href="pages/{item[1]}.html">{item[1]}</a></li>'

bodyContent += '</ul>'
indexFileContent = indexFileContent.replace('BodyContent', bodyContent)

with open('html/index.html', 'w') as indexFile:
    indexFile.write(indexFileContent)