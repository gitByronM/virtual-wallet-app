import axios, { AxiosError } from 'axios';

const BFF_URL = import.meta.env.VITE_BFF_URL;

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

/**
 * Función para extraer el primer mensaje de error de la respuesta de la API.
 * @param error - El objeto de error devuelto por la API.
 * @returns El primer mensaje de error o un mensaje de error genérico.
 */
const getErrorMessage = (error: ApiErrorResponse): string => {
  if (error?.response?.data?.message) {
    const message = error.response.data.message;

    if (Array.isArray(message)) {
      return message[0];
    }

    return message;
  }

  return 'Ha ocurrido un error. Inténtalo nuevamente.';
};

/**
 * Consulta el balance de un cliente
 * @param document Documento del cliente
 * @param phone Teléfono del cliente
 * @returns Balance del cliente
 */
export const checkBalance = async (document: string, phone: string) => {
  try {
    const response = await axios.post(`${BFF_URL}/customers/balance`, { document, phone });
    return response.data.data.balance;
  } catch (err) {
    throw new Error('Error al consultar saldo.');
  }
};

/**
 * Crea un nuevo cliente
 * @param document Documento del cliente
 * @param names Nombre del cliente
 * @param email Email del cliente
 * @param phone Teléfono del cliente
 * @returns Cliente creado con exito
 */
export const createClient = async (document: string, names: string, email: string, phone: string) => {
  const body = {
    document,
    names,
    email,
    phone,
  };

  try {
    const response = await axios.post(`${BFF_URL}/customers/create`, body);
    return { ...body, balance: 0 };
  } catch (err) {
    throw new Error('Error al crear cliente.');
  }
};

/**
 * Recarga la billetera del cliente
 * @param document Documento del cliente
 * @param phone Teléfono del cliente
 * @param value Valor a recargar
 * @returns Recarga exitosa
 */
export const rechargeWallet = async (document: string, phone: string, amount: number) => {
  const body = {
    document,
    phone,
    amount
  };

  try {
    const { data } = await axios.put(`${BFF_URL}/customers/recharge`, body);
    return data.message;
  } catch (err) {
    throw new Error('Error al recargar billetera.');
  }
};

/**
 * Realiza un pago e inicia el proceso de confirmación enviando un token al correo.
 * @param document Documento del cliente.
 * @param phone Celular del cliente.
 * @param amount Cantidad a pagar.
 * @returns Mensaje de exito y sessionId (ID de sesión para confirmar el pago).
 */
export const makePayment = async (document: string, phone: string, amount: number) => {
  try {
    const {data} = await axios.post(`${BFF_URL}/customers/payment`, {
      document,
      phone,
      amount,
    });
    return {message: data.message, sessionId: data.data.sessionId};
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(errorMessage);
  }
};

/**
 * Confirma el pago usando el token recibido por correo.
 * @param document Documento del cliente.
 * @param phone Celular del cliente.
 * @param sessionId ID de sesión generado en makePayment.
 * @param token Token de 6 dígitos enviado por correo.
 * @returns Nuevo balance del cliente.
 */
export const confirmPayment = async (document: string, phone: string, sessionId: string, token: string) => {
  try {
    const {data} = await axios.post(`${BFF_URL}/customers/payment/confirm`, {
      document,
      phone,
      sessionId,
      token,
    });
    return data.message;
  } catch (err) {
    throw new Error('Error al confirmar el pago.');
  }
};
