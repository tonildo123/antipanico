import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  id: null,
  nombre: '',
  apellido: '',
  dni: null,
  telefono: '',
  foto: null,
  completed:false
};

const ProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { id, nombre, apellido, dni, telefono, foto } = action.payload;
      state.id = id;
      state.nombre = nombre;
      state.apellido = apellido;
      state.dni = dni;
      state.telefono = telefono;
      state.foto = foto;
      state.completed=true;
    },
    setClearUserInfo: (state, action) => {
      state.id = null;
      state.nombre = '';
      state.apellido = '';
      state.dni = null;
      state.telefono = '',
      state.foto = null;
      state.completed=false
    },
  },
});

export const { setUserInfo, setClearUserInfo } = ProfileSlice.actions;

export default ProfileSlice.reducer;
