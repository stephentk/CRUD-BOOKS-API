import bcrypt from "bcrypt";
import client from "../database"

export type User = {
    username: string,
    password: string
}
const pepper = process.env.BCRYPT_PASSWORD
export class userstore {
    async create(user:User): Promise<User> {
        const conn = await client.connect();
       
        const sql = 'insert into users (username,password_digest) values ($1,$2) returning *';
        const hash = bcrypt.hashSync(user.password + pepper,parseInt('10'))
        const result = conn.query(sql,[user.username,hash]);
        conn.release()
        return (await result).rows[0]

    }

    async index(): Promise<User[]> {
      await client.connect();
      const sql = "select * from users";
      const res = await client.query(sql);
      return res.rows;
    }
    async show(id: string): Promise<User> {
      const sql = "select * from users where id=($1) ";
      const conn = await client.connect();
      const result = await client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    }


    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect(); 
        const sql = 'SELECT password_digest FROM users where username = ($1)';
        const result =  await conn.query(sql, [username]);
        if (result.rows.length){
          const user = result.rows[0];
          if(bcrypt.compareSync(password+pepper, user.password_digest)){
            return user
          }
        }
        return null;
      }
      
}