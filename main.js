const box = document.querySelector('.box')
const subtitle = document.querySelector('.subtitle')
const btn = document.querySelector('.button')
const h2 = document.querySelector('.h2')

btn.addEventListener('click', formQuestions)

function createTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Crear encabezados
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear filas de datos
    data.forEach(rowData => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(rowData[header]));
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    // table.setAttribute('border', 1)
    table.classList.add('table')
    table.classList.add('table-hover')
    table.appendChild(tbody);

    return table;
}

function formQuestions() {
    const name = prompt('Ingresa tu nombre')

    if (!name) {
        h2.style.display = 'block'
        return
    }

    let start = confirm(`Bienvenid@ ${name}, te ayudaremos a establecer un orden para tus tareas del dia, te preguntaremos la tarea a realizar y luego la prioriad: \n
    1 = prioridad baja
    2 = prioridad media
    3 = proridad alta

    ¿empezar?
    `)

    let end = false

    const priority = {
        1: 'baja',
        2: 'media',
        3: 'alta'
    }

    let allQuestions = []

    if (start) {
        do {

            let task = prompt(`Tarea`)
            let taskPrority = parseInt(prompt('Prioridad (1 = baja, 2 = media, 3 = alta)'))

            if (taskPrority >= 1 && taskPrority <= 3) {
                allQuestions.push({ tarea: task, prioridad: priority[taskPrority] })
            } else {
                alert('Ingresa una prioridad valida')
            }

            end = confirm('¿Deseas continuar?')
        } while (end);
    } else {
        alert('Vuelve cuando quieras🫡')
        h2.style.display = 'block'
    }

    console.log(allQuestions)

    if (allQuestions.length <= 0) {
        h2.style.display = 'block'
        return
    }

    subtitle.textContent = `Hola ${name}, tus tareas fueron ordenadas por prioridad de MAYOR PRIORIDAD a MENOR PRIORIDAD`

    const orderedTasks = assignedProrityByTask(allQuestions);
    const tabla = createTable(orderedTasks);
    box.appendChild(tabla);

}

function assignedProrityByTask(tasks) {
    // Crear una copia de las tareas para no modificar el original
    const tasksCopy = [...tasks];

    // Ordenar las tareas por prioridad de mayor a menor
    tasksCopy.sort((a, b) => {
        if (a.prioridad === b.prioridad) {
            return 0;
        } else if (a.prioridad === "alta") {
            return -1;
        } else if (b.prioridad === "alta") {
            return 1;
        } else if (a.prioridad === "media") {
            return -1;
        } else if (b.prioridad === "media") {
            return 1;
        } else {
            return -1;
        }
    });

    // Devolver las tareas ordenadas
    return tasksCopy;
}

// formQuestions()
