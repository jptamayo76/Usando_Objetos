// PACIENTE

function Paciente(nombre, edad, rut, diagnostico) {
    var _nombre = nombre;
    var _edad = edad;
    var _rut = rut;
    var _diagnostico = diagnostico;

    Object.defineProperty(this, "_getNombre", {
        get: function () {
            return _nombre
        }
    });

    Object.defineProperty(this, "_setNombre", {
        set: function (nombre) {
            _nombre = nombre
        }
    });

    Object.defineProperty(this, "_getEdad", {
        get: function () {
            return _edad
        }
    });

    Object.defineProperty(this, "_setEdad", {
        set: function (edad) {
            _edad = edad
        }
    });

    Object.defineProperty(this, "_getRUT", {
        get: function () {
            return _rut
        }
    });

    Object.defineProperty(this, "_getDiagnostico", {
        get: function () {
            return _diagnostico
        }
    });

    Object.defineProperty(this, "_setDiagnostico", {
        set: function (diagnostico) {
            _diagnostico = diagnostico
        }
    });
}

Paciente.prototype.getNombre = function () {
    return this._getNombre;
};

Paciente.prototype.setNombre = function (nombre) {
    this._setNombre = nombre;
};

Paciente.prototype.getEdad = function () {
    return this._getEdad;
};

Paciente.prototype.setEdad = function (edad) {
    this._setEdad = edad;
};

Paciente.prototype.getRUT = function () {
    return this._getRUT;
};

Paciente.prototype.getDiagnostico = function () {
    return this._getDiagnostico;
};

Paciente.prototype.setDiagnostico = function (diagnostico) {
    this._setDiagnostico = diagnostico;
};


// CONSULTORIO

function Consultorio(nombre, pacientes) {
    this.nombre = nombre;
    this.pacientes = pacientes || [];
}

Consultorio.prototype.agregarPaciente = function (paciente) {
    this.pacientes.push(paciente);
}


Consultorio.prototype.buscarPaciente = function (nombrePaciente) {
    document.getElementById('cuerpo-tabla-busquedaNombre').innerHTML = "";
    document.getElementById("tableBusqueda").className = "table table-dark table-striped table-hover d-none";
    this.pacientes.forEach(element => {
        if (element.getNombre() == nombrePaciente) {
            document.getElementById("tableBusqueda").className = "table table-dark table-striped table-hover";
            document.getElementById('cuerpo-tabla-busquedaNombre').innerHTML += `
                <tr>
                    <td>${element.getNombre()}</td>
                    <td>${element.getEdad()}</td>
                    <td>${element.getRUT()}</td>
                    <td>${element.getDiagnostico()}</td>
                </tr> `;
        }
    });
}


Consultorio.prototype.buscarPorRUT = function (rutPaciente) {
    document.getElementById('cuerpo-tabla-busquedaRUT').innerHTML = "";
    document.getElementById("tableBusquedaRUT").className = "table table-dark table-striped table-hover d-none";
    this.pacientes.forEach(element => {
        if (element.getRUT() == rutPaciente) {
            document.getElementById("tableBusquedaRUT").className = "table table-dark table-striped table-hover";
            document.getElementById('cuerpo-tabla-busquedaRUT').innerHTML += `
                <tr>
                    <td>${element.getNombre()}</td>
                    <td>${element.getEdad()}</td>
                    <td>${element.getRUT()}</td>
                    <td>${element.getDiagnostico()}</td>
                </tr> `;

            var modifyForm = document.getElementById('modifyForm');
            modifyForm.elements['nombreNuevo'].value = element.getNombre();
            modifyForm.elements['edadNuevo'].value = element.getEdad();
            modifyForm.elements['rutNuevo'].value = element.getRUT();
            modifyForm.elements['diagNuevo'].value = element.getDiagnostico();
        }
    });
}


Consultorio.prototype.modificarPorRUT = function (nombre, edad, rut, diagnostico) {
    this.pacientes.forEach(element => {
        if (element.getRUT() == rut) {
            element.setNombre(nombre);
            element.setEdad(edad);
            element.setDiagnostico(diagnostico);
        }
    });
}

Consultorio.prototype.listarPacientes = function () {
    document.getElementById('cuerpo-tabla-listadoPacientes').innerHTML = "";
    this.pacientes.forEach(element => {
        document.getElementById('cuerpo-tabla-listadoPacientes').innerHTML += `
            <tr>
                <td>${element.getNombre()}</td>
                <td>${element.getEdad()}</td>
                <td>${element.getRUT()}</td>
                <td>${element.getDiagnostico()}</td>
            </tr> `;
    });
}


// Se instancian objetos tipo Paciente iniciales (nombre, edad, rut, diagnostico)
var p1 = new Paciente('Sebastian', 40, '13234324-5', 'Cancer');
var p2 = new Paciente('Xiomara', 24, '22234324-K', 'Diabetes');
var p3 = new Paciente('Sebastian', 55, '9234324-3', 'Hipertiroidismo');

// Se instancia objetos tipo Consultorio con cardinalidad 0 a N.
var c1 = new Consultorio('Centro Médico Ñuñoa', [p1, p2, p3]);

// Validamos que funciona el agregar un paciente
var p4 = new Paciente('Gabriel', 35, '22234324-7', 'Pancreatitis');
c1.agregarPaciente(p4);

document.getElementById("nombre-consultorio").innerHTML = c1.nombre;

// Carga Listado Inicial
c1.listarPacientes();


const formBusqueda = document.getElementById('searchForm');
formBusqueda.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();

    // handle the form data
    var pacienteBuscar = document.getElementById('nombreBuscar').value;
    c1.buscarPaciente(pacienteBuscar);
});


const formBusquedaRUT = document.getElementById('searchRUTForm');
formBusquedaRUT.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();

    // handle the form data
    var rutBuscar = document.getElementById('rutBuscar').value;
    c1.buscarPorRUT(rutBuscar);
});


const formIngreso = document.getElementById('inputForm');
formIngreso.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();

    // handle the form data
    var nombreNuevo = formIngreso.elements['nombreNuevo'].value;
    var edadNuevo = formIngreso.elements['edadNuevo'].value;
    var rutNuevo = formIngreso.elements['rutNuevo'].value;
    var diagNuevo = formIngreso.elements['diagNuevo'].value;

    var pN = new Paciente(nombreNuevo, edadNuevo, rutNuevo, diagNuevo);
    c1.agregarPaciente(pN);
    c1.listarPacientes();

    formIngreso.reset();
});


const modifyForm = document.getElementById('modifyForm');
modifyForm.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();

    // handle the form data
    var nombreNuevo = modifyForm.elements['nombreNuevo'].value;
    var edadNuevo = modifyForm.elements['edadNuevo'].value;
    var rut = modifyForm.elements['rutNuevo'].value;
    var diagNuevo = modifyForm.elements['diagNuevo'].value;

    c1.modificarPorRUT(nombreNuevo, edadNuevo, rut, diagNuevo);
    c1.listarPacientes();

    modifyForm.reset();
});

//console.log(c1.pacientes[1].getNombre());