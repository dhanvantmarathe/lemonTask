import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../env';
@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {
  menuData: any[] = [];
  rootElements: any[] = [];
  selectedNode: any = null;

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.http.get('http://49.249.110.2:8050/api/MenuMasters/GetMenuMasterList/173')
  //     .subscribe((data: any) => {
  //       this.menuData = data;
  //       console.log(this.menuData);
  //       if (Array.isArray(this.menuData)) {
  //         this.rootElements = this.menuData.filter((item: any) => !item.refMenuId);
  //       } else {
  //         console.error('Unexpected response format:', this.menuData);
  //       }
        
  //       this.rootElements = this.menuData.filter((item: any) => !item.refMenuId); // Root elements have no parent
  //     });
  // }

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/MenuMasters/GetMenuMasterList/173`)
    .subscribe((response: any) => {
      console.log(response); // Inspect the structure of the response
      this.menuData = response.data; // Adjust according to actual response structure
      
      if (Array.isArray(this.menuData)) {
        this.rootElements = this.menuData.filter((item: any) => !item.refMenuId);
      } else {
        console.error('Unexpected response format:', this.menuData);
      }
    });
  
  }
 


  onRowClick(node: any): void {
    this.selectedNode = node;
    // Find all child elements
    this.selectedNode.children = this.menuData.filter(item => item.refMenuId === node.id);
  }

  closePopup(): void {
    this.selectedNode = null;
  }
}
