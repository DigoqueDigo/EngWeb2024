import traceback
from sys import exit
from os import mkdir, listdir
from os.path import isfile, join
from colorama import Fore, Style
import xml.etree.ElementTree as ET


def get_text_content(element):

    text_content = element.text or ''

    for child in element:

        text_content += get_text_content(child)

        if (isinstance(child.tail,str)):
            text_content += child.tail

    return text_content


path = 'texto'

try:
    files = [path + '/' + f for f in listdir(path) if isfile(join(path, f))]
    mkdir('html/pages')

except FileExistsError:
    pass

except FileNotFoundError:
    print(f'{Fore.RED}{Style.BRIGHT}Invalid folder: {path}{Style.RESET_ALL}')
    exit(1)

except Exception:
    traceback.print_exc()
    exit(1)


with open('html/.base.html') as baseFile:
    baseContent = baseFile.read()


for file in files:

    tree = ET.parse(file)
    root = tree.getroot()

    name = tree.find('.//meta/nome')
    number = tree.find('.//meta/número')
    figures = tree.findall('.//corpo/figura')

    pageContent = baseContent.replace('Title', f'{number.text.strip()} - {name.text.strip()}', 1)
    pageContent = pageContent.replace('PageTitle', name.text.strip(), 1)
    pageContent = pageContent.replace('CSSLink', '<link rel="stylesheet" href="../css/page.css">')

    bodyContent = ''

    ## collect description
    for xmlLine in tree.findall('.//corpo/para'):
        bodyContent += f'<p>{get_text_content(xmlLine)}</p>'

    
    ## collect images and substitles
    for figure in figures:

        imageElement = figure.find('imagem')
        subElement = figure.find('legenda')

        if imageElement is not None and subElement is not None:
            bodyContent += '<div class="container">'
            bodyContent += f'<img src="{imageElement.get("path")}">'
            bodyContent += f' <div class="bottom-left">{subElement.text}</div>'
            bodyContent += '</div>'

    
    ## collect house list
    


    bodyContent += '</div>'
    bodyContent += '<button class="button button1"><a href="../index.html">Voltar<a></button>'
    pageContent = pageContent.replace('BodyContent', bodyContent)

    with open(f'html/pages/{name.text.strip()}.html', 'w') as pageFile:
        pageFile.write(pageContent)