import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class EscolaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(escola: Escola) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into escolas (nome) values (?)';
        let data = [escola.nome];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(escola: Escola) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update escolas set nome = ? where escola_id = ?';
        let data = [escola.nome, escola.escola_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(escola_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from escolas where escola_id = ?';
        let data = [escola_id];

        return db.executeSql(sql, data)
          .then(() => console.log('Escola removida'))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(escola_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from escolas where escola_id = ?';
        let data = [escola_id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let escola = new Escola();
              escola.escola_id = item.escola_id;
              escola.nome = item.nome;

              return escola;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT e.* FROM escolas e where 1=1' ;
        var data: any[] = [];

        // filtrando pelo nome
        if (nome) {
          sql += ' and e.nome like ?'
          data.push('%' + nome + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let escolas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var escola = data.rows.item(i);
                escolas.push(escola);
              }
              return escolas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Escola {
  escola_id: number;
  nome: string;
}