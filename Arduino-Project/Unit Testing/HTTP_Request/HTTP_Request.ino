#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

const char *ssid = "VihangaDLink_2G";
const char *password = "Vh2002@#";

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  HTTPClient request = HTTPClient();

  JSONVar requestObject;
  requestObject["temperatur"] = "35";
  requestObject["flame"] = "true";

  String jsonString = JSON.stringify(requestObject);

  request.begin("https://flameguard.loca.lt/FlameGuard/Home");
  int status = request.POST(jsonString);

  if (status > 0) {
    if (status == HTTP_CODE_OK) {
      String responseText = request.getString();
      Serial.println(responseText);
      JSONVar JsonResponse = JSON.parse(responseText);
      Serial.println(JsonResponse["status"]);
      Serial.println(JsonResponse["message"]);
    }
  } else {
    Serial.println("Error");
  }

  request.end();
  delay(5000);
}
