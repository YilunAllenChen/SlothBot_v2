#include "ina219.h"


Adafruit_INA219 ina219;
int ina219_state = -1;

/** State Bank
   -1: Uninitialized 
   -2: Failed to initialize
   
   0: Functional
   1: Disabled
*/


void ina219_setup() {
  if (! ina219.begin()) {
    Serial.println("Failed to find INA219 chip");
    ina219_state = -2;
  } else {
    Serial.println("INA219 Power sensor initialized successfully");
    ina219_state = 0;
  }
}

float ina219_get_bus_voltage() {
  if(ina219_state < 0) return -99999;
  return ina219.getBusVoltage_V();
}
float ina219_get_current() {
  if(ina219_state < 0) return -99999;
  return ina219.getCurrent_mA();
}
float ina219_get_power() {
  if(ina219_state < 0) return -99999;
  return ina219.getPower_mW();
}
float ina219_get_shunt_voltage() {
  if(ina219_state < 0) return -99999;
  return ina219.getShuntVoltage_mV();
}

float ina219_get_load_voltage() {
  if(ina219_state < 0) return -99999.0;
  return ina219.getBusVoltage_V() + (ina219.getShuntVoltage_mV() / 1000.0);
}
