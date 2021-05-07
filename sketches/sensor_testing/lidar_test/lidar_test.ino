/**
 * @Allen Chen
 * Setup for this test:
 * 1. Include TFMPlus library by Bud Ryerson (Tools -> Manage Libraries -> Type in TFMPlus
 * 2. Connect the 4 pins on TFMPlus to Teensy in the following manner:
 *    - Red to 5V
 *    - Black o GND
 *    - Green to Pin0 (the one just above GND)
 *    - White to Pin1 (the one just above Pin0)  
 *    - Load up the script. You should be able to see output that looks like this:
 *        Dist: 278   Flux: 2192   Temp: 56
 */



#include <TFMPlus.h>  // Include TFMini Plus Library v1.4.1
TFMPlus lidar1;         // Create a TFMini Plus object
TFMPlus lidar2;
                                    
void setup()
{
    Serial.begin( 115200);   // Intialize terminal serial port
    delay(20);               // Give port time to initalize

    Serial2.begin( 115200);  // Initialize TFMPLus device serial port.
    delay(20);               // Give port time to initalize
    
    Serial3.begin( 115200);  // Initialize TFMPLus device serial port.
    delay(20);               // Give port time to initalize
    lidar1.begin( &Serial2);   // Initialize device library object and...
    
    lidar2.begin( &Serial3);   // Initialize device library object and...
    //                              pass device serial port to the object.
    delay(500);            // And wait for half a second.
}

// Initialize variables
int16_t tfDist = 0;    // Distance to object in centimeters
int16_t tfFlux = 0;    // Strength or quality of return signal
int16_t tfTemp = 0;    // Internal temperature of Lidar sensor chip

// Use the 'getData' function to pass back device data.
void loop()
{
    delay(50);   // Loop delay to match the 20Hz data frame rate

    if( lidar1.getData( tfDist, tfFlux, tfTemp)) // Get data from the device.
    {
      Serial.print("LIDAR1:  Dist: ");
      Serial.print(tfDist);
      Serial.print("   Flux: ");
      Serial.print(tfFlux);
      Serial.print("   Temp: ");
      Serial.print(tfTemp);
      Serial.println();          // end-of-line.
    }
    else                  // If the command fails...
    {
      lidar1.printFrame();  // display the error and HEX dataa
    }


    
    if( lidar2.getData( tfDist, tfFlux, tfTemp)) // Get data from the device.
    {
      Serial.print("LIDAR2:  Dist: ");
      Serial.print(tfDist);
      Serial.print("   Flux: ");
      Serial.print(tfFlux);
      Serial.print("   Temp: ");
      Serial.print(tfTemp);
      Serial.println();          // end-of-line.
    }
    else                  // If the command fails...
    {
      lidar2.printFrame();  // display the error and HEX dataa
    }
}
