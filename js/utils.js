class Utils {
  constructor() {}

  static validateForm(e) {
    //loop through all elements in form to check if any are left empty
    //set variable of return value to true. as we need all inputs to be filled out
    let valid = true;
    document.querySelectorAll("[required]").forEach((element) => {
      //looping through each input element, check if the value is empty
      if (element.value == "") {
        //since the element is empty, create the label to display the error message
        const errorLabel = document.createElement("label");
        errorLabel.setAttribute("for", `${element.id}`);
        //adding the class of errorMsg for formatting and display of message
        errorLabel.classList.add("errorMsg");
        errorLabel.innerText = `enter a ${element.name.replace("-", " ")}`;
        element.classList.add("error");
        //checking to make sure that the label doesnt already exist
        //if it doesnt exist, append it to the form below the input element that is empty
        //causing the error
        if (element.parentElement.querySelector(".errorMsg") == null) {
          element.parentElement.append(errorLabel);
        }
        //setting the valid variable to false as input field(s) were left empty
        valid = false;
        //if the input field has a value, remove the error class and error message
        //label if they exist
      } else {
        if (element.parentElement.querySelector(".errorMsg")) {
          element.classList.remove("error");
          element.parentElement.querySelector(".errorMsg").remove();
        }
      }
    });
    //returning true, that the form is valid and all fields have value
    return valid;
  }
}
