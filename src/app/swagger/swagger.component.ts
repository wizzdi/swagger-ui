import { AfterViewInit, Component, ElementRef } from "@angular/core";

import SwaggerUI from "swagger-ui";
import SwaggetUIBundle from "swagger-ui";
import { Router } from "@angular/router";
declare var $: any;
import { environment } from "../../environments/environment";

@Component({
  selector: "app-swagger",
  templateUrl: "./swagger.component.html",
  styles: [],
})
export class SwaggerComponent implements AfterViewInit {
  key;
  allText = false;
  constructor(private el: ElementRef, private router: Router) {
  }

  checkAuthKey() {
    let me = this;
    let domNode = document.getElementsByTagName("input");
    $(
      "input[placeholder='authenticationKey - The AuthenticationKey retrieved when sign-in into the system']"
    ).each(function () {
      if (!$(this).val()) {
        $(this).val(me.key);
      }
    });
  }

  async ngAfterViewInit() {
    this.key = localStorage.getItem("authenticationkey");
    if (this.key) {
      let url = environment.SWAGGER_URL + this.key;
      const ui = SwaggetUIBundle({
        url: url,
        domNode: this.el.nativeElement.querySelector(".swagger-container"),
        deepLinking: false,
        filter: true,
        docExpansion: "none",
        presets: [SwaggerUI.presets.apis],
        plugins: [this.AdvancedFilterPlugin],
        sorter: "alpha",
        apisSorter: "alpha",
        tagsSorter: "alpha",
        parameterMacro: (operation, parameter) => {
          return this.key;
        },
      });
      console.log('UI',ui);
      const ss = setInterval(() => {
        const t = document.querySelectorAll(
          "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(3) > div.filter-container > section"
        );

        if (t.length > 0) {
          this.createBtns();
          clearInterval(ss);
        }
      }, 100);
    } else {
      this.router.navigate([""]);
    }
  }

  AdvancedFilterPlugin = function (system) {
    let me = this;
    return {
      fn: {
        opsFilter: function (taggedOps, phrase) {
          const sa = document.getElementById("ss");
          const tagOnly = sa.getAttribute("value");
          phrase = phrase.toLowerCase();
          const normalTaggedOps = JSON.parse(JSON.stringify(taggedOps));
          for (const tagObj in normalTaggedOps) {
            let operations = normalTaggedOps[tagObj].operations;
            const i = operations.length;
            if (tagOnly == "false") {
              if (i > 0) {
                let contains = false;
                operations.forEach((el, index) => {
                  if (
                    (el.operation &&
                      el.operation.summary &&
                      el.operation.summary.toLowerCase().indexOf(phrase) !==
                        -1) ||
                    (el.operation.description &&
                      el.operation.description.toLowerCase().indexOf(phrase) !==
                        -1) ||
                    (el.operation.operationId &&
                      el.operation.operationId.toLowerCase().indexOf(phrase) !==
                        -1) ||
                    el.path.toLowerCase().indexOf(phrase) !== -1 ||
                    el.method.toLowerCase().indexOf(phrase) !== -1
                  ) {
                    contains = true;
                    el.contains = true;
                  }else {
                    el.contains = false;
                  }
                  if (index === i - 1 && contains !== true) {
                    delete normalTaggedOps[tagObj];
                  }
                });
               if(normalTaggedOps[tagObj]) {
                operations = operations.filter(el => el.contains === true);
                normalTaggedOps[tagObj].operations = operations;
               }
              } else {
                delete normalTaggedOps[tagObj];
              }
              operations = operations.filter(el => el.contains === true);
            } else {
              if (tagObj.toLocaleLowerCase().indexOf(phrase) < 0) {
                delete normalTaggedOps[tagObj];
              }
            }
          }
          return system.Im.fromJS(normalTaggedOps);
        },
      },
    };
  };

  async createBtns() {
    const section = document.querySelectorAll(
      "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(3) > div.filter-container > section"
    );
    const input = document.querySelectorAll(
      "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(3) > div.filter-container > section > input"
    );
    const x = document.createElement("DIV");
    const y = document.createElement("DIV");
    const dd = document.createElement("DIV");
    const i = document.createElement("INPUT");
    const l = document.createElement("LABEL");
    l.setAttribute("for", i.id);
    l.innerText = "Tag Only";
    i.setAttribute("name", "search");
    i.setAttribute("type", "radio");
    i.setAttribute("id", "ss");
    i.setAttribute("checked", "true");
    i.setAttribute("value", "true");
    i.addEventListener("click", () => {
      this.allText = false;
      i.setAttribute("value", "true");
      a.setAttribute("value", "false");
      input.item(0).setAttribute("placeholder", "Filter by tag");
    });
    const a = document.createElement("INPUT");
    const b = document.createElement("LABEL");
    b.setAttribute("for", b.id);
    b.innerText = "All Text";
    a.setAttribute("type", "radio");
    a.setAttribute("name", "search");
    a.setAttribute("id", "sa");
    a.addEventListener("click", () => {
      i.setAttribute("value", "false");
      a.setAttribute("value", "true");
      input.item(0).setAttribute("placeholder", "Filter by text");
    });

    x.appendChild(i);
    x.appendChild(l);

    y.appendChild(a);
    y.appendChild(b);

    dd.appendChild(x);
    dd.appendChild(y);

    section.item(0).insertBefore(dd, section.item(0).childNodes[0]);
    const info = document.querySelectorAll(
      "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(1) > section > div:nth-child(1) > div:nth-child(1) > hgroup > h2"
    );
    const img = document.createElement("IMG");
    // const div = document.createElement("DIV");

      img.setAttribute('src', environment.LOGO_SRC);
      img.className = "logo";
      // div.appendChild(img);
      info.item(0).insertBefore(img, info.item(0).childNodes[0]);
      const support = document.querySelectorAll(
        "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(1) > section > div > div  > div:nth-child(4) > div > a"
      );
      support.item(0).innerHTML = 'support.wizzdi.com';
      support.item(0).setAttribute('href', 'http://support.wizzdi.com');
      const site = document.querySelectorAll(
        "body > app-root > app-swagger > div > div > div:nth-child(2) > div:nth-child(1) > section > div > div  > a "
      );
      site.item(0).setAttribute('href','http://wizzdi.com');
      site.item(0).innerHTML = "wizzdi.com"
      console.log('ADD', site);

  }
}
