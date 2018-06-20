import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ClasseProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(classe: Classe) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into classes (nome) values (?)';
        let data = [classe.nome];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(classe: Classe) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update classes set nome = ? where classe_id = ?';
        let data = [classe.nome, classe.classe_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(classe_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from classes where classe_id = ?';
        let data = [classe_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(classe_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from classes where classe_id = ?';
        let data = [classe_id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let classe = new Classe();
              classe.classe_id = item.classe_id;
              classe.nome = item.nome;

              return classe;
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
        let sql = 'SELECT c.* FROM classes c where 1=1' ;
        var data: any[] = [];

        // filtrando pelo nome
        if (nome) {
          sql += ' and c.nome like ? '
          data.push('%' + nome + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let classes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var classe = data.rows.item(i);
                classes.push(classe);
              }
              return classes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Classe {
  classe_id: number;
  nome: string;
}