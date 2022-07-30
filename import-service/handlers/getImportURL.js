import { requestHandler } from '../utils/http.util';
import { getSigned } from '../services/importService';

export const getImageUploadURL = (event) => requestHandler(event, getSigned);