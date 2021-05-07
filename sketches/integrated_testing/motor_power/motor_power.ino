#include "ina219.h"
#include "motors.h"
#include "rpi.h"
#include "env_sensors.h"


void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("SlothBot v3 Integrated Test Starting...");

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
float current;

void loop() {
  
  Serial.println("Bare Teensy running... ");
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  Serial.print(power);
  Serial.println(" mW");

  
  Serial.println("Turning on motors... You should see the motors starting to move");
  motors_move(1);
  delay(100);
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  current = ina219_get_current();
  Serial.print(power);
  Serial.print(" mW; Current: ");
  Serial.print(current);
  Serial.println(" mA");
  delay(5000);
  
  Serial.print("Power Stats: ");
  power = ina219_get_power();
  current = ina219_get_current();
  Serial.print(power);
  Serial.print(" mW; Current: ");
  Serial.print(current);
  Serial.println(" mA");
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
