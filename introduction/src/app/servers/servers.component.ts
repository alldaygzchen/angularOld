import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-servers',//element
  // selector: '[app-servers]',//attribute
  selector: '.app-servers', //class
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css',
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created';
  serverName = '';
  serverCreated = false;
  servers: string[] = ['testserver1', 'testserver2'];

  constructor() {
    console.log('constructor');
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  // onUpdateServerName(event: any) {
  //   // console.log(event);
  //   this.serverName = (event.target as HTMLInputElement).value;
  //   // this.serverName = event.target.value;
  // }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'server created. Name is ' + this.serverName;
  }
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
