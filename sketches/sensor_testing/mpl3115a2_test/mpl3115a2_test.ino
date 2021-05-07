// !!NOTE: The functionalities provided by this sensor seems to be fully covered by BME680! Consider using BME680 only instead.

/**
 * @Allen Chen
 * Setup for this test:
 * 1. Include Adafruit MPL3115A2 library by Adafruit (Tools -> Manage Libraries -> Type in MPL3115A2
 * 2. Connect the pins on MPL3115A2 to Teensy in the following manner:
 *    - VIN (on MPL3115A2) to 5V (Teensy)
 *    - GND o GND
 *    - SDA to Pin18 (I2C0 SDA)
 *    - SCL to Pin19 (I2C0 SCL)
 *    - Load up the script. You should be able to see output that looks like this:
 *        29.14 Inches (Hg)
 *        247.00 meters
 *        23.75*C
 */


#include <Wire.h>
#include <Adafruit_MPL3115A2.h>

Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();

void setup() {
  Serial.begin(9600);
  Serial.println("Adafruit_MPL3115A2 test!");
}

void loop() {
  if (! baro.begin()) {
    Serial.println("Couldnt find sensor");
    return;
  }
  
  float pascals = baro.getPressure();
  // Our weather page presents pressure in Inches (Hg)
  // Use http://www.onlineconversion.com/pressure.htm for other units
  Serial.print(pascals/3377); Serial.println(" Inches (Hg)");

  float altm = baro.getAltitude();
  Serial.print(altm); Serial.println(" meters");

  float tempC = baro.getTemperature();
  Serial.print(tempC); Serial.println("*C");

  delay(250);
}
