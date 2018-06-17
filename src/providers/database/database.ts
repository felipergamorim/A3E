import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'a3e.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['DROP TABLE IF EXISTS escolas ']
      ,['DROP TABLE IF EXISTS classes ']
      ,['DROP TABLE IF EXISTS tipos ']
      ,['DROP TABLE IF EXISTS avaliaveis ']
      ,['DROP TABLE IF EXISTS perguntas ']
      ,['DROP TABLE IF EXISTS respostas ']
      
      ,['CREATE TABLE IF NOT EXISTS escolas (escola_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS classes (classe_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS tipos   (tipo_id   integer primary key AUTOINCREMENT NOT NULL, classe_id integer, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS avaliaveis (avaliavel_id integer primary key AUTOINCREMENT NOT NULL, escola_id integer, classe_id integer, tipo_id integer, nome TEXT, obs TEXT)']
      ,['CREATE TABLE IF NOT EXISTS perguntas (pergunta_id integer primary key AUTOINCREMENT NOT NULL, tipo_id integer, pergunta TEXT)']      
      ,['CREATE TABLE IF NOT EXISTS respostas (resposta_id integer primary key AUTOINCREMENT NOT NULL, avaliavel_id integer, pergunta_id integer, resposta CHAR(1))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));

    
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(*) as qtd from escolas', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
        db.sqlBatch([
          ['insert into escolas (nome) values (?)', ['IFF Campos Centro']]
          ,['insert into escolas (nome) values (?)', ['IFF Guarus']]
          ,['insert into escolas (nome) values (?)', ['IFF Itaperuna']]
          ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de Escolas', e));

    //Criando as classes
    db.executeSql('select COUNT(*) as qtd from classes', {})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
        db.sqlBatch([
          ['insert into classes (classe_id,nome) values (?,?)', [1,'Entorno']],
          ['insert into classes (classe_id,nome) values (?,?)', [2,'Circulação']],
          ['insert into classes (classe_id,nome) values (?,?)', [3,'Acessos e Estacionamento']],
          ['insert into classes (classe_id,nome) values (?,?)', [4,'Ambientes']],
          ['insert into classes (classe_id,nome) values (?,?)', [5,'Informações e Sinalização']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de Classes', e));

    //Criando as tipos
    db.executeSql('select COUNT(*) as qtd from tipos', {})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
        db.sqlBatch([
           ['insert into tipos (tipo_id,nome,classe_id) values (?,?,?)', [1,'Salas de Aula',4]]
          ,['insert into tipos (tipo_id,nome,classe_id) values (?,?,?)', [2,'Laboratorios',4]]
          
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de Classes', e));

    //Criando as Avaliaveis
    db.executeSql('select COUNT(*) as qtd from avaliaveis', {})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
        db.sqlBatch([
          ['insert into avaliaveis (avaliavel_id, escola_id, classe_id, tipo_id, nome, obs) values (?,?,?,?,?,?)', [1,1,4,2,'Lab 01','Obs...']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de Avaliaveis', e));

  }
}