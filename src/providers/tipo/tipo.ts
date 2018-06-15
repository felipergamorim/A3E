import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class TipoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(tipo: Tipo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into tipos (nome,classe_id) values (?,?)';
        let data = [tipo.nome,tipo.classe_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(tipo: Tipo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update tipos set nome = ?, classe_id = ? where tipo_id = ?';
        let data = [tipo.nome, tipo.classe_id, tipo.tipo_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(tipo_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from tipos where tipo_id = ?';
        let data = [tipo_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(tipo_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from tipos where tipo_id = ?';
        let data = [tipo_id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let tipo = new Tipo();
              tipo.tipo_id = item.tipo_id;
              tipo.nome = item.nome;
              tipo.classe_id = item.classe_id;

              return tipo;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(nomeClasse: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT t.* FROM tipos t, classes c where t.classe_id = c.classe_id ' ;
        var data: any[];

        // filtrando pelo nome
        if (nomeClasse) {
          sql += ' and  c.nome like ?)'
          data.push('%' + nomeClasse + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let tipos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var tipo = data.rows.item(i);
                tipos.push(tipo);
              }
              return tipos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Tipo {
  tipo_id: number;
  nome: string;
  classe_id: number;
}