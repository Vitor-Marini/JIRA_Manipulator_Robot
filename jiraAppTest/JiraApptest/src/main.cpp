#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "ESP_jira"; 
const char* password = "senhaforte";

AsyncWebServer server(80); 

void setup() {
 Serial.begin(115200);

 WiFi.softAP(ssid, password);

 IPAddress myIP = WiFi.softAPIP();
 Serial.print("Endereço IP da Rede: ");
 Serial.println(myIP);
 Serial.println("Rede Wi-Fi criada");


 // Configura a rota /hello
 server.on("/hello", HTTP_GET, [](AsyncWebServerRequest *request){
      Serial.println("Hello World");
      request->send(200, "text/plain", "Hello World");
 });


 server.on("/json", HTTP_GET, [](AsyncWebServerRequest *request){
      String json = "{\"message\": \"Hello, this is a JSON message!\"}";
       request->send(200, "application/json", json);
 });

 
 server.begin();
}

void loop() {

 int numClients = WiFi.softAPgetStationNum();
 Serial.print("Numero de clientes conectados: ");
 Serial.println(numClients);

 delay(5000); 
}