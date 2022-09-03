import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloWorldService {
  helloWorld() {
    return "Hello World";
  }
}
