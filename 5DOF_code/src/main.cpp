#include <Arduino.h>
#include<ESP32Servo.h>


Servo myservo;

void setup() {
myservo.attach(16);

}

void loop() {
myservo.write(180);
delay(500);
myservo.write(0);
delay(500);
myservo.write(90);
delay(500);

}





















/*void home_position(int led){
  digitalWrite(led,LOW);
} */
