#include <Servo.h> 
 
String inputString = "";

Servo servo0;
Servo servo1;                
 
int pos = 0; 

int positionX = 60;
int positionY = 60;

void setup() 
{ 
  
  Serial.begin(9600);
  
  servo0.attach(6); 
  servo1.attach(5);
  
} 
 
void loop() 
{ 
  
  servo0.write(positionX);
  servo1.write(positionY);
  
//  char tmp[3];
//  Serial.readBytesUntil('x', tmp, 3);
//  int tempX = String(tmp).toInt();
//  if(tempX>0){
//    positionX = String(tmp).toInt();
//  }
// 
//  char tmp2[3];
//  Serial.readBytesUntil('y', tmp2, 3);
//  int tempY = String(tmp2).toInt();
//  if(tempY>0){
//    positionY = String(tmp2).toInt();
//  }
  
//  Serial.print(positionX,DEC);
//  Serial.print(',');
//  Serial.println(positionY,DEC);
  
  // parse the string for an instruction
  // A,100,50
  
  
  delay(100);
} 
void serialEvent() {
  
  bool setX = true;
  
  while (Serial.available()) {
    // get the new byte:
    char byt = (char)Serial.read();
    inputString += byt;
  }

  Serial.println(inputString);

  char *p = const_cast<char*>(inputString.c_str());
  char *str;
  
  while ((str = strtok_r(p, ",", &p)) ) {
    Serial.println(str);
    if(setX){
      positionX = String(str).toInt();
    } else {
      positionY = String(str).toInt();
    }
    
    setX = !setX;
    
  }
  p = NULL;
  inputString = "";
  
}

/*


#include <string.h>

char sz[] = "3500,270,890,70,4";
void setup()
{
char *p = sz;
char *str;
Serial.begin(115200);
while ((str = strtok_r(p, ",", &p)) != "\n") // delimiter is the semicolon
  Serial.println(str);
}

void loop(){}


*/

