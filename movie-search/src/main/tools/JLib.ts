interface I$ {
  on: () => object
  off: () => void
  css: () => I$
  addClass: (hide: string) => I$
  removeClass: () => I$
  hasClass: () => I$
  append: () => I$
  parent: () => I$
  attr: () => I$
  val: () => void
  clear: () => void
  switchClass: () => I$
}

class JLib {
  nativeElement: HTMLElement;

  eventName: string;

  eventFunc: () => void;

  isElement: boolean;

  constructor(el) {
    let element = el;
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.nativeElement = element;
    this.isElement = true;
  }

  on(eventName: string, func: () => void, context: object = null): object {
    this.eventName = eventName;
    this.eventFunc = func.bind(this);
    if (context) {
      this.eventFunc = func.bind(context);
    }
    this.nativeElement.addEventListener(eventName, this.eventFunc);
    return this;
  }

  off(): void {
    this.nativeElement.removeEventListener(this.eventName, this.eventFunc);
  }

  css(styles: object): object {
    if (styles) {
      return this.nativeElement.style;
    }
    Object.keys(styles).forEach(key => {
      this.nativeElement.style[key] = styles[key];
    });
    return this;
  }

  addClass(className: string): object {
    this.nativeElement.classList.add(className);
    return this;
  }

  removeClass(className: string): object {
    this.nativeElement.classList.remove(className);
    return this;
  }

  hasClass(className: string): boolean {
    return this.nativeElement.classList.contains(className);
  }

  html(html?: string): string | object {
    if (typeof html !== 'undefined') {
      this.nativeElement.innerHTML = html;
      return this;
    }

    return this.nativeElement.innerHTML;
  }

  append(node): object {
    let currentNode = node;
    if (this.isElement) {
      currentNode = currentNode.nativeElement;
    }
    this.nativeElement.append(currentNode);
    return this;
  }

  parent(): I$ {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return $(this.nativeElement.parentNode);
  }

  attr(attrName: string, value: string = null): object | string {
    if (!value) {
      return this.nativeElement.getAttribute(attrName);
    }
    this.nativeElement.setAttribute(attrName, value);
    return this;
  }

  val(value?: string): string | object {
    if (typeof value !== 'undefined') {
      (<HTMLInputElement> this.nativeElement).value = value;
      return this;
    }
    return (<HTMLInputElement> this.nativeElement).value;
  }

  clear(): void {
    (<HTMLInputElement> this.nativeElement).value = '';
  }

  switchClass(className: string): object {
    this.nativeElement.classList.toggle(className);
    return this;
  }

  selStart(): number {
    return (<HTMLInputElement> this.nativeElement).selectionStart;
  }

  selEnd(): number {
    return (<HTMLInputElement> this.nativeElement).selectionEnd;
  }

  setRangeText(value, start, end, selectionMode: any): object {
    (<HTMLInputElement> this.nativeElement).setRangeText(value, start, end, selectionMode);
    return this;
  }

  focus(): object {
    (<HTMLInputElement> this.nativeElement).focus();
    return this;
  }

  hasName(nameValue: string): boolean {
    return (<HTMLInputElement> this.nativeElement).name === nameValue;
  }

  submit() {
    (<HTMLFormElement> this.nativeElement).submit();
    return this;
  }

  trigger(eventName: string): object {
    const event = new Event(eventName, {
      bubbles: true,
      cancelable: true,
    });
    this.nativeElement.dispatchEvent(event);
    return this;
  }
}

export function $(selector: Node | string): any {
  return new JLib(selector);
}
