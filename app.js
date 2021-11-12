const formulario = document.querySelector("#formulario");
const renderEstudiantes = document.querySelector("#renderEstudiantes");
const renderProfesores = document.querySelector("#renderProfesores");
const templateEstudiantes = document.querySelector(
  "#templateEstudiantes"
).content;
const templateProfesores = document.querySelector(
  "#templateProfesores"
).content;

const estudiantes = [];
const profesores = [];

document.addEventListener("click", (e) => {
  console.log(e.target.dataset.nombre);
  if (e.target.dataset.nombre) {
    // console.log(e.target.matches(".btn-success"));
    if (e.target.matches(".btn-success")) {
      estudiantes.map((item) => {
        if (item.nombre === e.target.dataset.nombre) {
          item.setEstado = true;
        }
        console.log(item);
        return item;
      });
    }
    if (e.target.matches(".btn-danger")) {
      estudiantes.map((item) => {
        if (item.nombre === e.target.dataset.nombre) {
          item.setEstado = false;
        }
        console.log(item);
        return item;
      });
    }
    Persona.renderPersonaUI(estudiantes, "Estudiante");
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);
  const [nombre, edad, opcion] = [...datos.values()];

  if (opcion === "Estudiante") {
    const estudiante = new Estudiante(nombre, edad);
    estudiantes.push(estudiante);
    Persona.renderPersonaUI(estudiantes, opcion);
  }
  if (opcion === "Profesor") {
    const profesor = new Profesor(nombre, edad);
    profesores.push(profesor);
    Persona.renderPersonaUI(profesores, opcion);
  }
});

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  static renderPersonaUI(personas, tipo) {
    if (tipo === "Estudiante") {
      renderEstudiantes.textContent = "";
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarNuevoEstudiante());
      });

      renderEstudiantes.appendChild(fragment);
    }

    if (tipo === "Profesor") {
      renderProfesores.textContent = "";
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarNuevoProfesor());
      });

      renderProfesores.appendChild(fragment);
    }
  }
}

class Estudiante extends Persona {
  #estado = false;
  #estudiante = "Estudiante";

  set setEstado(estado) {
    this.#estado = estado;
  }

  get getEstudiante() {
    return this.#estudiante;
  }

  agregarNuevoEstudiante() {
    const clone = templateEstudiantes.cloneNode(true);
    clone.querySelector("h5 .text-primary").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.getEstudiante;
    clone.querySelector(".lead").textContent = this.edad;

    if (this.#estado) {
      clone.querySelector(".badge").className = "badge bg-success";
      clone.querySelector(".btn-success").disabled = true;
      clone.querySelector(".btn-danger").disabled = false;
    } else {
      clone.querySelector(".badge").className = "badge bg-danger";
      clone.querySelector(".btn-success").disabled = false;
      clone.querySelector(".btn-danger").disabled = true;
    }

    clone.querySelector(".badge").textContent = this.#estado
      ? "Aprobado"
      : "Reprobado";

    clone.querySelector(".btn-success").dataset.nombre = this.nombre;
    clone.querySelector(".btn-danger").dataset.nombre = this.nombre;
    return clone;
  }
}

class Profesor extends Persona {
  #profesor = "Profesor";

  agregarNuevoProfesor() {
    const clone = templateProfesores.cloneNode(true);
    clone.querySelector("h5").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.#profesor;
    clone.querySelector(".lead").textContent = this.edad;

    return clone;
  }
}
