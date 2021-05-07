#include "motors.h"



#define DC_F_1 23 // PWM1 for front motor
#define DC_F_2 22 // PWM2 for front motor

#define DC_B_1 21 // PWM1 for back motor
#define DC_B_2 20 // PWM2 for back motor
#define LED 13
#define EN_MOT 4

int motors_state = -1;

/** State Bank
   -1: Uninitialized 
   -2: Failed to initialize
   
   0: Functional
   1: Disabled
*/


void motors_setup(){
  pinMode(LED, OUTPUT);
  pinMode(DC_F_1, OUTPUT);
  pinMode(DC_F_2, OUTPUT);
  pinMode(DC_B_1, OUTPUT);
  pinMode(DC_B_2, OUTPUT);
  pinMode(EN_MOT, OUTPUT);
  digitalWrite(EN_MOT, HIGH);
  motors_state = 0;
  Serial.println("Motors initialized successfully");
}

void disable_motor(){
  digitalWrite(EN_MOT, LOW);
  motors_state = 1;
}

void enable_motor(){
  digitalWrite(EN_MOT, HIGH);
  motors_state = 0;
}

void motors_move(int dir) // 1 forward, -1 backward, 0 to stop
{
  if(motors_state < 0) return;
  if(motors_state > 0) {
    Serial.println("Sending command while motors are not enabled. No action will be taken");
  }
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
