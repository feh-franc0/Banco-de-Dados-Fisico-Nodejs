## Use database
    const database = new Database();

## Example
  ### Select
    database.select("tasks")
  ### Insert
    database.insert("tasks", {
      id: randomUUID(),
      title: newTask.title,
      description: newTask.description,
      completed_at: null,
      created_at: new Date().getTime(),
      updated_at: null,
    });
  ### FindById
    database.findById("tasks", 'algumid123');
  ### Update
    const findTask = database.findById("tasks", 'algumid123');
    findTask.title = title
    findTask.description = description
    findTask.updated_at = new Date().getTime();
    database.update("tasks", 'algumid123', findTask);
  ### Delete
    database.delete("tasks", 'algumid123');

