document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let data = {
        SuppliedName: document.getElementById('name').value,
        SuppliedPhone: document.getElementById('phone').value,
        SuppliedEmail: document.getElementById('email').value,
        Subject: document.getElementById('subject').value,
        Description: document.getElementById('description').value,
        Origin : 'Web'
    };    

    axios.post('/case', data)
    .then(response => {
        document.getElementById('toast-message').innerText = response.data;
        const toast = document.getElementById('toast');
        toast.className = 'toast visible';
        setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3000);
    })
    .catch(error => {
        document.getElementById('error-toast-message').innerText = 'There was an issue. Please try again.';
        const errorToast = document.getElementById('error-toast');
        errorToast.className = 'toast visible error-toast';

        setTimeout(() => {
            errorToast.className = 'toast hidden error-toast';
        }, 3000);
    });
});
