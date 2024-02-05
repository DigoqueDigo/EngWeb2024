import traceback
from os import listdir
from os.path import isfile, join
from colorama import Fore, Style
import xml.etree.ElementTree as ET


path = 'texto'

try:
    files = [path + '/' + f for f in listdir(path) if isfile(join(path, f))]

except FileNotFoundError:
    print(f'{Fore.RED}{Style.BRIGHT}Invalid folder: {path}{Style.RESET_ALL}')

except Exception:
    traceback.print_exc()


indexList = list()

for file in files:

    tree = ET.parse(file)
    root = tree.getroot()
    numbers = root.findall('.//número')
    names = root.findall('.//nome')

    if len(names) > 0 and len(numbers) > 0:
        indexList.append((int(numbers[0].text),names[0].text))
    

indexList = sorted(indexList, key = lambda x : x[0])


with open('html/.base.html') as baseFile:
    indexFileContent = baseFile.read()


indexFileContent = indexFileContent.replace('?????', 'Página Inicial', 1)
indexFileContent = indexFileContent.replace('?????', 'Índice das Ruas', 1)

bodyContent = '<ul class="pagination">'

for item in indexList:
    bodyContent += f'<li><a href="https://www.google.com/">{item[1]}</a></li>'

bodyContent += '</ul>'
indexFileContent = indexFileContent.replace('?????', bodyContent)

with open('html/index.html', 'w') as indexFile:
    indexFile.write(indexFileContent)