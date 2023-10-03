#include <Arduino.h>
#include<ESP32Servo.h>

int control =0;
char data_recived;
int aux=0;
int cont_start = 0;
int speedDEFAULT = 15;
int speedBASE = 5;
int grippeCLOSE = 0;
int gripperOPEN = 160;
//SL0W MOVING FUNCS
void servo_slow_move_BASE(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int speed);

void gripper_CLAMP()
void gripper_RELEASE()

//POSITION PRESETS
void home_pos();
void gripper_collect_default();//WIP
void blue_pos();//WIP
void pink_pos();//WIP


//SERVOS DECLARATION
Servo servo_base;
Servo servo_second_arm;
Servo servo_first_arm;
Servo servo_gipper_base;
Servo servo_wrist;
Servo servo_gripper;




void setup() {

//SERVO ATTACHS
servo_gripper.attach(15);
servo_gipper_base.attach(16);
servo_first_arm.attach(17);
servo_second_arm.attach(18);
servo_base.attach(19);
servo_wrist.attach(21);


Serial.begin(9600);

}


void loop() {


//START ALL SERVOS AT DEFAULT POSITION,JUST TO ".read" FUNCTION WORK CORRECTLY. EX: READ FUNCTION ONLY WORKS CORRECTLY IF YOU ALRREDY WRITE A MOVMENT TO A SERVO, LIKE IF YOU DONT START THE SERVO IT WILL READ A HUGE NUMBER(microseconds)
if(cont_start==0){
servo_gripper.write(grippeCLOSE);
servo_base.write(90);
servo_first_arm.write(100);
servo_second_arm.write(60);
servo_wrist.write(90);
servo_gipper_base.write(100);

cont_start=1;
}

//"VOID LOOP"

if(Serial.available()>0){ 
  data_recived= Serial.read();
}



if(data_recived=='1'){
  blue_pos();
  while (Serial.available() > 0) {
        Serial.read(); // Limpa quaisquer caracteres adicionais na fila
      }
      data_recived = 0; // Redefina a variável após a execução

}else if(data_recived=='2'){
 pink_pos();
 while (Serial.available()>0){
  Serial.read();
 }
 data_recived=0;
 
}






}



//FUNCS TO MOVE SERVO SLOWER, NOT AT "HIGH SPEED"(DISCLAIMER FUCK GIRA)... RECIVES THE ACTUAL POSITION , END POSITION AND SPEED OF SERVO MOVMENT

void servo_slow_move_BASE(int pos_inicial,int pos_final, const int speed){
 
if(pos_inicial<pos_final){ //VERIFY IF IS TO SERVO GO "FORWARDS" OR "BACKWARDS"
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {//DO 0 -> 180
    servo_base.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {//DO 180 -> 0
    servo_base.write(pos);
    delay(speed); 
  }
}

void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int speed){
if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_gripper.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_gripper.write(pos);
    delay(speed); 
  }
}

void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int speed){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_gipper_base.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_gipper_base.write(pos);
    delay(speed); 
  }
}

void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int speed){
if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_first_arm.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_first_arm.write(pos);
    delay(speed); 
  }
}

void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int speed){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_second_arm.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_second_arm.write(pos);
    delay(speed); 
  }
}

void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int speed){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_wrist.write(pos);
    delay(speed); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_wrist.write(pos);
    delay(speed); 
  }
}



//LEADS ARM TO "HOME"/DEFAULT POSITION
void home_pos(){

//SAVE POSITION OF ALL SERVOS
int pos_base = servo_base.read();
int pos_gripper = servo_gripper.read();
int pos_gipper_base = servo_gipper_base.read();
int pos_first_arm =servo_first_arm.read();
int pos_second_arm = servo_second_arm.read();
int pos_wrist = servo_wrist.read();


//SEQUECE OF MOVMENTES TO DEFAULT POSITON, "+1" IS USED TO FIX THE READS, EX: READING A SERVO AT 0 DEGRESS IS "-1", SO YOU ADD 1 "EXTRA DEGREE" TO FIX IT AND NOT BUG THE CODE
servo_slow_move_BASE(pos_base+1,90,speedBASE);
servo_slow_move_FIRST_ARM(pos_first_arm+1,100,speedDEFAULT);//50 IS BECAUSE ON THE REAL ARM(PHISICAL) SERVO IS SIDEWAY SO 50 KEEP ARM VERTICAL :)
servo_slow_move_SECOND_ARM(pos_second_arm+1,60,speedDEFAULT);
servo_slow_move_WRIST(pos_wrist+1,90,speedDEFAULT);
servo_slow_move_GRIPPER(pos_gripper+1,grippeCLOSE,speedDEFAULT);
servo_slow_move_GRIPPER_BASE(pos_gipper_base+1,90,speedDEFAULT);

}



void gripper_collect_default(){
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);

servo_slow_move_FIRST_ARM(servo_first_arm.read()+1,65,speedDEFAULT);

servo_slow_move_SECOND_ARM(servo_second_arm.read()+1,150,speedDEFAULT);

servo_slow_move_GRIPPER_BASE(servo_gipper_base.read()+1,35,speedDEFAULT);

servo_slow_move_GRIPPER(servo_gripper.read()+1,grippeCLOSE,speedDEFAULT);
delay(1000);
servo_slow_move_FIRST_ARM(servo_first_arm.read()+1,100,speedDEFAULT);
delay(2000);

servo_slow_move_GRIPPER_BASE(servo_gipper_base.read()+1,100,speedDEFAULT);

}



void gripper_CLAMP(){
servo_slow_move_GRIPPER(servo_gripper))

}



]


void gripper_RELEASE()[



]



void blue_pos(){
gripper_collect_default();
delay(1000);
servo_slow_move_BASE(servo_base.read()+1,0,speedBASE);
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);
delay(2000);
 home_pos();
}



void pink_pos(){
gripper_collect_default();
delay(1000);
servo_slow_move_BASE(servo_base.read()+1,180,speedBASE);
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);
delay(2000);
 home_pos();
}






