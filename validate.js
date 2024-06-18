function validateAndRedirect() {
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const responsavel = document.getElementById('responsavel').value;
    const phone = document.getElementById('phone').value;
    const alreadyAttended = document.getElementById('already-attended').value;
    const datahora = document.getElementById('datahora').value;

    if (name && birthdate && responsavel && phone && alreadyAttended && datahora) {
        window.location.href = 'final.html';
    } else {
        alert('Preencha todos os campos antes de seguir!');
    }
}