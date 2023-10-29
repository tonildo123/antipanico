import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foto: null,
  calle: '',
  altura: '',
  localidad: '',
  latitud: null,
  longitud: null,
};

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressInfo: (state, action) => {
      const {
        foto,
        calle,
        altura,
        localidad,
        latitud,
        longitud,
      } = action.payload;
      state.foto = foto;
      state.calle = calle;
      state.altura = altura;
      state.localidad = localidad;
      state.latitud = latitud;
      state.longitud = longitud;
    },
    setClearAddressInfo: (state, action) => {
      
      state.foto = null;
      state.calle = '';
      state.altura = '';
      state.localidad = '';
      state.latitud = null;
      state.longitud = null;
    },
  },
});

export const { setAddressInfo,setClearAddressInfo } = AddressSlice.actions;

export default AddressSlice.reducer;
