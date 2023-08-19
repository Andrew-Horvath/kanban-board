class Section {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }

  getHtml() {
    const sectionHtml = document.createElement("section");
    sectionHtml.setAttribute("id", this.title.toLowerCase());
    sectionHtml.setAttribute("data-id", this.id);

    sectionHtml.innerHTML = `
       <header>
          <h2>${this.title}</h2>
          <button class="button-add" aria-label="add task">add task</button>
        </header>
             `;

    this.tasks.forEach((task) => {
      let taskHtml = new Task(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.listId
      ).createTask();
      sectionHtml.append(taskHtml);
    });

    return sectionHtml;
  }

  static eventListeners() {
    document.querySelectorAll(".button-add").forEach((addBtn) => {
      addBtn.addEventListener("click", Task.addTask);
    });
  }
}
