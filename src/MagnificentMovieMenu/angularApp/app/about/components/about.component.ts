//tslint:disable
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-component',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  message: string;
  message2: string;

  constructor() {
    this.message =
      'This project has been a fun and challenging exploration of the ASP.NET Web Api backend, alongside an Angular frontend framework, with data housed in a MySQL database and altogether compiled by Webpack. My programming background comes from the "NERP" stack (Node, Express, React/Redux, PostgreSQL). I\'m excited to have reinforced my fullstack programming knowledge, especially for handling REST-ful code in C# and TypeScript, and learning to deploy via Azure.';
    this.message2 = "What's next? Here are my ideas:";
  }
}
//tslint:enable
