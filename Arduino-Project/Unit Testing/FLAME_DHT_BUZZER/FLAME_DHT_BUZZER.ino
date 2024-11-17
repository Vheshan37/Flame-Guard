#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define FLAME_SENSOR_PIN 4
#define BUZZER_PIN 14

#define DHTPIN 26      
#define DHTTYPE DHT11  

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);  
  dht.begin();

  pinMode(FLAME_SENSOR_PIN, INPUT);  
  pinMode(13, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  int flameDetected = digitalRead(FLAME_SENSOR_PIN);  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();


  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }


  Serial.println(String("Humidity: ") + humidity);
  Serial.println(String("%  Temperature: ") + temperature + "°C");

  if (flameDetected == LOW) {
    Serial.println("Flame Detected!");
    digitalWrite(13, HIGH);
    tone(14, 1000);
  } else {
    Serial.println("No Flame Detected.");
    digitalWrite(13, LOW);
    noTone(BUZZER_PIN);
  }

  delay(1000);
}