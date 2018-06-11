import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class AvaliavelProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(avaliavel: Avaliavel) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into avaliaveis (nome, obs, escola_id, classe_id, tipo_id) values (?,?,?,?)';
        let data = [avaliavel.nome, avaliavel.obs, avaliavel.escola_id, avaliavel.classe_id, avaliavel.tipo_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(avaliavel: Avaliavel) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update avaliaveis set nome = ?, obs = ?, escola_id = ?, classe_id = ?, tipo_id = ? where avaliavel_id = ?';
        let data = [avaliavel.nome, avaliavel.obs,  avaliavel.escola_id, avaliavel.classe_id, avaliavel.tipo_id, avaliavel.avaliavel_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(avaliavel_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from avaliaveis where avaliavel_id = ?';
        let data = [avaliavel_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(avaliavel_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from avaliaveis where avaliavel_id = ?';
        let data = [avaliavel_id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let avaliavel = new Avaliavel();
              avaliavel.avaliavel_id = item.avaliavel_id;
              avaliavel.nome = item.nome;
              avaliavel.obs  = item.obs;
              avaliavel.escola_id = item.escola_id;
              avaliavel.classe_id = item.classe_id;
              avaliavel.tipo_id = item.tipo_id;

              return avaliavel;
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
        let sql = 'SELECT * FROM avaliaveis where 1=1' ;
        var data: any[];

        // filtrando pelo nome
        if (nome) {
          sql += ' and nome like ?'
          data.push('%' + nome + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let avaliaveis: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var avaliavel = data.rows.item(i);
                avaliaveis.push(avaliavel);
              }
              return avaliaveis;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Avaliavel {
  avaliavel_id: number;
  escola_id: number;
  classe_id: number;
  tipo_id: number;
  nome: string;
  obs: string;
}