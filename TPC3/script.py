from sys import stdin


def getBuffer():

    buffer = list()
    buffer.append('{ "filmes": [')

    for line in stdin:
        buffer.append(line.strip('\n'))

    buffer.append(']}')
    return buffer


def printBuffer(buffer):

    print(buffer[0])

    for index in range(1,len(buffer)-2):
        print(buffer[index] + ',')

    print(buffer[-2])
    print(buffer[-1])


if __name__ == '__main__':

    printBuffer(getBuffer())