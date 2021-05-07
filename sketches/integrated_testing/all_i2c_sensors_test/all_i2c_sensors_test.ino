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




#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include <Adafruit_MPL3115A2.h>
#include "Adafruit_SGP30.h"
#include "Adafruit_TSL2591.h"

#define SEALEVELPRESSURE_HPA (1013.25)
#define LED 13

Adafruit_BME680 bme; // I2C
Adafruit_SGP30 sgp;
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591); // pass in a number for the sensor identifier (for your use later)

int counter = 0;

uint32_t getAbsoluteHumidity(float temperature, float humidity) {
    // approximation formula from Sensirion SGP30 Driver Integration chapter 3.15
    const float absoluteHumidity = 216.7f * ((humidity / 100.0f) * 6.112f * exp((17.62f * temperature) / (243.12f + temperature)) / (273.15f + temperature)); // [g/m^3]
    const uint32_t absoluteHumidityScaled = static_cast<uint32_t>(1000.0f * absoluteHumidity); // [mg/m^3]
    return absoluteHumidityScaled;
}

void setup_tsl(void)
{
  
  if (!tsl.begin()) 
  {
    Serial.println("WARNING: Can't find TSL2591");
  } 
  else 
  {
    Serial.println("TSL2591 operational");
    tsl.setGain(TSL2591_GAIN_MED);      // 25x gain
    tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
  }
}


void setup_bme() {
  if (!bme.begin()) {
    Serial.println("WARNING: Can't start BME680");
  } else {
    Serial.println("BME680 operational");
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150); // 320*C for 150 ms
  }
}

void setup_sgp() {
  if (!sgp.begin()){
    Serial.println("WARNING: Can't start SGP30");
  } else {
    Serial.println("SGP30 operational");
  }
}


void read_bme(){
  if (! bme.performReading()) {
    return;
  }
  Serial.println("BME680 Readings");
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
}

void read_sgp(){
  if (! sgp.IAQmeasure()) {
    return;
  }
  Serial.println("SGP30 Readings");
  Serial.print("TVOC "); Serial.print(sgp.TVOC); Serial.print(" ppb\t");
  Serial.print("eCO2 "); Serial.print(sgp.eCO2); Serial.println(" ppm");

  if (! sgp.IAQmeasureRaw()) {
    return;
  }
  Serial.print("Raw H2 "); Serial.print(sgp.rawH2); Serial.print(" \t");
  Serial.print("Raw Ethanol "); Serial.print(sgp.rawEthanol); Serial.println("");

}

void read_tsl(void)
{
  if(!tsl.getFullLuminosity()){
    return;
  }
  // More advanced data read example. Read 32 bits with top 16 bits IR, bottom 16 bits full spectrum
  // That way you can do whatever math and comparisons you want!
  uint32_t lum = tsl.getFullLuminosity();
  uint16_t ir, full;
  ir = lum >> 16;
  full = lum & 0xFFFF;
  Serial.print(F("[ ")); Serial.print(millis()); Serial.print(F(" ms ] "));
  Serial.print(F("IR: ")); Serial.print(ir);  Serial.print(F("  "));
  Serial.print(F("Full: ")); Serial.print(full); Serial.print(F("  "));
  Serial.print(F("Visible: ")); Serial.print(full - ir); Serial.print(F("  "));
  Serial.print(F("Lux: ")); Serial.println(tsl.calculateLux(full, ir), 6);
}


void blink_for_a_second() {
  delay(1000);
  digitalWrite(LED, LOW);
  delay(1000);
  digitalWrite(LED, HIGH);
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
  delay(100);

  setup_bme();
  setup_sgp();
  setup_tsl();
}

void loop() {
  digitalWrite(LED, HIGH);
  
  read_bme();
  blink_for_a_second();

  read_sgp();
  blink_for_a_second();
  
  read_tsl();
  blink_for_a_second();
}
