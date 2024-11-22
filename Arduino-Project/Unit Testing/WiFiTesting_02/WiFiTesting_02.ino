#include <WiFi.h>
#include <WebServer.h>

WebServer server(80);

const char *apSSID = "ESP32_Config";
const char *apPassword = "12345678";

void setup() {
    WiFi.softAP(apSSID, apPassword);
    Serial.begin(9600);
    Serial.println("Access Point Started");
    Serial.println(WiFi.softAPIP());

    server.on("/configure", HTTP_POST, []() {
        if (server.hasArg("ssid") && server.hasArg("password")) {
            String ssid = server.arg("ssid");
            String password = server.arg("password");
            WiFi.begin(ssid.c_str(), password.c_str());
            server.send(200, "text/plain", "Wi-Fi Configured");
        } else {
            server.send(400, "text/plain", "Missing Parameters");
        }
    });

    server.begin();
}

void loop() {
    // server.handleClient();
}