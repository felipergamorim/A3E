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
      ['CREATE TABLE IF NOT EXISTS escolas (escola_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS classes (classe_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS tipos   (tipo_id   integer primary key AUTOINCREMENT NOT NULL, classe_id integer, nome TEXT)']
      ,['CREATE TABLE IF NOT EXISTS avaliaveis (avaliavel_id integer primary key AUTOINCREMENT NOT NULL, escola_id integer, classe_id integer, tipo_id integer, identificacao TEXT, obs TEXT)']
      ,['CREATE TABLE IF NOT EXISTS perguntas (pergunta_id integer primary key AUTOINCREMENT NOT NULL, tipo_id integer, pergunta TEXT)']      
      ,['CREATE TABLE IF NOT EXISTS respostas (resposta_id integer primary key AUTOINCREMENT NOT NULL, avaliavel_id integer, pergunta_id integer, resposta CHAR(1))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));

    // Criando as chaves estrangeiras
    db.sqlBatch([
      ['ALTER TABLE tipos ADD FOREIGN KEY(classe_id) REFERENCES classes(classe_id)']
      ,['ALTER TABLE avaliaveis ADD FOREIGN KEY(escola_id) REFERENCES escolas(escola_id)']
      ,['ALTER TABLE avaliaveis ADD FOREIGN KEY(classe_id) REFERENCES classes(classe_id)']
      ,['ALTER TABLE avaliaveis ADD FOREIGN KEY(tipo_id) REFERENCES tipos(tipo_id)']
      ,['ALTER TABLE perguntas ADD FOREIGN KEY(tipo_id) REFERENCES tipos(tipo_id)']
      ,['ALTER TABLE respostas ADD FOREIGN KEY(pergunta_id) REFERENCES perguntas(pergunta_id)']
      ,['ALTER TABLE respostas ADD FOREIGN KEY(avaliavel_id) REFERENCES avaliaveis(avaliavel_id)']
    ])
      .then(() => console.log('Chaves Estrangeiras criadas'))
      .catch(e => console.error('Erro ao criar as chaves estrangeiras', e));
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
  }
}