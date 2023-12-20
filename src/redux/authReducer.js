import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id:"",
  email: '',
  password: '',
  token: null,
  rol: '',
  name: '',        // Agrega name al estado
  last_name: '',   // Agrega last_name al estado
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { id,email, password, token, rol, name, last_name } = action.payload || {};
      state.id=id;
      state.email = email || '';
      state.password = password || '';
      state.token = token || '';
      state.rol = rol || '';
      state.name = name || '';           // Actualiza el estado con el nombre
      state.last_name = last_name || ''; // Actualiza el estado con el apellido
    },
    unsetUser: (state) => {
      state.id="";
      state.email = '';
      state.password = '';
      state.token = '';
      state.rol = '';
      state.name = '';           // Limpia el nombre al cerrar sesión
      state.last_name = '';     // Limpia el apellido al cerrar sesión
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
