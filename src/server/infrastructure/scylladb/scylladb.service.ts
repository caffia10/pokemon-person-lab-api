import { Injectable, OnModuleInit } from '@nestjs/common';
import { ArrayOrObject, Client, QueryOptions, types } from 'cassandra-driver';

// TODO: revisar este servicio para cargar las tablas dinamicas, y reemplazar el console.log
@Injectable()
export class ScyllaDbService implements OnModuleInit {
  private client: Client;
  private keyspace: string = process.env.KEY_SPACE || 'human_space';
  private table: string = 'professors';

  async onModuleInit() {
    this.client = new Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      protocolOptions: { port: 9042 },
    });

    try {
      await this.client.connect();
      console.log('Conectado exitosamente a ScyllaDB');

      await this.createKeyspaceIfNotExists();

      await this.createTableIfNotExists();
    } catch (error) {
      console.error('Error al conectar a ScyllaDB:', error);
    }
  }

  private async createKeyspaceIfNotExists() {
    const query = `
      CREATE KEYSPACE IF NOT EXISTS ${this.keyspace} WITH replication = {
        'class': 'SimpleStrategy',
        'replication_factor': 3
      };
    `;
    try {
      await this.client.execute(query);
      console.log(`Keyspace ${this.keyspace} verificado o creado.`);
    } catch (error) {
      console.error('Error al crear el keyspace:', error);
      throw error;
    }
  }

  private async createTableIfNotExists() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.keyspace}.${this.table} (
        id UUID PRIMARY KEY,
        name TEXT,
        last_name TEXT,
        laboratory_designed TEXT
      );
    `;

    try {
      await this.client.execute(query);
      console.log(`Tabla ${this.table} verificada o creada.`);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
      throw error;
    }
  }

  async execute(
    query: string,
    params?: ArrayOrObject,
    options?: QueryOptions,
  ): Promise<types.ResultSet> {
    try {
      return this.client.execute(query, params, options);
    } catch (error) {
      console.error('Error al ejecutar consulta:', error);
      throw error;
    }
  }
}
