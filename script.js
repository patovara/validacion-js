const firebaseConfig = {
    apiKey: "AIzaSyAg1L7QwA1sT9jpg8nDAhnnbf-byDEb1vQ",
    authDomain: "primer-backend-form-js.firebaseapp.com",
    projectId: "primer-backend-form-js",
    storageBucket: "primer-backend-form-js.appspot.com",
    messagingSenderId: "803151153425",
    appId: "1:803151153425:web:e026d3228d0bcdc2b864b0",
    measurementId: "G-WCD2LWTSLR"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre 
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')


    //Recordemos que value obtiene los datos del campo y trim() quita los espacios al inicio y fin del texto
    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = "Por favor ingresa un nombre válido"
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //validar correo
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/;

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor inghresa un email válido'
        emailEntrada.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }


    //validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let PassPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!PassPattern.test(contrasenaEntrada.value) ){
        contrasenaError.textContent = 'La contraseña debe tener por lo menos 8 caracteres, números, mayus, minus y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //Si todos los campos son válidos

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
    }


})