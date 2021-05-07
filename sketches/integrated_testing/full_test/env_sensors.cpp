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

#include "env_sensors.h"

#define SEALEVELPRESSURE_HPA (1013.25)
#define EN_SENSORS 3

Adafruit_BME680 bme; // I2C
Adafruit_SGP30 sgp;
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591); // pass in a number for the sensor identifier (for your use later)

int bme_state = -1;
int sgp_state = -1;
int tsl_state = -1;

/** State Bank
   -1: Uninitialized 
   -2: Failed to initialize
   
   0: Functional
   1: Disabled
*/

uint16_t lum_full, lum_ir;
float pressure;
float altitude;
float temperature;
float gas_resistance;
float humidity;
float tvoc;
float eco2;
float raw_h2;
float raw_ethanol;

void setup_tsl(void)
{
  if (!tsl.begin())
  {
    Serial.println("WARNING: Can't find TSL2591");
    tsl_state = -2;
  }
  else
  {
    Serial.println("TSL2591 operational");
    tsl.setGain(TSL2591_GAIN_MED); // 25x gain
    tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
    tsl_state = 0;
  }
}

void setup_bme()
{
  if (!bme.begin())
  {
    Serial.println("WARNING: Can't start BME680");
    bme_state = -2;
  }
  else
  {
    Serial.println("BME680 operational");
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150); // 320*C for 150 ms
    bme_state = 0;
  }
}

void setup_sgp()
{
  if (!sgp.begin())
  {
    Serial.println("WARNING: Can't start SGP30");
    sgp_state = -2;
  }
  else
  {
    Serial.println("SGP30 operational");
    sgp_state = 0;
  }
}

uint32_t env_get_lux()
{
  return tsl.calculateLux(lum_full, lum_ir);
}

uint16_t env_get_ir()
{
  return lum_ir;
}

uint16_t env_get_full_lum()
{
  return lum_full;
}

uint16_t env_get_visible()
{
  return lum_full - lum_ir;
}

float env_get_pressure()
{
  return pressure;
}

float env_get_temperature()
{
  return temperature;
}

float env_get_gas_resistance()
{
  return gas_resistance;
}

float env_get_humidity()
{
  return humidity;
}

float env_get_tvoc()
{
  return tvoc;
}

float env_get_eco2()
{
  return eco2;
}

float env_get_raw_h2()
{
  return raw_h2;
}

float env_get_raw_ethanol()
{
  return raw_ethanol;
}

void env_sensors_setup()
{
  pinMode(EN_SENSORS, HIGH);
  setup_bme();
  setup_sgp();
  setup_tsl();
}

void env_enable(){
  digitalWrite(EN_SENSORS, HIGH);
  bme_state = tsl_state = sgp_state = 0;
}

void env_disable(){
  digitalWrite(EN_SENSORS, LOW);
  bme_state = tsl_state = sgp_state = 1;
}

void env_update_readings()
{
  if (bme_state == 0)
  {
    bme.performReading();
    temperature = bme.temperature;
    pressure = bme.pressure / 100.0;
    humidity = bme.humidity;
    gas_resistance = bme.gas_resistance / 1000.0;
    altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  }
  else
  {
    Serial.print("BME sensor is not active. It's in state:");
    Serial.println(bme_state);
  }

  if (sgp_state == 0)
  {
    sgp.IAQmeasure();
    tvoc = sgp.TVOC;
    eco2 = sgp.eCO2;
    sgp.IAQmeasureRaw();
    raw_h2 = sgp.rawH2;
    raw_ethanol = sgp.rawEthanol;
  }
  else
  {
    Serial.print("SGP sensor is not active. It's in state:");
    Serial.println(bme_state);
  }
  if (tsl_state == 0)
  {
    uint32_t lum = tsl.getFullLuminosity();
    lum_ir = lum >> 16;
    lum_full = lum & 0xFFFF;
  }
  else
  {
    Serial.print("TSL sensor is not active. It's in state:");
    Serial.println(bme_state);
  }
}
