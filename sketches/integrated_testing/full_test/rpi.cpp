#include "rpi.h"
#define EN_RPI 2


void rpi_setup(){
  pinMode(EN_RPI, OUTPUT);
}

void rpi_enable(){
  digitalWrite(EN_RPI, HIGH);
}


void rpi_disable(){
  digitalWrite(EN_RPI, LOW);
}
