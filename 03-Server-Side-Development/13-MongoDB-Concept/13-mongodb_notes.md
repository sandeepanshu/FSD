# SQL vs NoSQL (MongoDB) — Complete Notes

## SQL - NoSQL
### RDBMS (SQL)
- Oracle  
- MySQL  
- SQL Server  
- DB2  

### NO-SQL
- MongoDB  
- Firebase  
- CouchDB  
- Object Database  

---

## SQL vs MongoDB Comparison

| SQL (Oracle) | NoSQL (MongoDB) |
|--------------|------------------|
| Database     | Database         |
| Tables       | Collections (Array of Objects) |
| Rows         | Documents (Objects) |
| Columns      | Fields (Properties) |

---

## MongoDB Installation (Local / Cloud)

### Common Issues & Solutions

#### ❌ 1. `'mongo' is not recognized as an internal or external command`
**Solution:**  
Set the MongoDB `bin` path in system environment variables.

#### ❌ 2. "Connection Failed" (MongoDB Server Down)
**Solution:**  
Start the MongoDB server manually:
```
Ctrl + R → services.msc → MongoDB Server → Start
```

---

# Full Stack Developer Essentials

## CRUD Operations With Any Database
- **C** – Create  
- **R** – Read  
- **U** – Update  
- **D** – Delete  

---

## Two Ways to Work With Databases
### 1️⃣ Command Line (Mongo Shell)
- Used for **testing** or **static data**

### 2️⃣ Application Layer (Node.js + Mongoose)
- Used for **real-world** dynamic applications

---

# MongoDB Shell CRUD (Command Line)

### Database
```
use hcl_db
```

### Create a collection
```
db.createCollection('employee')
show collections
```

---

# INSERT / CREATE

### Insert One
```js
db.employee.insertOne({
  name: 'Rajan',
  age: 25,
  designation: 'Software Engineer',
  location: 'Bangalore'
});
```

### Insert Another
```js
db.employee.insertOne({
  name: 'Mahesh',
  age: 28,
  designation: 'Sr.Software Engineer',
  location: 'Bangalore'
});
```

### Insert Many
```js
db.employee.insertMany([
  {
    name: 'John',
    age: 40,
    designation: 'Project Manager',
    location: 'Hyderabad'
  },
  {
    name: 'Wilson',
    age: 45,
    designation: 'Sr.Project Manager',
    location: 'Hyderabad'
  }
]);
```

---

# READ Operations

```js
db.employee.find()                // SELECT * FROM EMPLOYEE
db.employee.find().pretty()
db.employee.find({name: 'Rajan'}) // WHERE name = 'Rajan'
db.employee.find({_id: ObjectId("602683dc2398238d2bcdccc8")})
```

---

# UPDATE Operation
```js
db.employee.updateOne(
  { name: 'Mahesh' },
  {
    $set: {
      age: 30,
      designation: 'TechLead'
    }
  }
);
```

---

# DELETE Operation
```js
db.employee.deleteOne({ name: 'Wilson' });
```

---

## MongoDB Compass
Download → Extract ZIP → Install

---

## Local MongoDB URL
```
mongodb://127.0.0.1:27017
```

---

# End of Notes
