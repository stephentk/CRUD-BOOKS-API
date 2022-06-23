# A simple book API

A-simple-book-API allows you to GET books from a library database, POST a new book to the database, PUT(edit) any book in the database, and lastly DELETE

## Bootstrapped with
1. [PostgreSQL](https://www.postgresql.org/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Node](https://nodejs.org/en/)
4. [ExpressJs](https://expressjs.com/)
5. [eslint linter](https://eslint.org/)
6. [Prettier code formatter](https://prettier.io/)

## Getting started
```
$ git clone https://github.com/stephentk/CRUD-BOOKS-API.git
$ npm install
$ npm run watch
```
If you want to contribute, before any of the steps above, you would need to __fork__ this project first.
You're ready to hack (and | or contribute) ✌️

## Endpoints
1. GET /books
> returns an array of the books object in the database
2. POST /books
> saves new book to the database and returns the book object
> Request should be made in the format below👇
```
{
  "title": " strong",
  "author": "stephen kofoworola",
  "total_pages": 510,
  "category": "non-fiction, auto-biography",
  "summary": "Determination"
}
```
3. PUT /books/:id
> Edit the details of the book with requested id. 
4. DELETE /students/:id
> deletes the book with the requested id from the database. Returns same book object
5. GET /students/:id
> returns an object of the book that matches the requested id


##  Contributing
Contributions, issues and feature requests are welcome!

## Author
STEPHEN KOFOWOROLA
- Github: [@stephentk](https://github.com/stephentk/)
- LinkedIn: [Stephen Kofoworola]()

