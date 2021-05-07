// This script is used as a makeshift solution for abg deployment of Slothbot v2.1.
// Slothbot 2.1 wasn't moving in the abg so we made a soldered-breadboard solution and used this script to let the robot move.
// Although the pin connections are all the same as Slothbot v2.1, this sciprt should not be used in any production-ready pcbs.

#define DC_F_1 23 // PWM1 for front motor
#define DC_F_2 22 // PWM2 for front motor

#define DC_B_1 21 // PWM1 for back motor
#define DC_B_2 20 // PWM2 for back motor
#define LED 13
#define EN_MOT 4

void setup()
{
  Serial.begin(9600);
  delay(1000);
  Serial.println("Minimalist SlothBot:");

  pinMode(LED, OUTPUT);
  pinMode(DC_F_1, OUTPUT);
  pinMode(DC_F_2, OUTPUT);
  pinMode(DC_B_1, OUTPUT);
  pinMode(DC_B_2, OUTPUT);
  pinMode(EN_MOT, OUTPUT);

  digitalWrite(EN_MOT, HIGH);
}

void movement(int dir) // 1 forward, -1 backward, 0 to stop
{
  if (dir == 1) // forward
  {
    analogWrite(DC_F_1, 255);
    analogWrite(DC_F_2, 0);
    analogWrite(DC_B_1, 255);
    analogWrite(DC_B_2, 0);
  }
  else if (dir == -1) // backward
  {
    analogWrite(DC_F_1, 0);
    analogWrite(DC_F_2, 255);
    analogWrite(DC_B_1, 0);
    analogWrite(DC_B_2, 255);
  }
  else // hold
  {
    analogWrite(DC_F_1, 0);
    analogWrite(DC_F_2, 0);
    analogWrite(DC_B_1, 0);
    analogWrite(DC_B_2, 0);
  }
}

void loop()
{
  digitalWrite(LED, HIGH);
  // move to front
  Serial.println("HELLO HELLO");
  movement(1);
  Serial.println("WHAT IS GOING ON ");
  delay(60000);

  // stop the robot and sleep for 6hr
  movement(0);
  delay(21600000); // 6 hr

  // back to starting position
  movement(-1);
  delay(60000);

  // stop the robot and sleep for 6hr
  movement(0);
  delay(21600000); // 6 hr

  // move to back
  movement(-1);
  delay(60000);

  // stop the robot and sleep for 6hr
  movement(0);
  delay(21600000); // 6 hr

  // back to starting position
  movement(1);
  delay(60000);

  // stop the robot and sleep for 6hr
  movement(0);
  delay(21600000); // 6 hr
  // NOTE: max delay parameter is 4,294,967,295 milliseconds. That's 1,193 hours or 49.7 days.
}
