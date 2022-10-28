import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.adminService.getPhotosForApproval().subscribe({
      next: p => {
        this.photos = p;
      }
    })
  }

  approvePhoto(photoId : number) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: () => {
        this.photos.splice(this.photos.findIndex(p => p.id == photoId), 1);
      }
    })
  }

  rejectPhoto(photoId : number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () => {
        this.photos.splice(this.photos.findIndex(p => p.id == photoId), 1);
      }
    })
  }

}
