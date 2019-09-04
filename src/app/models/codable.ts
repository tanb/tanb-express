// Experimental
export class Codable {
  codingKeys?: { [ key: string]: string };

  static decode<T extends typeof Codable>(this: T, data: object): InstanceType<T> {
    const instance = new this();
    const codingKeys = instance.codingKeys;
    if (codingKeys) {
      Object.keys(codingKeys).forEach(prop => {
        instance[prop] = data[codingKeys[prop]];
      });
      return instance as InstanceType<T>;
    } else {
      return Object.assign(instance, data) as InstanceType<T>;
    }
  }

  encode(): object {
    const data = {};
    let propaties = [];
    if (this.codingKeys) {
      propaties = Object.keys(this.codingKeys);
    } else {
      propaties = [].concat(Object.keys(this), Object.keys(this.constructor.prototype));
    }
    const convert = (value: any): any => {
      if (value instanceof Codable) {
        return value.encode();
      } else {
        return value;
      }
    };
    propaties.forEach(prop => {
      const value = this[prop];
      if (this.codingKeys) {
        prop = this.codingKeys[prop];
      }
      if (Array.isArray(value)) {
        data[prop] = value.map(v => convert(v));
      } else {
        data[prop] = convert(value);
      }
    });
    return data;
  }
}

export function Type<T extends typeof Codable>(cls: T) {
  let value: InstanceType<T> | InstanceType<T>[];
  const convert = (newValue: any): InstanceType<T> => {
    if (newValue instanceof cls) {
      return newValue as InstanceType<T>;
    } else {
      return cls.decode(newValue);
    }
  };
  return (target: any, propertyKey: any) => {
    const update = Reflect.defineProperty(
      target,
      propertyKey,
      {
        configurable: true,
        enumerable: true,
        get: () => {
          return value;
        },
        set: (newValue: any) => {
          if (Array.isArray(newValue)) {
            value = newValue.map(v => convert(v));
          } else {
            value = convert(newValue);
          }
        }
      },
    );
    if (!update) {
      throw new Error('Unable to update property');
    }
  };
}



// Example
const responseJson: JSON = JSON.parse(`
{
    "profile": {
      "first_name": "John",
      "last_name": "Apple",
      "lisences": [
        {
          "name": "driver",
          "acquisition_date": "2019-02-10",
          "expiration_date": "2022-02-10"
        },
        {
          "name": "Apple Developer Program",
          "acquisition_date": "2019-01-01",
          "expiration_date": "2020-01-01"
        }
      ]
    },
    "state": 1,
    "email": "apple@example.com"
}`);

class Lisence extends Codable {
  name!: string;
  acquisitionDate!: string;
  expirationDate!: string;
  codingKeys = {
    name: "name",
    acquisitionDate: "acquisition_date",
    expirationDate: "expiration_date"
  };
}

class Profile extends Codable {
  firstName!: string;
  lastName!: string;
  @Type(Lisence)
  lisences!: Lisence[];
  codingKeys = {
    firstName: "first_name",
    lastName: "last_name",
    lisences: "lisences"
  }

  fullname() {
    return `${this.lastName} ${this.firstName}`;
  }
}

class User extends Codable {
  email!: string;
  state!: number;
  @Type(Profile)
  profile!: Profile;

  get goodState() {
    return this.state === 1;
  }
}

const user = User.decode(responseJson);
const json = JSON.stringify(user.encode())
const me = User.decode(JSON.parse(json));
console.log(me);
console.log(me.profile);
console.log(me.profile.lisences);
console.log(me.encode());
