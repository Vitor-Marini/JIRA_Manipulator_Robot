#include <Arduino.h>
#include<ESP32Servo.h>


void home_pos();
void blue_pos();
void pink_pos();
void gripe_collect_default();

int aux=0;
int cont =0;

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

int velocidadeDEFAULT = 15;


void setup() {
servo_base.attach(16);
servo_first_arm.attach(17);
servo_second_arm.attach(18);
servo_gipper_base.attach(19);
servo_wrist.attach(21);
servo_gripper.attach(15);

Serial.begin(115200);

/*servo_gripper.write(0);
servo_base.write(0);
servo_first_arm.write(50);
servo_second_arm.write(0);
servo_wrist.write(0);
servo_gipper_base.write(0);
*/




}

void loop() {

if(cont==0){

servo_gripper.write(0);
servo_base.write(0);
servo_first_arm.write(50);
servo_second_arm.write(0);
servo_wrist.write(0);
servo_gipper_base.write(0);

cont=cont+1;

}





delay(3000);


Serial.println("Começando,dentro do if");

int test = servo_first_arm.read();
int test2 = servo_second_arm.read();
Serial.println("ARM:");
Serial.print(test);
Serial.println("BASE:");
Serial.print(test2);


if(aux==0){



home_pos();


  aux=aux+1;
}







}



//FUNCS TO MOVE SERVO SLOWER, NOT AT "HIGH SPEED"(DISCLAIMER FUCK GIRA)

void servo_slow_move_BASE(int pos_inicial,int pos_final, const int velocidade){
if(pos_inicial<pos_final){
for (int pos = pos_inicial; pos <= pos_final; pos += 1) {
    servo_base.write(pos);
    delay(velocidade); 
  }
}else
  for (int pos = pos_inicial; pos >= pos_final; pos -= 1) {
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



void home_pos(){

int pos_base = servo_base.read();
int pos_gripper = servo_gripper.read();
int pos_gipper_base = servo_gipper_base.read();
int pos_first_arm =servo_first_arm.read();
int pos_second_arm = servo_second_arm.read();
int pos_wrist = servo_wrist.read();



servo_slow_move_BASE(pos_base+1,0,velocidadeDEFAULT);
servo_slow_move_FIRST_ARM(pos_first_arm+1,50,velocidadeDEFAULT);
servo_slow_move_SECOND_ARM(pos_second_arm+1,0,velocidadeDEFAULT);
servo_slow_move_WRIST(pos_wrist+1,0,velocidadeDEFAULT);
servo_slow_move_GRIPPER(pos_gripper+1,0,velocidadeDEFAULT);
servo_slow_move_GRIPPER_BASE(pos_gipper_base+1,0,velocidadeDEFAULT);


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