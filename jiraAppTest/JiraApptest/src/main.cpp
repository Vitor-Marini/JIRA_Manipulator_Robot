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


  // Nova rota para receber mensagem via POST
   server.on("/send-message", HTTP_POST, [](AsyncWebServerRequest *request){
    String message;
    Serial.println("\nRecebendo mensagem");

    if (request->hasParam("message", true)) {
      AsyncWebParameter* p = request->getParam("message", true);
      message = p->value();
      Serial.print("Mensagem recebida: ");
      Serial.println(message);
      if (message == "Hello ESP32!") {
          request->send(200, "text/plain", "Hello React Native!");
      } else  {
          request->send(200, "text/plain", "Mensagem não reconhecida");
      }
      //request->send(200, "text/plain", "Mensagem recebida com sucesso");
    } else {
      Serial.println("Falhou a mensagem 400");
      request->send(400, "text/plain", "Parâmetro 'message' não encontrado");
    }
  });


 server.begin();
  Serial.println("Servidor iniciado");

 
 server.begin();
}

void loop() {

}