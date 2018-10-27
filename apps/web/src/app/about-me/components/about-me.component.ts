import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stottle-about-me',
  template: `
  <h2>Stuart Tottle</h2>
  <h3>Software Engineer</h3>
  <p>
    I am blah...
  </p>
  <h3>What I do</h3>
  <p>
    My most recent experience is creating the front end for fanclub.com, 
    a content sharing subscription platform with messaging chat.
  </p>
  <h4>Languages</h4>
  <ul>
    <li>JavaScript (ECMAScript 6)</li>
    <li>Typescript 3</li>
    <li>C# 6</li>
  </ul>
  <h4>Frameworks</h4>
  <ul>
    <li>JavaScript (ECMAScript 6)</li>
    <li>Typescript 3</li>
    <li>C# 6</li>
  </ul>
  <h4>Technologies</h4>
  <ul>
    <li>JavaScript (ECMAScript 6)</li>
    <li>Typescript 3</li>
    <li>C# 6</li>
  </ul>
  <h3>Emplyemnt History</h3>

  `,
  styles: []
})
export class AboutMeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
