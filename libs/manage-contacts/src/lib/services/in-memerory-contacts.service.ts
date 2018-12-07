import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryContactsService implements InMemoryDbService {
  createDb() {
    let contacts = [
      {
        id: 1,
        name: 'Lindsay Burch',
        street: 'Ashfield Acres',
        email: 'burchbaby@msn.com',
        phone: '(721) 288-9108',
        age: 24
      },
      {
        id: 2,
        name: 'Lyra Costa',
        street: 'Cowley Brae',
        email: 'costabomb@outlook.com',
        phone: '(575) 753-2901',
        age: 18
      },
      {
        id: 3,
        name: 'Caris Guerrero',
        street: 'Pitchway Avenue',
        email: 'cg84@gmail.com',
        phone: '(874) 279-9192',
        age: 56
      },
      {
        id: 4,
        name: 'Lacy Moyer',
        street: 'Royston Piece',
        email: 'jixugle@icloud.com',
        phone: '(341) 659-0931',
        age: 33
      },
      {
        id: 5,
        name: 'Lili Greenaway',
        street: 'Brighton Alley',
        email: 'lililili@yahoo.ca',
        phone: '(693) 609-2328',
        age: 62
      },
      {
        id: 6,
        name: 'Kadeem Pemberton',
        street: 'Ladywell Hill',
        email: 'kdpbt@msn.com',
        phone: '(531) 739-6589',
        age: 94
      },
      {
        id: 7,
        name: 'Chace Fellows',
        street: 'Century Meadows',
        email: 'moinefou@verizon.net',
        phone: '(987) 811-4594',
        age: 29
      },
      {
        id: 8,
        name: 'Eryn Salter',
        street: 'Noble Paddocks',
        email: 'esalter@comcast.net',
        phone: '(226) 905-3410',
        age: 45
      },
      {
        id: 9,
        name: 'Ariyan Hartley',
        street: 'Crawston Place',
        email: 'ariyanh@optonline.net',
        phone: '(906) 991-4278',
        age: 30
      },
      {
        id: 10,
        name: 'Nicole Mccaffrey',
        street: 'Walpole Limes',
        email: 'nic@caffrey.com',
        phone: '(678) 760-2090',
        age: 61
      }
    ];
    return { contacts };
  }
}
