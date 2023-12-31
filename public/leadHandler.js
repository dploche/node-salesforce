document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let data = {
        FirstName: document.getElementById('first-name').value,
        LastName: document.getElementById('last-name').value,
        MobilePhone: document.getElementById('mobile').value,
        Email: document.getElementById('email').value,
        Company: document.getElementById('company').value
    };    

    axios.post('/lead', data)
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
