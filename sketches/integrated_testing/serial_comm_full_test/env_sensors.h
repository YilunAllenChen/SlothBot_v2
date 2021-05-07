/**
 * @Allen Chen
 * Setup for this test:
 * 1. Include all sensor libraries (Tools -> Manage Libraries -> Type in names of sensor libraries
 * 2. Connect the pins on BME680 to Teensy in the following manner:
 *    - VIN (on BME680) to 5V (Teensy)
 *    - GND o GND
 *    - SDI/SDA to Pin18 (I2C0 SDA)
 *    - SCK/SCL to Pin19 (I2C0 SCL)
 * 3. run the script.
 */

#pragma once

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "Adafruit_SGP30.h"
#include "Adafruit_TSL2591.h"

// setup
void env_sensors_setup();
void env_update_readings();

// control
void env_enable();
void env_disable();

// utilities
uint32_t env_get_lux();
uint16_t env_get_ir();
uint16_t env_get_full_lum();
uint16_t env_get_visible();
float env_get_pressure();
float env_get_temperature();
float env_get_gas_resistance();
float env_get_humidity();
float env_get_tvoc();
float env_get_eco2();
float env_get_raw_h2();
float env_get_raw_ethanol();
