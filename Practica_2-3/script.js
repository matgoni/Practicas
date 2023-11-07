// Función para filtrar registros por palabra clave
function filterRecords(records, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return records.filter(record => record.title.toLowerCase().includes(searchTerm));
}

// Función para eliminar registros seleccionados
function deleteSelectedRecords(records, selectedIndices) {
    return records.filter((record, index) => !selectedIndices.includes(index));
}

// Función para filtrar registros por género
function filterRecordsByGenre(records, selectedGenre) {
    if (selectedGenre === '0') {
        return records;
    } else {
        return records.filter(record => record.genre === selectedGenre);
    }
}

// Función para actualizar datos de un registro
function updateRecord(records, index, updatedData) {
    return records.map((record, i) => (i === index ? { ...record, ...updatedData } : record));
}

// Event listener para el botón "Actualizar" en el modal
$('#modal-content').on('click', '#update', () => {
    const updatedTitle = $('#title').val();
    const updatedArtist = $('#artist').val();
    const updatedYear = $('#year').val();
    const updatedGenre = $('#genre').val();

    // Actualizar los datos en la tabla
    const rowIndex = getRowIndexForUpdatedRecord();
    records = updateRecord(records, rowIndex, { title: updatedTitle, artist: updatedArtist, year: updatedYear, genre: updatedGenre });
    updateTableWithRecords(records);

    // Cerrar el modal
    closeModal();
});

const buttons = Array.from(document.querySelectorAll('table button'));

// Event listener para abrir el modal de edición
buttons.map((button, index) => {
    button.addEventListener('click', () => {
        openModal();

        const row = button.closest('tr');
        const rowData = Array.from(row.querySelectorAll('td'));
        const [title, , , artist, year, genre] = rowData.map(cell => cell.textContent);

        // Cargar los datos en el modal
        document.getElementById('title').value = title;
        document.getElementById('artist').value = artist;
        document.getElementById('year').value = year;
        document.getElementById('genre').value = genre;

        // Guardar el índice de la fila actual
        document.getElementById('record-index').value = index;
    });
});

// Event listener para el botón "Actualizar" en el modal
document.getElementById('update-button').addEventListener('click', () => {
    const index = parseInt(document.getElementById('record-index').value);
    const updatedTitle = document.getElementById('title').value;
    const updatedArtist = document.getElementById('artist').value;
    const updatedYear = document.getElementById('year').value;
    const updatedGenre = document.getElementById('genre').value;

    // Actualizar los datos en la tabla
    const rows = document.querySelectorAll('table tbody tr');
    const updatedData = [updatedTitle, updatedArtist, updatedYear, updatedGenre];

    rows[index].querySelectorAll('td').forEach((cell, cellIndex) => {
        cell.textContent = updatedData[cellIndex];
    });

    // Cerrar el modal
    closeModal();
});
