/**
 * @Allen Chen
 * Setup for this test:
 * 1. Include Adafruit BME680 library by Adafruit (Tools -> Manage Libraries -> Type in BME680
 * 2. Connect the pins on BME680 to Teensy in the following manner:
 *    - VIN (on BME680) to 5V (Teensy)
 *    - GND o GND
 *    - SDI/SDA to Pin18 (I2C0 SDA)
 *    - SCK/SCL to Pin19 (I2C0 SCL)
 *    - Load up the script. You should be able to see output that looks like this:
 *          Temperature = 25.07 *C
 *          Pressure = 983.99 hPa
 *          Humidity = 35.05 %
 *          Gas = 0.00 KOhms
 *          Approx. Altitude = 246.34 m
 */




#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 bme; // I2C

void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println(F("BME680 test"));

  if (!bme.begin()) {
    Serial.println("Could not find a valid BME680 sensor, check wiring!");
    while (1);
  }

  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150); // 320*C for 150 ms
}

void loop() {
  if (! bme.performReading()) {
    Serial.println("Failed to perform reading :(");
    return;
  }
  Serial.print("Temperature = ");
  Serial.print(bme.temperature);
  Serial.println(" *C");

  Serial.print("Pressure = ");
  Serial.print(bme.pressure / 100.0);
  Serial.println(" hPa");

  Serial.print("Humidity = ");
  Serial.print(bme.humidity);
  Serial.println(" %");

  Serial.print("Gas = ");
  Serial.print(bme.gas_resistance / 1000.0);
  Serial.println(" KOhms");

  Serial.print("Approx. Altitude = ");
  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.println(" m");

  Serial.println();
  delay(2000);
}