#include <WiFi.h>
#include <HTTPClient.h>

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
  request.begin("http://localhost:8080/FlameGuard/Home");
  int status = request.GET();

  if (status > 0) {
    if (status == HTTP_CODE_OK) {
      String responseText = request.getString();
      Serial.println(responseText);
    }
  } else {
    Serial.println("Error");
  }

  request.end();
  delay(5000);
}
