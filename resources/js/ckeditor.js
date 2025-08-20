import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

document.addEventListener("DOMContentLoaded", function () {
    const editorElement = document.querySelector("#editor");
    if (editorElement) {
        ClassicEditor.create(editorElement, {
            toolbar: [
                "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList",
                "|", "blockQuote", "insertTable", "undo", "redo"
            ]
        })
        .then(editor => {
            console.log("CKEditor loaded", editor);
        })
        .catch(error => {
            console.error("CKEditor init error:", error);
        });
    }
});
