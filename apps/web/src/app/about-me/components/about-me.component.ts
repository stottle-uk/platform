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
    My current employment is architecting and writing the front-end for 
    a content sharing subscription platform with messaging chat. 
    In previous roles I have contributed to a microservices solution written 
    in C# and node.js for a quoting engine on a comparison site and a content 
    distribution service for label packaging images and data for FMCG's.
  </p>
  <h4>Languages</h4>
  <ul>
    <li>JavaScript (ECMAScript 6)</li>
    <li>Typescript 3</li>
    <li>C# 6</li>
  </ul>
  <h4>Frameworks</h4>
  <ul>
    <li>Angular 6</li>
    <li>.Net Core 2</li>
    <li>.Net Framework</li>
  </ul>
  <h4>Storage</h4>
  <ul>
    <li>CosmosDb</li>
    <li>MongoDb</li>
    <li>T-SQL</li>
  </ul>
  <h4>Technologies</h4>
  <ul>
    <li>Azure</li>
    <li>AWS</li>
    <li>Docker</li>
  </ul>
  <h4>Languages</h4>
  <ul>
    <li>English (Native speaker)</li>
    <li>Brazilian Portuguese (intermediate)</li>
  </ul>
  <h3>Employemnt History</h3>
  `,
  styles: []
})
export class AboutMeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
