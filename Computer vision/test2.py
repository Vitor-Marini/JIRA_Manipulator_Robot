import cv2

cap = cv2.VideoCapture(2)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)




while True:
    
    
    _, frame = cap.read()
    height, width, _ = frame.shape


  cx = int(width/2)
  cy = int(height/2)

  #captura o valor do pixel
  pixel_center = frame[cy, cx]
  print(pixel_center)
  cv2.circle(frame, (cx, cy), 5, (255,0,0), 3)

  cv2.imshow("Frame", frame)
  key = cv2.waitKey(1)
  if key == 27:
    break


cap.release()
cv2.destroyAllWindows()