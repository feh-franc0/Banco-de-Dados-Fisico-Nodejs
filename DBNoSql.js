import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  findById(table, id) {
    if (Array.isArray(this.#database[table])) {
      return this.#database[table].find((item) => item.id === id) || null;
    }
    return null;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, newData) {
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((item) => item.id === id);

      if (index !== -1) {
        this.#database[table][index] = { id, ...newData };
        this.#persist();

        return this.#database[table][index];
      }
    }

    return null;
  }

  delete(table, id) {
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = this.#database[table].splice(index, 1);
        this.#persist();

        return deletedItem[0];
      }
    }

    return null;
  }
}
