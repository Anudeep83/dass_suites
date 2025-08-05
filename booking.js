document.addEventListener("DOMContentLoaded", function () {
  
  attachDateFormat("checkInDate");
  attachDateFormat("checkOutDate");

  const form = document.getElementById('bookingForm');

  form.onsubmit = async function (e) {
    e.preventDefault();

    const url = ''; 

    
    const data = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      phone: document.getElementById('phoneNumber').value.trim(),
      email: document.getElementById('email').value.trim(),
      pincode: document.getElementById('pincode').value.trim(),
      state: document.getElementById('state').value.trim(),
      city: document.getElementById('city').value.trim(),
      checkin: document.getElementById('checkInDate').value.trim(),
      checkout: document.getElementById('checkOutDate').value.trim(),
      guests: document.getElementById('guests').value,
      room: document.getElementById('roomType').value
    };


    console.log("Form Submitted", data);

    try {
        const response = await fetch('http://localhost:8080/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      },
      
    );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Backend error: ' + errorText);
      }
      else
      {
        const result = await response.json(); 
        console.log('Booking submitted successfully:', result);
        alert('Booking submitted successfully!');
        form.reset();
      }
    } catch (err) {
      console.error('Network or response error:', err);
      //alert('Network or backend error: ' + err.message);
       window.location.href = "thankyouPage.html";
    }
  };

  function attachDateFormat(id) {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      input.value = input.value
        .replace(/[^0-9]/g, "")              
        .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    });
  }
});
