#pragma once

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_INA219.h>

// Setup
void ina219_setup();

// Utilities
float ina219_get_bus_voltage();
float ina219_get_current();
float ina219_get_power();
float ina219_get_shunt_voltage();
float ina219_get_load_voltage();
