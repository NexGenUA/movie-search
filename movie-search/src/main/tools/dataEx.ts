interface ISubscriber {
  dataChanged: (data: any[]) => void;
}

class DataEx {
  subscribes: object[] = [];

  data: any[] = [];

  subscribe(target: ISubscriber): void {
    this.subscribes.push(target);
  }

  send(d: any[], count: string, searchPhrase: string): void {
    this.data = [d, count, searchPhrase];
    this.info();
  }

  info(): void {
    this.subscribes.forEach((subscriber: ISubscriber) => {
      subscriber.dataChanged(this.data);
    });
  }
}

export const dataEx = new DataEx();
