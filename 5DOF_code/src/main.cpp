#include <Arduino.h>

int  led_verde=12;
int led_vermelho=25;
int led_azul=13;

int valor;

void home_position();

void setup() {
pinMode(led_azul,OUTPUT);
pinMode(led_vermelho,OUTPUT);
pinMode(led_verde,OUTPUT);
digitalWrite(led_vermelho,LOW);
digitalWrite(led_azul,LOW);
digitalWrite(led_verde,LOW);

Serial.begin(9600);

}

void loop() {
  if(Serial.available()>0){
    valor=Serial.read();
  }


}




void home_position(int led){
  digitalWrite(led,LOW);
}