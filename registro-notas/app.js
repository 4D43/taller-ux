document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const submitBtn = document.getElementById("submit-btn");
  const notesList = document.getElementById("notes-list");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const toastUndoBtn = document.getElementById("toast-undo-btn");

  let notes = [];
  let lastDeletedNote = null;
  let toastTimeout = null;

  // Prevención de errores: Habilitar botón solo si hay datos en los campos
  function validateForm() {
    const isTitleValid = titleInput.value.trim().length > 0;
    const isContentValid = contentInput.value.trim().length > 0;
    submitBtn.disabled = !(isTitleValid && isContentValid);
  }

  titleInput.addEventListener("input", validateForm);
  contentInput.addEventListener("input", validateForm);

  // Mostrar mensaje de notificación (Visibilidad del estado del sistema)
  function showToast(message, showUndo = false) {
    clearTimeout(toastTimeout);
    toastMessage.textContent = message;

    if (showUndo) {
      toastUndoBtn.classList.remove("hidden");
    } else {
      toastUndoBtn.classList.add("hidden");
    }

    toast.classList.remove("hidden");

    toastTimeout = setTimeout(() => {
      toast.classList.add("hidden");
    }, 5000);
  }

  // Renderizar las notas en el DOM
  function renderNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
      notesList.innerHTML =
        '<p style="color: var(--color-text-muted);">No hay notas guardadas.</p>';
      return;
    }

    notes.forEach((note) => {
      const card = document.createElement("article");
      card.className = "note-card";

      card.innerHTML = `
        <div>
          <h3>${escapeHtml(note.title)}</h3>
          <p>${escapeHtml(note.content)}</p>
        </div>
        <button class="btn btn-danger" aria-label="Eliminar nota ${escapeHtml(note.title)}" data-id="${note.id}">
          Eliminar
        </button>
      `;

      card.querySelector(".btn-danger").addEventListener("click", () => {
        deleteNote(note.id);
      });

      notesList.appendChild(card);
    });
  }

  // Agregar nota
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
    };

    notes.push(newNote);
    renderNotes();

    titleInput.value = "";
    contentInput.value = "";
    validateForm(); // Volver a deshabilitar

    showToast("Nota agregada correctamente");
  });

  // Eliminar nota con opción a deshacer (Control y libertad del usuario)
  function deleteNote(id) {
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
      lastDeletedNote = { note: notes[index], index };
      notes.splice(index, 1);
      renderNotes();
      showToast("Nota eliminada", true);
    }
  }

  // Función Deshacer
  toastUndoBtn.addEventListener("click", () => {
    if (lastDeletedNote) {
      notes.splice(lastDeletedNote.index, 0, lastDeletedNote.note);
      lastDeletedNote = null;
      renderNotes();
      toast.classList.add("hidden");
      showToast("Acción cancelada: Nota restaurada");
    }
  });

  // Helper para prevenir XSS
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[m];
    });
  }

  renderNotes();
});
