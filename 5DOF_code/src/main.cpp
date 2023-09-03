#include <Arduino.h>

int  led_verde=12;
int led_vermelho=25;
int led_azul=13;

int valor;

//void home_position(int);

void setup() {
pinMode(led_azul,OUTPUT);
pinMode(led_vermelho,OUTPUT);
pinMode(led_verde,OUTPUT);
Serial.begin(9600);
}

void loop() {
  if(Serial.available()>0){
    valor=Serial.read();
  }


if(valor=='1'){
  int valorfinal =valor;
  digitalWrite(led_azul,HIGH);
  //delay(20000);
 // home_position(led_azul);
}
if(valor=='2'){
  digitalWrite(led_verde,HIGH);
  //delay(5000);
  //home_position(led_verde);
}
if(valor=='3'){
  digitalWrite(led_vermelho,HIGH);
  //delay(5000);
  //home_position(led_vermelho);
}



}

/*void home_position(int led){
  digitalWrite(led,LOW);
} */
