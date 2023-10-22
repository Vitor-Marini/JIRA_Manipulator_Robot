from utils import get_limits
import cv2
# import serial

colors = {
    'red': [0, 0, 255],
    'green': [0, 255, 0],
    'blue': [255, 0, 0],
}


# esp32 = serial.Serial('/dev/ttyUSB0',9600)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    hsvImage = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    for color_name, color in colors.items():
        lowerLimit, upperLimit = get_limits(color=color)

        mask = cv2.inRange(hsvImage, lowerLimit, upperLimit)
    
        # Operações Morfológicas para reduzir o ruído.
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

        contours, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for contour in contours:
            if cv2.contourArea(contour) > 500:
                x, y, w, h = cv2.boundingRect(contour)
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                cv2.putText(frame, color_name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

                """
                OBS: É necessário testar.
                
                Se mais de uma cor for detectada no vídeo, 
                o código desenhará a bounding box  e os textos para cada cor detectada. 
                Porém, o código enviará para a ESP32 apenas um sinal para a última cor detectada na ordem em que foi definido o dicionário de cores.

                colors = {
                'red': [0, 0, 255],
                'green': [0, 255, 0],
                'blue': [255, 0, 0],
                }

                Isso ocontece porque a lógica if-else para comunicar as cores com o ESP32 está localizada dentro do loop onde nós iteramos sobre os contornos. 
                Se forem detectadas múltiplas cores, o sinal da última cor detectada substituirá os sinais anteriores.
                """  
                #if color_name == "blue":
                    #esp32.write(b'1')
                #elif color_name == "green":
                    #esp32.write(b'2')
                #else:
                    #esp32.write(b'3')

    cv2.imshow('frame', frame)

    # Tecla para parar a execução do código
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()

cv2.destroyAllWindows()