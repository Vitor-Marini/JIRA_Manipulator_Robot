#include <Arduino.h>
#include<ESP32Servo.h>

TaskHandle_t Task1;
TaskHandle_t Task2;

//FREE RTOS

void taskEsp(void * pvParameters);
void taskReset(void * pvParameters);


char data_received;//recebe a cor do OpenCV
int button_reset = 22;
int speedDEFAULT = 15;
int speedBASE = 5;
int grippeCLOSE = 10;
int gripperOPEN = 60;

//FUNCTION TO CLEAR THE LIST IN SERIAL PORT
void clear_serial();

//SL0W MOVING FUNCS
void servo_slow_move_BASE(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_GRIPPER(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_GRIPPER_BASE(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_FIRST_ARM(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_SECOND_ARM(int pos_inicial,int pos_final, const int speed);
void servo_slow_move_WRIST(int pos_inicial,int pos_final, const int speed);



//POSITION PRESETS
void home_pos();
void home_pos2();
void gripper_collect_default();
void blue_pos();
void green_pos();
void red_pos();


//SERVOS DECLARATION
Servo servo_base;
Servo servo_second_arm;
Servo servo_first_arm;
Servo servo_gipper_base;
Servo servo_wrist;
Servo servo_gripper;




void setup() {



//set Button
pinMode(button_reset, INPUT_PULLUP);
//SERVO ATTACHS
servo_gripper.attach(15);
servo_gipper_base.attach(16);
servo_first_arm.attach(17);
servo_second_arm.attach(18);
servo_base.attach(19);
servo_wrist.attach(21);


Serial.begin(9600);

xTaskCreatePinnedToCore(taskEsp, "Task1", 10000, NULL, 0, &Task1, 0);
xTaskCreatePinnedToCore(taskReset, "Task2", 10000, NULL, 1, &Task2, 1);






}

void loop() {



}



//ALL TASKS


void taskEsp(void * pvParameters){
  for(;;){

  int count_start = 1;
  //START ALL SERVOS AT DEFAULT POSITION,JUST TO ".read" FUNCTION WORK CORRECTLY. EX: READ FUNCTION ONLY WORKS CORRECTLY IF YOU ALRREDY WRITE A MOVMENT TO A SERVO, LIKE IF YOU DONT START THE SERVO IT WILL READ A HUGE NUMBER(microseconds)Disclaimer initializin on setuo seens not work
  if(count_start==1){
  servo_gripper.write(grippeCLOSE);
  servo_base.write(90);
  servo_first_arm.write(100);
  servo_second_arm.write(60);
  servo_wrist.write(90);
  servo_gipper_base.write(100);

  }


  if(Serial.available()>0){ 
    data_received= Serial.read();
  }


  if(data_received=='1'){
    blue_pos();
    while (Serial.available() > 0) {
          Serial.read(); 
        }
        data_received = 0; 

  
  } else if(data_received=='2'){
      green_pos();
      while (Serial.available() > 0) {
              Serial.read(); 
            }
            data_received = 0; 
    } else if(data_received=='3'){
      red_pos();
      while (Serial.available() > 0) {
        Serial.read(); 
      }
      data_received = 0; 
    }
  }
}


void taskReset(void * pvParameters){
  for(;;){
    if(digitalRead(button_reset)==LOW){
      Serial.println("DENTRO DO RESET");
      ESP.restart();
    }
  }
}








//TEST FUNC

void clear_serial(){
while (Serial.available() > 0) {
        Serial.read(); 
      }
      data_received = 0; 

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
servo_slow_move_FIRST_ARM(pos_first_arm+1,100,speedDEFAULT);//50 IS BECAUSE ON THE REAL ARM(PHISICAL) SERVO IS SIDEWAY SO 50 KEEP ARM VERTICAL
servo_slow_move_SECOND_ARM(pos_second_arm+1,60,speedDEFAULT);
servo_slow_move_WRIST(pos_wrist+1,90,speedDEFAULT);
servo_slow_move_GRIPPER(pos_gripper+1,grippeCLOSE,speedDEFAULT);
servo_slow_move_GRIPPER_BASE(pos_gipper_base+1,90,speedDEFAULT);

}

void home_pos2(){
servo_slow_move_BASE(servo_base.read()+1,90,speedBASE);
servo_slow_move_FIRST_ARM(servo_first_arm.read()+1,30,speedDEFAULT);
servo_slow_move_SECOND_ARM(servo_second_arm.read()+1,170,speedDEFAULT);
servo_slow_move_WRIST(servo_wrist.read()+1,120,speedDEFAULT);
servo_slow_move_GRIPPER_BASE(servo_gripper.read()+1,120,speedDEFAULT);
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);

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


void blue_pos(){
delay(1000);
gripper_collect_default();
delay(1000);
servo_slow_move_BASE(servo_base.read()+1,0,speedBASE);
delay(300);
servo_slow_move_FIRST_ARM(servo_first_arm.read()+1,130,speedDEFAULT);
servo_slow_move_WRIST(servo_wrist.read()+1,90,speedDEFAULT);
delay(500);
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);
delay(2000);
 home_pos();
}


void green_pos(){
delay(1000);
gripper_collect_default();
delay(1000);
servo_slow_move_BASE(servo_base.read()+1,20,speedBASE);
delay(500);
servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);
delay(2000);
 home_pos();
}


void red_pos(){
  delay(1000);
  gripper_collect_default();
  delay(1000);
  servo_slow_move_BASE(servo_base.read()+1,45,speedBASE);
  servo_slow_move_SECOND_ARM(servo_second_arm.read()+1,110,speedDEFAULT);
  servo_slow_move_FIRST_ARM(servo_first_arm.read()+1,50,speedDEFAULT);
  delay(500);
  servo_slow_move_GRIPPER(servo_gripper.read()+1,gripperOPEN,speedDEFAULT);
  delay(2000);
  home_pos();
}



