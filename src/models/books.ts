import client from "../database";
export type Book = {
  title: string;

  total_pages: number;
  author: string;
  type: string;
  summary: Text;
};

export class BookStore {
  async index(): Promise<Book[]> {
    const conn = await client.connect();
    const sql = "select * from books";
    const result = conn.query(sql);
    conn.release();
    return (await result).rows;
  }

  async show(id: string): Promise<Book> {
    const sql = "select * from books where id=($1)";
    const conn = await client.connect();
    const result = await client.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  async create(B: Book): Promise<Book> {
    const sql =
      "insert into books (title,total_pages,author,type,summary) values ($1,$2,$3,$4,$5) returning *";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      B.title,
      B.total_pages,
      B.author,

      B.type,
      B.summary,
    ]);
    const book = result.rows[0];
    conn.release();
    return book;
  }

  async delete(id: string): Promise<Book> {
    const sql = "delete from books where id = ($1) returning *";
    const conn = await client.connect();
    const result = await client.query(sql, [id]);
    conn.release();
    const book = result.rows[0];
    return book;
  }

  async update(id: string, title: string, author: string): Promise<Book> {
    const sql =
      "update books set title = ($1),author= ($2) where id =($3) returning *";
    const conn = await client.connect();
    const result = await client.query(sql, [title, author, id]);
    const book = result.rows[0];
    conn.release();
    return book;
  }
}
