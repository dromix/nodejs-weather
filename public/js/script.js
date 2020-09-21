window.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('.form-address'),
          address = document.querySelector('.address');
    let   msg1 = document.querySelector('.msg1'),
          msg2 = document.querySelector('.msg2');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        msg1.textContent = 'Loading...';
        msg2.textContent = '';
        if (address.value) {
            fetch(`http://localhost:3000/weather?address=${address.value}`)
                .then(res => res.json().then(data => {
                    if (data.error) {
                        msg1.textContent = data.error;
                    } else {
                        msg1.textContent = `Region: ${data.forecastData.region}`;
                        msg2.textContent = `Temperature: ${data.forecastData.temperature}`;
                    }
            }));
        } 
    });    
});

function removeInfo() {
    try {
        document.querySelector('.info-block').remove();
    } catch (e){}
}