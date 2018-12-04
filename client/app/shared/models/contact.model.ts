export class Contact{
    name: string;
    nickName: string;
    email: string;
    phones: Array<Number>;
    website: string;
    birthDate: Date;
    address: {
        village: string;
        district: string;
    }
}