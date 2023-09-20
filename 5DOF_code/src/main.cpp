#include <Arduino.h>
#include<ESP32Servo.h>





Servo myservo;
Servo myservo2;
Servo myservo3;
Servo myservo4;
Servo myservo5;
Servo myservo6;



void setup() {
myservo.attach(16);
myservo2.attach(17);
myservo3.attach(18);
myservo4.attach(19);
myservo5.attach(21);
myservo6.attach(15);

/*
myservo.write(0);
myservo2.write(0);
myservo3.write(0);
myservo4.write(0);
myservo5.write(0);
*/
myservo5.write(0);
myservo6.write(0);
}

void loop() {

delay(3000);
myservo6.write(120);
delay(3000);
myservo6.write(0);
delay(3000);
myservo5.write(120);
delay(3000);
myservo5.write(0);
delay(1000);
}






