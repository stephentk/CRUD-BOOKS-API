import client from "../database";

export type Weapon = {
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    await client.connect();
    const sql = "select * from mythical_weapons";
    const res = await client.query(sql);
    return res.rows;
  }
  async create(weapon: Weapon) {
    await client.connect();
    const text =
      "insert into mythical_weapons(name,type,weight) values($1,$2,$3) returning *";
    const values = [weapon.name, weapon.type, weapon.weight];
    const res = await client.query(text, values);
    console.log(res.rows[0]);
    return res.rows[0];
  }
}
