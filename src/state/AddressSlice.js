import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id:null, 
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
        id,
        foto,
        calle,
        altura,
        localidad,
        latitud,
        longitud,
      } = action.payload;
      state.id = id;
      state.foto = foto;
      state.calle = calle;
      state.altura = altura;
      state.localidad = localidad;
      state.latitud = latitud;
      state.longitud = longitud;
    },
    setClearAddressInfo: (state, action) => {
      state.id = null;
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
