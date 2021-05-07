#include <ArduinoJson.h>

StaticJsonDocument<1024> doc;

void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  Serial1.begin(115200);
  while (!Serial) continue;
  while (!Serial1) continue;
}

String json_str;

void loop() {
  // not used in this example
  //
  if(Serial1.available() > 0) {
    String line = Serial1.readString();
    Serial.println(line);
    DeserializationError error = deserializeJson(doc, line);
    if (error) {
      Serial.println("Error");
    } else {
      char* sen = (doc["sensor"]);
      Serial1.write(sen);
      Serial.println(sen);
    }
  }
}
