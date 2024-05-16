#include <Arduino.h>
#include<ESP32Servo.h>
#include<ESPAsyncWebServer.h>
#include<mutex>

const char *ssid = "JIRA_app";
const char *password = "senhaforte";

std::mutex mtx;

//Variables
int button_reset=22;
int default_speed=15;
int base_speed=5;
int gripper_CLOSE=10;
int gripper_OPEN=60;

char serial_in;
int pos_in=0;

//Manual slider control variables
String servoId;
int position;
bool manual=false;

//free RTOS
TaskHandle_t Task_ColorMode;
TaskHandle_t Task_Reset; 
TaskHandle_t Task_Pos; 
TaskHandle_t Task_Manual;

//Funciton declaration
void task_colormode(void*pvParameters);
void task_reset(void*pvParameters); 
void task_pos(void*pvParameters); 
void task_manual(void*pvParameters); 


void clear_serial();//Clean anything on serial queue

//JIRA control functions
void move_BASE(int initialPos,int finalPos,const int speed);
void move_FIRST_ARM(int initialPos,int finalPos,const int speed);
void move_SECOND_ARM(int initialPos,int finalPos,const int speed);
void move_WRIST(int initialPos,int finalPos,const int speed);
void move_GRIPPER_BASE(int initialPos,int finalPos,const int speed);
void move_GRIPPER(int initialPos,int finalPos,const int speed);

//Conveyor belt control functions



//POSITION PRESETS
void home_pos();
void collect_pos();
void blue_pos();
void green_pos();
void red_pos();

//Servo Declaration
Servo servo_BASE;
Servo servo_FIRST_ARM;
Servo servo_SECOND_ARM;
Servo servo_WRIST;
Servo servo_GRIPPER_BASE;
Servo servo_GRIPPER;



int count_start = 1;

AsyncWebServer server(80);


void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");
}



void setup(){



pinMode(button_reset, INPUT_PULLUP); 

servo_GRIPPER.attach(15);
servo_GRIPPER_BASE.attach(16);
servo_FIRST_ARM.attach(17);
servo_SECOND_ARM.attach(18);
servo_BASE.attach(19);
servo_WRIST.attach(21);



Serial.begin(115200);

xTaskCreatePinnedToCore(task_reset, "Task_Button", 10000, NULL, 1, &Task_Reset, 1); 
xTaskCreatePinnedToCore(task_colormode, "Task_ColorMode", 10000, NULL, 0, &Task_ColorMode, 0);
xTaskCreatePinnedToCore(task_pos, "Task_Pos", 10000, NULL, 0, &Task_Pos, 0);
xTaskCreatePinnedToCore(task_manual, "Task_Manual", 10000, NULL, 0, &Task_Manual, 0);



WiFi.softAP(ssid, password);
IPAddress myIP = WiFi.softAPIP();
 

//Move to preset positions 
server.on("/move_to_position", HTTP_POST, [](AsyncWebServerRequest *request) {
  if (request->hasParam("positionNumber", true)) {
    
    AsyncWebParameter* p = request->getParam("positionNumber", true);
    pos_in = p->value().toInt();
  }
  request->send(200, "text/plain", "Movendo para posição " + String(pos_in) + "...");
});


//Return degrees of every servo
server.on("/servos-endpoint", HTTP_GET, [](AsyncWebServerRequest *request){
 
  String jsonResponse = "{";
  jsonResponse += "\"servo1\": " + String(servo_BASE.read()+1) + ",";
  jsonResponse += "\"servo2\": " + String(servo_FIRST_ARM.read()+1) + ","; 
  jsonResponse += "\"servo3\": " + String(servo_SECOND_ARM.read()+1) + ","; 
  jsonResponse += "\"servo4\": " + String(servo_WRIST.read()+1) + ","; 
  jsonResponse += "\"servo5\": " + String(servo_GRIPPER_BASE.read()+1) + ","; 
  jsonResponse += "\"servo6\": " + String(servo_GRIPPER.read()+1) + "";

  jsonResponse += "}";
  
  request->send(200, "application/json", jsonResponse);
});

//Manual slider control 
server.on("/move_servo", HTTP_POST, [](AsyncWebServerRequest *request) {
    mtx.lock();
    if (request->hasParam("servo", true) && request->hasParam("position", true)) {

        servoId = request->getParam("servo", true)->value();
        position = request->getParam("position", true)->value().toInt();
        manual=true;
     }
     mtx.unlock();
  request->send(200, "text/plain", "Servo " + servoId + " moved to position " + String(position));
 });

 //Test endpoint 
 server.on("/send-test", HTTP_POST, [](AsyncWebServerRequest *request){
    String message;
    Serial.println("Recebendo mensagem");

    if (request->hasParam("message", true)) {
      AsyncWebParameter* p = request->getParam("message", true);
      message = p->value();
      Serial.print("Mensagem recebida: ");
      Serial.println(message);
      if(message == "connection test"){
        request->send(200, "text/plain", "ESP32");
      } else {
        request->send(200, "text/plain", "Mensagem desconhecida");
      }
    } else {
      Serial.println("Falhou a mensagem 400");
      request->send(400, "text/plain", "Parâmetro 'message' não encontrado");
    }
  });



  server.begin();
  
}



void loop() {
////////MAIN LOOP NOT USED////////
}

//Functions:

void clear_serial(){
    while (Serial.available() > 0) {
        Serial.read(); 
      }
      serial_in = 0;
}

//Tasks:

void task_colormode(void*pvParameters){
 for(;;){

   if(count_start==1){
  servo_GRIPPER.write(gripper_CLOSE);
  servo_BASE.write(90);
  servo_FIRST_ARM.write(100);
  servo_SECOND_ARM.write(60);
  servo_WRIST.write(90);
  servo_GRIPPER_BASE.write(100);
  count_start++;
  } 
  
  if(Serial.available()>0){ 
    serial_in= Serial.read();
  }
  if(serial_in=='1'){
        blue_pos();
        clear_serial();

  } else if(serial_in=='2'){
        green_pos();
        clear_serial();
            
    } else if(serial_in=='3'){
        red_pos();
        clear_serial();
    }
    vTaskDelay(pdMS_TO_TICKS(100));
  }

}


//Preset positions task
void task_pos(void *pvParameters) {
  for (;;) {
    if(pos_in!=0){
      if(pos_in==1)
       blue_pos();
      else if (pos_in==2){
       red_pos();
      }else if (pos_in==3){
        green_pos();
      }else if (pos_in==4){
        home_pos();
      }else if (5){
        if (servo_GRIPPER.read()<=20 ){
          move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
        }else{
          move_GRIPPER(servo_GRIPPER.read()+1,gripper_CLOSE,default_speed);
        }  
      }
    }
    pos_in=0;
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

//Manual control task
 void task_manual(void*pvParameters){
    for(;;){
      mtx.lock();
      if(manual){
          if (servoId == "1") {
          servo_BASE.write(position);
        } else if (servoId == "2") {
          servo_FIRST_ARM.write(position);
        } else if (servoId == "3") {
          servo_SECOND_ARM.write(position);
        } else if (servoId == "4") {
         servo_WRIST.write(position);
        } else if (servoId == "5") { 
          servo_GRIPPER_BASE.write(position);
        }
      }
      manual=false;
      mtx.unlock();
  }
} 

//Esp fore-reset task
 void task_reset(void*pvParameters){
    for(;;){
    if(digitalRead(button_reset)==LOW){
      ESP.restart();
    }
  }
} 


//Care move servos funcs:

void move_BASE(int initial_pos,int final_pos, const int speed){
 
if(initial_pos<final_pos){ //VERIFY IF SERVO GO "FORWARDS" OR "BACKWARDS"
for (int pos = initial_pos; pos <= final_pos; pos += 1) {//0 -> 180
    servo_BASE.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {//180 -> 0
    servo_BASE.write(pos);
    delay(speed); 
  }
}

void move_GRIPPER(int initial_pos,int final_pos, const int speed){
if(initial_pos<final_pos){
for (int pos = initial_pos; pos <= final_pos; pos += 1) {
    servo_GRIPPER.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {
    servo_GRIPPER.write(pos);
    delay(speed); 
  }
}

void move_GRIPPER_BASE(int initial_pos,int final_pos, const int speed){
  if(initial_pos<final_pos){
for (int pos = initial_pos; pos <= final_pos; pos += 1) {
    servo_GRIPPER_BASE.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {
    servo_GRIPPER_BASE.write(pos);
    delay(speed); 
  }
}

void move_FIRST_ARM(int initial_pos,int final_pos, const int speed){
if(initial_pos<final_pos){
for (int pos = initial_pos; pos <= final_pos; pos += 1) {
    servo_FIRST_ARM.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {
    servo_FIRST_ARM.write(pos);
    delay(speed); 
  }
}

void move_SECOND_ARM(int initial_pos,int final_pos, const int speed){
  if(initial_pos<final_pos){
for (int pos = initial_pos; pos <= final_pos; pos += 1) {
    servo_SECOND_ARM.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {
    servo_SECOND_ARM.write(pos);
    delay(speed); 
  }
}

void move_WRIST(int initial_pos,int final_pos, const int speed){
  if(initial_pos<final_pos){
for (int pos = initial_pos; pos <= final_pos; pos += 1) {
    servo_WRIST.write(pos);
    delay(speed); 
  }
}else
  for (int pos = initial_pos; pos >= final_pos; pos -= 1) {
    servo_WRIST.write(pos);
    delay(speed); 
  }
}

//Preset positions

void home_pos(){
move_BASE(servo_BASE.read()+1,90,base_speed);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,100,default_speed);
move_SECOND_ARM(servo_SECOND_ARM.read()+1,60,default_speed);
move_WRIST(servo_WRIST.read()+1,90,default_speed);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_CLOSE,default_speed);
move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,90,default_speed);
}


void collect_pos(){
move_BASE(servo_BASE.read()+1,90,default_speed);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,65,default_speed);
move_SECOND_ARM(servo_SECOND_ARM.read()+1,150,default_speed);
move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,35,default_speed);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_CLOSE,default_speed);
delay(1000);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,100,default_speed);
delay(2000);
move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,100,default_speed);
}

void blue_pos(){
delay(1000);
collect_pos();
delay(1000);
move_BASE(servo_BASE.read()+1,0,base_speed);
delay(300);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
delay(2000);
home_pos();
}

void green_pos(){
delay(1000);
collect_pos();
delay(1000);
move_BASE(servo_BASE.read()+1,20,base_speed);
delay(500);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
delay(2000);
home_pos();
}

void red_pos(){
delay(1000);
 collect_pos();
delay(1000);
move_BASE(servo_BASE.read()+1,45,base_speed);
move_SECOND_ARM(servo_SECOND_ARM.read()+1,110,default_speed);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,50,default_speed);
delay(500);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
delay(2000);
home_pos();
}

