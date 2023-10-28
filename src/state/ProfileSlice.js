import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  nombre: '',
  apellido: '',
  dni: null,
  telefono: '',
  foto: null,
};

const ProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { nombre, apellido, dni, telefono, foto } = action.payload;
      state.nombre = nombre;
      state.apellido = apellido;
      state.dni = dni;
      state.telefono = telefono;
      state.foto = foto;
    },
    setClearUserInfo: (state, action) => {        
        state.nombre = '';
        state.apellido = '';
        state.dni = null;
        state.telefono = '',
        state.foto = null;
      },
  },
});

export const { setUserInfo } = ProfileSlice.actions;

export default ProfileSlice.reducer;
