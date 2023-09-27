#include <Arduino.h>
#include<ESP32Servo.h>




int cont_start = 0;
int velocidadeDEFAULT = 15;


//SL0W MOVING FUNCS
void servo_slow_move_BASE(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int velocidade);
void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int velocidade);

//POSITION PRESETS
void home_pos();
void blue_pos();//WIP
void pink_pos();//WIP
void gripper_collect_default();//WIP

//SERVOS DECLARATION
Servo servo_base;
Servo servo_second_arm;
Servo servo_first_arm;
Servo servo_gipper_base;
Servo servo_wrist;
Servo servo_gripper;




void setup() {

//SERVO ATTACHS
servo_base.attach(16);
servo_first_arm.attach(17);
servo_second_arm.attach(18);
servo_gipper_base.attach(19);
servo_wrist.attach(21);
servo_gripper.attach(15);

//Serial.begin(115200);


}

void loop() {

//START ALL SERVOS AT DEFAULT POSITION,JUST TO ".read" FUNCTION WORK CORRECTLY. EX: READ FUNCTION ONLY WORKS CORRECTLY IF YOU ALRREDY WRITE A MOVMENT TO A SERVO, LIKE IF YOU DONT START THE SERVO IT WILL READ A HUGE NUMBER(microseconds)
if(cont_start==0){

servo_gripper.write(0);
servo_base.write(0);
servo_first_arm.write(50);
servo_second_arm.write(0);
servo_wrist.write(0);
servo_gipper_base.write(0);

cont_start=cont_start+1;

}

//"VOID LOOP"














}



//FUNCS TO MOVE SERVO SLOWER, NOT AT "HIGH SPEED"(DISCLAIMER FUCK GIRA)... RECIVES THE ACTUAL POSITION , END POSITION AND SPEED OF SERVO MOVMENT

void servo_slow_move_BASE(int pos_inicial,int pos_final, const int velocidade){
 
if(pos_inicial<pos_final){ //VERIFY IF IS TO SERVO GO "FORWARDS" OR "BACKWARDS"
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {//DO 0 -> 180
    servo_base.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {//DO 180 -> 0
    servo_base.write(pos);
    delay(velocidade); 
  }
}

void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int velocidade){
if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_gripper.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_gripper.write(pos);
    delay(velocidade); 
  }
}

void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int velocidade){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_gipper_base.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_gipper_base.write(pos);
    delay(velocidade); 
  }
}

void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int velocidade){
if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_first_arm.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_first_arm.write(pos);
    delay(velocidade); 
  }
}

void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int velocidade){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_second_arm.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_second_arm.write(pos);
    delay(velocidade); 
  }
}

void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int velocidade){
  if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_wrist.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
    servo_wrist.write(pos);
    delay(velocidade); 
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
servo_slow_move_BASE(pos_base+1,0,velocidadeDEFAULT);
servo_slow_move_FIRST_ARM(pos_first_arm+1,50,velocidadeDEFAULT);//50 IS BECAUSE ON THE REAL ARM(PHISICAL) SERVO IS SIDEWAY SO 50 KEEP ARM VERTICAL :)
servo_slow_move_SECOND_ARM(pos_second_arm+1,0,velocidadeDEFAULT);
servo_slow_move_WRIST(pos_wrist+1,0,velocidadeDEFAULT);
servo_slow_move_GRIPPER(pos_gripper+1,0,velocidadeDEFAULT);
servo_slow_move_GRIPPER_BASE(pos_gipper_base+1,0,velocidadeDEFAULT);

}



void blue_pos(){
gripper_collect_default();

//MOVMENTS

 home_pos();
}



void pink_pos(){
gripper_collect_default();

//MOVMENTS

home_pos();
}



void gripper_collect_default(){

//MOVMENTS

}






/*if(int pos_base = servo_base.read()>180){
  pos_base=0;
}else{
   pos_base = servo_base.read();
}


if(int pos_gripper = servo_gripper.read()>180){
  pos_gripper=0;
}else{
  pos_gripper = servo_gripper.read();
}

if(int pos_gipper_base = servo_gipper_base.read()>180){
  pos_gipper_base = 0;
}else{
  pos_gipper_base = servo_gipper_base.read();
}

if(int pos_first_arm =servo_first_arm.read()>180){
  pos_first_arm=50;
}else{
  pos_first_arm =servo_first_arm.read();
}

if(int pos_second_arm = servo_second_arm.read()>180){
  pos_second_arm=0;
}else{
   pos_second_arm = servo_second_arm.read();
}

if(int pos_wrist = servo_wrist.read()>180){
  pos_wrist=0;
}else{
   pos_wrist = servo_wrist.read();
}

*/