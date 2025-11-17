interface Mobile {
  brand: string;
  color: string;
  price: number;
}

let mobile: Mobile = {
  brand: "Apple",
  color: "Silver",
  price: 35000,
};
console.log(mobile);
console.log(mobile.brand);

// Nested Object
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Student {
  name: string;
  age: number;
  course: string;
  address: Address;
}

let student: Student = {
  name: "Kabir Singh",
  age: 24,
  course: "MBBS",
  address: {
    street: "Road No 10, New Delhi",
    city: "Delhi",
    state: "DL",
    country: "India",
  },
};
console.log(`STREET : ${student.address.street}
             CITY : ${student.address.city} 
             STATE : ${student.address.state} 
             COUNTRY : ${student.address.country}`);

// ES6 Feature :  Destructuring
let { street, city, state, country } = student.address;
console.log(`STREET : ${street}
             CITY : ${city} 
             STATE : ${state} 
             COUNTRY : ${country}`);

// ES 6 Feature : Spread Operator (...)
// merge multiple objects / properties

interface Product {
  sno: string;
  name: string;
  color: string;
  price: number;
  qty: number;
}

let product: Product = {
  sno: "AA102",
  name: "Mi Watch",
  color: "black",
  price: 1520,
  qty: 20,
};

let newProduct: any = {
  ...product,
  sales: 1400,
};
console.log(newProduct);
