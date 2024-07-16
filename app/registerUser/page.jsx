
'use client'
import Register from '../components/register/Register';



const registerUser = async () => { 
   const handleRegister = async (formData) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Registro bem-sucedido!');
        } else {
            console.error('Erro no registro.');

        }
    } catch (error) {
        console.error('Erro:', error);

    }
   }

    return (
       
       <Register onRegister={handleRegister} />

    )
}

export default registerUser