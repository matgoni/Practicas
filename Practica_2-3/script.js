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

// Event listener para abrir el modal de edición
document.querySelectorAll('table button').forEach((button, index) => {
    button.addEventListener('click', () => {
        openModal();

        // Obtener los datos del registro
        const row = button.closest('tr');
        const title = row.querySelector('td em').textContent;
        const artist = row.querySelector('td:nth-child(4)').textContent;
        const year = row.querySelector('td:nth-child(5)').textContent;
        const genre = row.querySelector('td:last-child').textContent;

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
    rows[index].querySelector('td em').textContent = updatedTitle;
    rows[index].querySelector('td:nth-child(4)').textContent = updatedArtist;
    rows[index].querySelector('td:nth-child(5)').textContent = updatedYear;
    rows[index].querySelector('td:last-child').textContent = updatedGenre;

    // Cerrar el modal
    closeModal();
});

// Función para abrir el modal de edición
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

