var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    // formData["image"] = document.getElementById("image").value;
    formData["description"] = document.getElementById("description").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<td><img src="imagens/ilustra-team.png" class="img-fluid" /></td>`;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.description;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="btn btn-secondary m-1" onClick="onEdit(this)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Editar</button>
                       <button class="btn btn-danger m-1" onClick="onDelete(this)">Deletar</button>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    // document.getElementById("image").value = "";
    document.getElementById("description").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement; //parentElement leitura dis dados
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    // document.getElementById("image").value = selectedRow.cells[1].innerHTML;
    document.getElementById("description").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    // selectedRow.cells[1].innerHTML = formData.image;
    selectedRow.cells[2].innerHTML = formData.description;
}

function onDelete(td) {
    if (confirm('Deseja realmente excluir ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex); 
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false; //para não atualizar o site
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide")); //hide ocultar
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}

// Para que o form feche ao salvar dados
$(":submit").on("click", function(){
    $(".modal").modal('hide');
});



