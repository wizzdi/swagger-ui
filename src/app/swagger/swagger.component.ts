import { AfterViewInit, Component, ElementRef } from '@angular/core';

import SwaggerUI from 'swagger-ui';
import { Router } from '@angular/router';
declare var $: any;
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styles: []
})
export class SwaggerComponent implements AfterViewInit {
  key;

  constructor(private el: ElementRef, private router: Router) {
    let me = this;
    setInterval(function(){
      me.checkAuthKey();
    },50);
  }
  
  checkAuthKey(){
    let me = this;
    $("input[placeholder='authenticationKey - The AuthenticationKey retrieved when sign-in into the system']").each(function(){
      if(!$(this).val()){
        $(this).val(me.key)
      }
    });
  }

  ngAfterViewInit() {
    this.key = localStorage.getItem('authenticationkey');

    if (this.key) {
      let url =  environment.SWAGGER_URL + this.key;
      //let url = 'http://95.216.154.50:8080/FlexiCore/rest/swagger/extended/swagger.json/' + this.key;
      //let url =  location.origin + '/FlexiCore/rest/swagger/extended/swagger.json/' + key;

      const ui = SwaggerUI({
        url: url,
        domNode: this.el.nativeElement.querySelector('.swagger-container'),
        deepLinking: false,
        presets: [
          SwaggerUI.presets.apis
        ]     
      });
    }
    else {
      this.router.navigate(['']);
    }
  }
}
