/** Use https://coda.io/d/Slothbot-3-0_dmZr7LGX7ac/Electronics-Design_suXtr#_luGC3 as a hookup guide.
 * @Allen chen
 */
#include "ina219.h"
#include "motors.h"
#include "rpi.h"
#include "env_sensors.h"


void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("SlothBot v2 Integrated Test Starting...");

  Serial.println("Initiating components...");
  motors_setup();
  ina219_setup();
  rpi_setup();
  env_sensors_setup();

  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.println("Setup complete.");
}

float power;

void loop() {
  
  Serial.println("Bare Teensy running... ");
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  Serial.print(power);
  Serial.println(" mW");




  Serial.println("Turning on environment sensors");
  env_enable();
  delay(100);
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  Serial.print(power);
  Serial.println(" mW\n\n");

  env_update_readings();
  Serial.println("Sensor readings:");
  Serial.print("Lux:         "); Serial.println(env_get_lux(), 5);
  Serial.print("IR:          "); Serial.println(env_get_ir(), 5);
  Serial.print("Full Lum:    "); Serial.println(env_get_full_lum(), 5);
  Serial.print("Visible Lum: "); Serial.println(env_get_visible(), 5);
  Serial.print("Pressure:    "); Serial.println(env_get_pressure(), 5);
  Serial.print("Temperature: "); Serial.println(env_get_temperature(), 5);
  Serial.print("Humidity:    "); Serial.println(env_get_humidity(), 5);
  Serial.print("TVOC:        "); Serial.println(env_get_tvoc(), 5);
  Serial.print("eCO2:        "); Serial.println(env_get_eco2(), 5);
  Serial.print("Raw H2:      "); Serial.println(env_get_raw_h2(), 5);
  Serial.print("Raw Ethanol: "); Serial.println(env_get_raw_ethanol(), 5);

  delay(2000);

  
  Serial.println("Turning on motors... You should see the motors starting to move");
  motors_move(1);
  delay(100);
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  Serial.print(power);
  Serial.println(" mW");
  delay(5000);

  Serial.println("Turning off motors... You should see the motors stopping");
  motors_move(0);
  delay(100);
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  Serial.print(power);
  Serial.println(" mW");
  delay(5000);

  
}
