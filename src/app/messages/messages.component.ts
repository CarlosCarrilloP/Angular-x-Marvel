import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public messageService: MessageService) { }

}