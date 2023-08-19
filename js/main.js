class Project {
  constructor() {
    const controller = new Controller();
    if (window.localStorage.getItem("dark") === "true") {
      document.documentElement.className = "dark";
      document.querySelector(".light-logo").classList.toggle("animate-light");
      document.querySelector(".dark-logo").classList.toggle("animate-dark");
    }
  }
  static getInstance() {
    //check to see if App singleton has been created.
    if (!Project._instance) {
      Project._instance = new Project();
      return Project._instance;
    } else {
      throw "App has already been created! Cannot create a second App!";
    }
  }
}

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    API.getData();

    document.querySelector(".container").addEventListener("click", () => {
      document.querySelector(".light-logo").classList.toggle("animate-light");
      document.querySelector(".dark-logo").classList.toggle("animate-dark");
      document.querySelector("html").classList.toggle("dark");
      const theme = document.querySelector("html").classList.contains("dark");
      console.log(theme);
      if (theme) {
        console.log("theme set");
        window.localStorage.setItem("dark", "true");
      } else {
        console.log("theme else statement");
        window.localStorage.setItem("dark", "false");
      }
    });
  }
}

class Model {
  constructor() {
    document.addEventListener("data_received", (e) => this.process(e));
  }

  process(data) {
    let dataArr = [];

    //creating list html
    data.kanban.forEach((section) => {
      let newSection = new Section(section.id, section.title, section.items);

      dataArr.push(newSection.getHtml());
    });

    const evt = new Event("html_complete");
    evt.html = dataArr;
    document.dispatchEvent(evt);
  }

  sendForm() {
    document.addEventListener("form_complete", (e) => {
      console.log(e.form);
    });
  }
}

class View {
  constructor() {
    document.addEventListener("html_complete", (e) => this.display(e));
    document.addEventListener("form_complete", (e) => this.displayForm(e));
  }

  display(e) {
    e.html.forEach((item) => {
      document.querySelector("main").append(item);
    });
    Section.eventListeners();
  }

  displayForm(e) {
    document.querySelector("main").prepend(e.form);
    const listId = e.dataId;
    const sectionId = e.formTarget.closest("section").id;
    e.form.querySelector(
      "#form-title"
    ).innerHTML = `Add a new Task to ${sectionId}`;

    document
      .querySelector(".button-cancel")
      .addEventListener("click", (e) => this.closeForm());

    document.querySelector(".button-submit").addEventListener("click", (e) => {
      e.preventDefault();
      if (Utils.validateForm(e)) {
        API.postData(e, listId, sectionId);
      }
    });
  }

  closeForm() {
    document.querySelector("#modal").remove();
  }
}

(() => {
  const myApp = Project.getInstance();
})();
