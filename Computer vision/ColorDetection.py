from utils import get_limits
import cv2
import serial
from threading import Thread

class VideoSteam:
    def __init__(self,src=0):
        self.stream = cv2.VideoCapture(src)
        self.ret, self.frame = self.stream.read()
        self.thread = Thread(target=self.update,args=())
        self.thread.daemon = True
        self.thread.start()
    def update(self):
        while True:
            self.ret, self.frame = self.stream.read()
    
    def read(self):
        return self.frame
    

colors = {
    'red': [0, 0, 128],
    'green': [0, 255, 0],
    'blue': [184, 123, 0],
}


esp32 = serial.Serial('/dev/ttyUSB0',9600)

cap = cv2.VideoCapture(3)



while True:
    ret, frame = cap.read()
    frame_height, frame_width = frame.shape[:2]
    if frame is not None:
        frame = cv2.resize(frame,(1280,720))
    else:
        print("Erro no resize")
    roi_size = 200
    roi_top = int(frame_height - roi_size / 2) 
    roi_bottom = int(frame_height + roi_size / 2)
    roi_left = int(frame_width - roi_size / 2)
    roi_right = int(frame_width + roi_size / 2)
    
    hsvImage = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    for color_name, color in colors.items():
        lowerLimit, upperLimit = get_limits(color=color)

        mask = cv2.inRange(hsvImage, lowerLimit, upperLimit)
    
        # Operações Morfológicas para reduzir o ruído.
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

        contours, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        cv2.rectangle(frame, (roi_left, roi_top), (roi_right, roi_bottom), (0,223 ,255 ), 2)
        cv2.putText(frame, "Area Detection", (roi_left - 12, roi_top-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,223,255), 2)

        for contour in contours:
            # Caso o algoritmo não detecte os bloquinhos alterar para:
            # Para detectar objetos menores podemos usar o if abaixo substituindo o existente (testar pra ver se o threshold de 100 detecta o bloquinho)
             if cv2.contourArea(contour) > 500:

            #if cv2.contourArea(contour) > 500:
                x, y, w, h = cv2.boundingRect(contour)
                center_x = x + w / 2
                center_y = y + h / 2 
                # Verifica o centro
                if roi_left < center_x < roi_right and roi_top < center_y < roi_bottom:
                    cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                    cv2.putText(frame, color_name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

                    if color_name == "blue":
                        esp32.write(b'1')
                    elif color_name == "green":
                         esp32.write(b'2')
                    else:
                        esp32.write(b'3')
    # Desenha a região de intersse (ROI)
                

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
              #  if color_name == "blue":
                #    esp32.write(b'1')
              #  elif color_name == "green":
               #     esp32.write(b'2')
             #   else:
                #    esp32.write(b'3')

    cv2.imshow('frame', frame)

    # Tecla para parar a execução do código
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()

cv2.destroyAllWindows()