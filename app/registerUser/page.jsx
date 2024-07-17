
'use client'
import Register from '../components/register/Register';
import { toast } from "react-toastify";

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
        if (response.ok) { // Corrigido para 'response' em vez de 'res'
            // ref?.current?.reset(); // Não está claro o que é 'ref' aqui
            const data = await response.json(); // Corrigido para 'response' em vez de 'res'
    
            toast.success(`${data.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            // const errorData = await response.json(); // Comentei esta linha porque não está sendo usada
            toast.error("Ocorreu um erro. Tente novamente.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // console.log("Something went wrong:", errorData); // Comentei esta linha porque não está sendo usada
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