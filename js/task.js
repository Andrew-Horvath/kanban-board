class Task {
  constructor(id, title, description, dueDate, listId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.listId = listId;
  }
  createTask() {
    const createTask = document.createElement("article");
    // createTask.setAttribute("id", this.listId);
    createTask.setAttribute("data-id", this.id);

    createTask.innerHTML = `
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <time datetime="${this.dueDate}">${this.dueDate}</time>
         `;
    return createTask;
  }

  static addTask(e) {
    e.preventDefault();
    const target = e.target,
      sectionId = target.closest("section").getAttribute("data-id"),
      taskForm = Task.formHtml();

    const evt = new Event("form_complete");
    evt.form = taskForm;
    evt.formTarget = target;
    evt.dataId = sectionId;
    document.dispatchEvent(evt);
  }

  static formHtml() {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    modal.classList.add("modal");

    modal.innerHTML = `
    <form id="form-add-task">
          <h3 id="form-title"></h3>
          <fieldset id="new-task-fields">
            <div>
              <label for="title">Task Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="task title &nbsp; &nbsp; &nbsp; [required]" required
              />
              
            </div>
            <div>
              <label for="description">Task Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="task description &nbsp; &nbsp; &nbsp; [required]"
                rows="5"
              required ></textarea>
              
            </div>
            <div>
              <label for="due-date">due date</label>
              <input type="date" name="due-date" id="due-date" required />
              
            </div>
          </fieldset>

          <div>
            <button class="button-submit" type="submit" >submit</button>
            <button class="button-cancel" type="button">cancel</button>
          </div>
        </form>
    `;
    return modal;
  }
}
