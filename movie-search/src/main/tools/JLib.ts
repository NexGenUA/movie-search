class JLib {
  nativeElement: HTMLElement;
  eventName: string;
  eventFunc: () => void;
  isElement: boolean;

  constructor(el) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    this.nativeElement = el;
    this.isElement = true;
  }

  on(eventName: string, func: () => void, context: object = null): object {
    this.eventName = eventName;
    this.eventFunc = func.bind(this);
    if (!!context) {
      this.eventFunc = func.bind(context);
    }
    this.nativeElement.addEventListener(eventName, this.eventFunc);
    return this;
  }

  off(): void {
    this.nativeElement.removeEventListener(this.eventName, this.eventFunc);
  }

  css(styles: object): object {
    if (!!styles) {
      return this.nativeElement.style;
    }
    Object.keys(styles).forEach(key => {
      this.nativeElement.style[key] = styles[key];
    });
    return this
  }

  addClass(className: string): object {
    this.nativeElement.classList.add(className);
    return this;
  }

  removeClass(className: string): object {
    this.nativeElement.classList.remove(className);
    return this;
  }

  hasClass(className: string): object {
    this.nativeElement.classList.contains(className);
    return this;
  }

  html(html: string): object {
    this.nativeElement.innerHTML = html;
    return this;
  }

  append(node): object {
    if(this.isElement) node = node.nativeElement;
    this.nativeElement.append(node);
    return this;
  }

  parent(): HTMLElement {
    return $(this.nativeElement.parentNode);
  }

  attr(attrName: string, value: string = null): object | string {
    if (!!value) {
      return this.nativeElement.getAttribute(attrName)
    }
    this.nativeElement.setAttribute(attrName, value);
    return this;
  }

  val(): string {
    return (<HTMLInputElement>this.nativeElement).value;
  }

  clear(): void {
    (<HTMLInputElement>this.nativeElement).value = '';
  }
}

export function $(selector: Node | string): any {
  return new JLib(selector);
}
