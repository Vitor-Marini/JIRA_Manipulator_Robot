import cv2
import serial
import numpy as np






cap = cv2.VideoCapture(2)
corChange = ''
corFinal = ''

while True:
    _,img = cap.read()
    h,w,_ = img.shape
    offset = 100
    campo = img[offset:h-offset,offset:w-offset]
    cv2.rectangle(img,(offset,offset),(w-offset,h-offset),(255,0,0),3)

    corMediaLinha = np.average(campo,axis=0)
    corMedia = np.average(corMediaLinha,axis=0)
    r,g,b = int(corMedia[2]),int(corMedia[1]),int(corMedia[0])
    cor = [r,g,b]
    print(cor)
    if r >=140 and g>=140 and b <=60:
        corFinal = 'Amarelo'
       
    elif np.argmax(cor) ==0:
     
        corFinal = 'Vermelho'
    elif np.argmax(cor) ==1:
      
        corFinal = 'Verde'
    elif np.argmax(cor) ==2:
        corFinal = 'Azul'
    
 

    corChange = corFinal
    print(corFinal)

    cv2.imshow('Img',img)
    #cv2.imshow('campo', campo)
    cv2.waitKey(1)