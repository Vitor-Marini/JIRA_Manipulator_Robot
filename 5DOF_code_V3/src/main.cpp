#include <Arduino.h>
#include<ESP32Servo.h>
#include<ESPAsyncWebServer.h>
#include "SPIFFS.h"
#include <string>
#include <FS.h>
#include <ArduinoJson.h>


const char *ssid = "ESP_vitor3";
const char *password = "senhaforte";

void servoTurnRight();

void servoTurnLeft();

void servoStop();


float fakegraus = 120;//debug 
//Variables
char serial_in;
int button_reset=22;
int default_speed=15;
int base_speed=5;
int gripper_CLOSE=10;
int gripper_OPEN=60;
int pos_in=0;
String servoId;
int position;
bool manual=false;

//ProgMode

struct Movement {
  String servo;
  int final_pos;
};

Movement* movementsArray = nullptr;
int movementsCount = 0;
bool executeProfile =false;
String profileName = "";
void loadProfileMovements(String);

//free RTOS
TaskHandle_t Task_ColorMode;
TaskHandle_t Task_Reset; 
TaskHandle_t Task_Pos; 
TaskHandle_t Task_Manual;
TaskHandle_t Task_ProgMode;

//Funciton declaration

void task_colormode(void*pvParameters);
void task_reset(void*pvParameters); 
void task_pos(void*pvParameters); 
void task_manual(void*pvParameters); 
void task_progmode(void*pvParameters);

void clear_serial();//Clean anything on serial queue

void move_BASE(int initialPos,int finalPos,const int speed);
void move_FIRST_ARM(int initialPos,int finalPos,const int speed);
void move_SECOND_ARM(int initialPos,int finalPos,const int speed);
void move_WRIST(int initialPos,int finalPos,const int speed);
void move_GRIPPER_BASE(int initialPos,int finalPos,const int speed);
void move_GRIPPER(int initialPos,int finalPos,const int speed);



//POSITION PRESETS
void home_pos();
void home_pos2();
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

Servo servo_conveyor;

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

servo_conveyor.attach(23);

Serial.begin(115200);

xTaskCreatePinnedToCore(task_reset, "Task_Button", 10000, NULL, 1, &Task_Reset, 1); 
xTaskCreatePinnedToCore(task_colormode, "Task_ColorMode", 10000, NULL, 0, &Task_ColorMode, 0);
xTaskCreatePinnedToCore(task_pos, "Task_Pos", 10000, NULL, 0, &Task_Pos, 0);
xTaskCreatePinnedToCore(task_manual, "Task_Manual", 10000, NULL, 0, &Task_Manual, 0);
xTaskCreatePinnedToCore(task_progmode, "Task_ProgMode", 10000, NULL, 0, &Task_ProgMode, 0);



 if(!SPIFFS.begin(true)){
    Serial.println("\nAn Error has occurred while mounting SPIFFS");
    return;
  }else{
    Serial.println("\nSPIFFS started");
  }

  WiFi.softAP(ssid, password);
  IPAddress myIP = WiFi.softAPIP();
 
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
 request->send(SPIFFS, "/index.html");
 });

  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/style.css", "text/css");
  });


  server.on("/page2", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/page2.html");
  });


  server.on("/page3", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/page3.html");
  });

  server.on("/script.js", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/script.js", "application/javascript");
  });


  server.on("/move_to_position", HTTP_POST, [](AsyncWebServerRequest *request) {
  if (request->hasParam("positionNumber", true)) {
    AsyncWebParameter* p = request->getParam("positionNumber", true);
    pos_in = p->value().toInt(); // Converte o valor do parâmetro para um inteiro e armazena em pos_in
  }
  request->send(200, "text/plain", "Movendo para posição " + String(pos_in) + "...");
});



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

  server.on("/move_servo", HTTP_POST, [](AsyncWebServerRequest *request) {
     if (request->hasParam("servo", true) && request->hasParam("position", true)) {
    servoId = request->getParam("servo", true)->value();
    position = request->getParam("position", true)->value().toInt();
    manual=true;

     }
    request->send(200, "text/plain", "Servo " + servoId + " moved to position " + String(position));
  });


server.on("/options.json", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/options.json", "application/json");
});

server.on("/profiles.json", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/profiles.json", "application/json");
});

      // Rota para salvar o perfil
  server.on("/save_profile", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
    // Cria um documento JSON para armazenar os dados recebidos
    DynamicJsonDocument newProfileDoc(1024);

    // Deserializa os dados recebidos para o documento JSON
    DeserializationError error = deserializeJson(newProfileDoc, data);
    if (error) {
      Serial.println("deserializeJson() failed: " + String(error.c_str()));
      request->send(400, "text/plain", "Invalid JSON");
      return;
    }

    // Obtém o nome do perfil
    const char* profileName = newProfileDoc["name"];
    Serial.println("Profile Name: " + String(profileName));

    // Abre o arquivo profiles.json para leitura
    File file = SPIFFS.open("/profiles.json", FILE_READ);
    if (!file) {
      Serial.println("Failed to open profiles.json for reading");
      request->send(500, "text/plain", "Failed to open profiles.json");
      return;
    }

    // Lê o conteúdo do arquivo profiles.json
    String profilesContent = file.readString();
    file.close();

    // Cria um documento JSON para armazenar todos os perfis
    DynamicJsonDocument profilesDoc(4096);
    deserializeJson(profilesDoc, profilesContent);

    // Verifica se o perfil com o mesmo nome já existe
    if (profilesDoc.containsKey(profileName)) {
      Serial.println("Profile with the same name already exists");
      request->send(400, "text/plain", "Profile with the same name already exists");
      return;
    }

    // Adiciona o novo perfil ao documento JSON de perfis
    profilesDoc[profileName] = newProfileDoc;

    // Abre o arquivo profiles.json para escrita
    file = SPIFFS.open("/profiles.json", FILE_WRITE);
    if (!file) {
      Serial.println("Failed to open profiles.json for writing");
      request->send(500, "text/plain", "Failed to open profiles.json");
      return;
    }

    // Serializa o JSON de perfis e escreve no arquivo
    if (serializeJson(profilesDoc, file) == 0) {
      Serial.println("Failed to write to profiles.json");
      request->send(500, "text/plain", "Failed to write to profiles.json");
    } else {
      Serial.println("Profile saved successfully to profiles.json");
      request->send(200, "application/json", "{\"success\":true}");
    }

    // Fecha o arquivo
    file.close();
  });

server.on("/play_profile", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  profileName="";

  for(size_t i = 0; i < len; i++) {
    profileName += (char)data[i];
  }

  executeProfile=true;
  Serial.println("PALY_PROFILE DEPOIS DO EXECUTE:");
  Serial.println(profileName);

  request->send(200, "text/plain", "Profile loaded successfully");
});

  server.begin();
  
}



void loop() {
////////////////////

servoTurnRight();
delay(2000);
servoTurnLeft();
delay(2000);

}


void clear_serial(){
    while (Serial.available() > 0) {
        Serial.read(); 
      }
      serial_in = 0;
}

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
    vTaskDelay(pdMS_TO_TICKS(100)); // Delay para liberar o CPU
  }

}


 void task_reset(void*pvParameters){
    for(;;){
    if(digitalRead(button_reset)==LOW){
      ESP.restart();
    }
  }
} 



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
    vTaskDelay(pdMS_TO_TICKS(100)); // Delay para liberar o CPU
  }
}


 void task_manual(void*pvParameters){
    for(;;){
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
  }
} 


 void task_progmode(void*pvParameters){
    for(;;){
      if(executeProfile){
        Serial.println("EXECUTE FOI PARA TRUE , TAMO DENTRO");
        loadProfileMovements(profileName);
        for(int i = 0;i<movementsCount;i++){
          if(movementsArray[i].servo == "servo1"){
            move_BASE(servo_BASE.read()+1,movementsArray[i].final_pos,base_speed);
          }else if (movementsArray[i].servo == "servo2"){
            move_FIRST_ARM(servo_FIRST_ARM.read()+1,movementsArray[i].final_pos,default_speed);
          }else if (movementsArray[i].servo == "servo3"){
           move_SECOND_ARM(servo_SECOND_ARM.read()+1,movementsArray[i].final_pos,default_speed);
          }else if (movementsArray[i].servo == "servo4"){
            move_WRIST(servo_WRIST.read()+1,movementsArray[i].final_pos,default_speed);
          }else if (movementsArray[i].servo == "servo5") {
            move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,movementsArray[i].final_pos,default_speed);
          }else if (movementsArray[i].servo == "servo6"){
            move_GRIPPER(servo_GRIPPER.read()+1,movementsArray[i].final_pos,default_speed);
          }
          }
          Serial.println("SAINDO DO EXECUTE");
      // Após a execução dos movimentos, resete executeProfile e limpe movementsArray se necessário
      executeProfile = false;
      delete[] movementsArray; // Libera a memória alocada para movementsArray
      movementsArray = nullptr; // Garante que o ponteiro agora aponta para nullptr
      movementsCount = 0; // Reseta o contador de movimentos
      }
     vTaskDelay(pdMS_TO_TICKS(100)); // Delay para evitar uso excessivo da CPU
  }
} 


void loadProfileMovements(String) {
  Serial.println("dentro do load profile ");
  // Certifique-se de que SPIFFS está inicializado
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Abre o arquivo profiles.json para leitura
  File file = SPIFFS.open("/profiles.json", "r");
  if (!file) {
    Serial.println("Failed to open profiles.json");
    return;
  }

  // Aumente o tamanho se necessário
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, file);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    file.close();
    return;
  }

  file.close();

  // Procura pelo perfil
  JsonObject profile = doc[profileName];
  if (profile.isNull()) {
    Serial.println("Profile not found: " + profileName);
    return;
  }

  JsonArray movements = profile["movements"];
  movementsCount = movements.size();

  // Libera o array anterior se ele existir
  delete[] movementsArray;
  movementsArray = new Movement[movementsCount];

  int i = 0;
  for (JsonObject movement : movements) {
    movementsArray[i].servo = movement["motor"].as<String>();
    movementsArray[i].final_pos = movement["attribute"].as<int>();
    i++;
  }

}


void move_BASE(int initial_pos,int final_pos, const int speed){
 
if(initial_pos<final_pos){ //VERIFY IF IS TO SERVO GO "FORWARDS" OR "BACKWARDS"
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

void home_pos(){
move_BASE(servo_BASE.read()+1,90,base_speed);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,100,default_speed);
move_SECOND_ARM(servo_SECOND_ARM.read()+1,60,default_speed);
move_WRIST(servo_WRIST.read()+1,90,default_speed);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_CLOSE,default_speed);
move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,90,default_speed);
}

void home_pos2(){
move_BASE(servo_BASE.read()+1,90,base_speed);
move_FIRST_ARM(servo_FIRST_ARM.read()+1,30,default_speed);
move_SECOND_ARM(servo_SECOND_ARM.read()+1,170,default_speed);
move_WRIST(servo_WRIST.read()+1,120,default_speed);
move_GRIPPER_BASE(servo_GRIPPER_BASE.read()+1,120,default_speed);
move_GRIPPER(servo_GRIPPER.read()+1,gripper_OPEN,default_speed);
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


void servoTurnRight(){
  servo_conveyor.write(0);
}
void servoTurnLeft(){
  servo_conveyor.write(180);
}
void servoStop(){
  servo_conveyor.write(90);
}


