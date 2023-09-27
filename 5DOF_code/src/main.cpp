#include <Arduino.h>
#include<ESP32Servo.h>


void home_pos();
void blue_pos();
void pink_pos();
void gripe_collect_default();


void servo_slow_move_BASE(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int velocidade);

Servo servo_base;
Servo servo_second_arm;
Servo servo_first_arm;
Servo servo_gipper_base;
Servo servo_wrist;
Servo servo_gripper;


void setup() {
servo_base.attach(16);
servo_first_arm.attach(17);
servo_second_arm.attach(18);
servo_gipper_base.attach(19);
servo_wrist.attach(21);
servo_gripper.attach(15);



/*
servo_gripper.write(0);
servo_base.write(0);
servo_first_arm.write(50);
servo_second_arm.write(0);
servo_wrist.write(0);
servo_gipper_base.write(0);
*/




}

void loop() {





servo_slow_move_BASE(0,90,15);












}





void servo_slow_move_BASE(int pos_inicial,int pos_final, const int velocidade){

  for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_base.write(pos);
    delay(velocidade); 
  }



}


void home_pos(){
servo_gripper.write(0);
servo_base.write(0);
servo_first_arm.write(50);
servo_second_arm.write(0);
servo_wrist.write(0);
servo_gipper_base.write(0);
}



void blue_pos(){
void gripe_collect_default();



void home_pos();
}

////////////////////////////////////////////////

void pink_pos(){
void gripe_collect_default();



void home_pos();
}

///////////////////////////////////////////////

void gripe_collect_default(){



}

