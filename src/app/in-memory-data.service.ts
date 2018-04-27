import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const realestate = {
      id: 0,
      name: '红育坡一号',
      location: '重庆市九龙坡区石桥铺红育坡一号',
      price: 1,
      customerComments: [
        {
          customer: '哥',
          comment: [
            '好地方。',
            '我家就在那儿。'
          ]
        },
        {
          customer: '饼',
          comment: [
            '中学就在那里读的。',
            '开车不方便。'
          ]
        }
      ],
      description: [
        '学区房',
        '安全，交通便利'
      ],
      pictures: [
        'https://drive.google.com/file/d/0ByCk50g1mZxcUThrUE5GN09nMVZmSi1HR3pOQVlEaVNPVW00/view?usp=sharing',
        'https://drive.google.com/file/d/0ByCk50g1mZxcRnhyVnNVbDBHX3NTVFQ5Mnl5aHJtbkJ5eTcw/view?usp=sharing'
      ],
      relatedRealestates: [0],
      developer: '三设计院',
      investor: '教委',
      propertyManagementCompany: '外语学校'
    };
    return {realestate};
  }
}
