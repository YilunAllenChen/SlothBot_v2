// Use https://coda.io/d/Slothbot-3-0_dmZr7LGX7ac/Electronics-Design_suXtr#_luGC3 as a hookup guide.

#include "ina219.h"
#include "motors.h"
#include "rpi.h"
#include "env_sensors.h"


#include <ArduinoJson.h>

StaticJsonDocument<1024> inbound;
StaticJsonDocument<4096> outbound;



// Hot data
double cumulative_mAs = 0;
unsigned long timestamp = millis();


String json_str;
char* comp;


// cold data
JsonArray ts_array;
JsonArray lux_array;
JsonArray ir_array;
JsonArray full_lum_array;
JsonArray visible_array;
JsonArray pressure_array;
JsonArray temperature_array;
JsonArray gas_resistance_array;
JsonArray humidity_array;
JsonArray tvoc_array;
JsonArray eco2_array;
JsonArray raw_h2_array;
JsonArray raw_ethanol_array;


void reset_outbound_arrays() {
  outbound.clear();
  ts_array = outbound.createNestedArray("ts");
  lux_array = outbound.createNestedArray("lux");
  ir_array = outbound.createNestedArray("ir");
  full_lum_array = outbound.createNestedArray("lum");
  visible_array = outbound.createNestedArray("visible");
  pressure_array = outbound.createNestedArray("pressure");
  temperature_array = outbound.createNestedArray("temperature");
  gas_resistance_array = outbound.createNestedArray("gas_resistance");
  humidity_array = outbound.createNestedArray("humidity");
  tvoc_array = outbound.createNestedArray("tvoc");
  eco2_array = outbound.createNestedArray("eco2");
  raw_h2_array = outbound.createNestedArray("raw_h2");
  raw_ethanol_array = outbound.createNestedArray("raw_ethanol");
}


void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("SlothBot v3 Integrated Test Starting...");
  Serial.println("Initiating components...");
  Serial.begin(9600);
  Serial1.begin(115200);
//  while (!Serial) continue;
//  while (!Serial1) continue;
  motors_setup();
  ina219_setup();
  rpi_setup();
  env_sensors_setup();
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.println("Setup complete.");
  reset_outbound_arrays();
}




bool every(int seconds) {
  if ( (millis() / 1000) % seconds == 0) {
    return true;
  }
  return false;
}



void loop() {

  if (Serial1.available() > 0) {
    String line = Serial1.readString();
    Serial.print("Received: ");
    Serial.println(line);
    DeserializationError error = deserializeJson(inbound, line);
    if (error) {
      Serial.println("Error");
    } else {
      comp = (inbound["component"]);
    }
  }

  if (every(10)) {
    ts_array.add(millis());
    lux_array.add(env_get_lux());
    ir_array.add(env_get_ir());
    full_lum_array.add(env_get_full_lum());
    visible_array.add(env_get_visible());
    pressure_array.add(env_get_pressure());
    temperature_array.add(env_get_temperature());
    gas_resistance_array.add(env_get_gas_resistance());
    humidity_array.add(env_get_humidity());
    tvoc_array.add(env_get_tvoc());
    eco2_array.add(env_get_eco2());
    raw_h2_array.add(env_get_raw_h2());
    raw_ethanol_array.add(env_get_raw_ethanol());
  }





  if (strcmp(comp, "sensors") == 0)
  {
    if (strcmp(inbound["cmd"], "read_all") == 0) {
      Serial.println("Dumping sensor data");
      serializeJsonPretty(outbound, Serial);
      serializeJsonPretty(outbound, Serial1);
      reset_outbound_arrays();
    }
  }

  if (strcmp(comp, "motors") == 0) {
    if (strcmp(inbound["cmd"], "set_speed") == 0) {
      int sp = inbound["params"][0];
      set_speed(sp);
    }
    if (strcmp(inbound["cmd"], "stop") == 0) {
      set_speed(0);
    }
  }

  inbound.clear();
  delay(1000);

}
