import axios from './axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import { setUser, unsetUser } from '../redux/authReducer';
setUser
/* 
export const registerRequest = createAsyncThunk(
  'user/register',
  async ({ name, last_name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `register`,
        { name, last_name, email, password },
        config
      )
      Cookies.set('token', data.token);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
) */
export const registerRequest = createAsyncThunk(
  'user/register',
  async ({ name, last_name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `register`,
        { name, last_name, email, password },
        config
      );

      // Verifica si hay un token en la respuesta
      const token = response.data.token;

      // Almacena el token en las cookies
      Cookies.set('token', token);

      // Devuelve la respuesta
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginRequest = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      // Realiza la solicitud de inicio de sesión a la API
      const response = await axios.post(
        `http://localhost:3000/api/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      const data = response.data;
      console.log("Data received from API:", data);

      // Aquí agregamos un log para imprimir el token recibido
      console.log("Token received from API:", data.token);
    
      // Verifica el rol del usuario y establece la propiedad 'rol' en el objeto de usuario
      let user = {
        id:data.id,
        email: data.email,
        name: data.name, // Agregamos el nombre del usuario
        last_name: data.last_name, // Agregamos el apellido del usuario
        fullName: `${data.name} ${data.last_name}`,
        token: data.token, // Usamos el token recibido del servidor
        rol: data.userRole.name,
      };
      localStorage.setItem('token', user.token);
      console.log(user.token);
      // Almacena el usuario en el estado
      dispatch(setUser(user));
     
      return data;
    } catch (error) {
      console.error("Error in loginRequest:", error);
    
      if (error.response && error.response.data.error_message) {
        return rejectWithValue(error.response.data.error_message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const logoutRequest = createAsyncThunk(
  'auth/logout',
  async (args, { rejectWithValue, dispatch }) => {
    try {
      // Realiza la llamada a tu API para cerrar sesión
      await axios.post('/logout');

      // Despacha la acción para limpiar los datos del usuario en Redux
      dispatch(unsetUser());
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return rejectWithValue(error.message);
    }
  }
);



export const verifyTokenRequest = () => axios.get('/verify');


export const updateProfileRequest = async (userId, updatedProfileData) => {
  try {
    const response = await axios.put(`/update-profile/${userId}`, updatedProfileData);
    return response.data;
  } catch (error) {
    // Manejo de errores específicos según tu necesidad
    throw error;
  }
};