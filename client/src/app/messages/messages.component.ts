import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { PaginationParams } from '../_models/PaginationParams';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = "Unread";
  pagParams: PaginationParams = new PaginationParams();
  loading = false;

  constructor(private messageService: MessageService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pagParams, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    });
  }

  deleteMessage(id: number) {
    this.confirmService.confirm("Confirm delete message", "This cannot be undone").subscribe({
      next: result => {
        if(result){
          this.messageService.deleteMessage(id).subscribe({
            next: () => {
              this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
            }
          })
        }
      }
    })
    
  }

  pageChanged(event: any) {
    if (this.pagParams.pageNumber !== event.page) {
      this.pagParams.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
