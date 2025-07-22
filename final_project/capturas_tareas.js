const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Función para hacer peticiones HTTP
async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    console.log(`✅ ${method} ${url} - Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log(`❌ ${method} ${url} - Error: ${error.response?.status || error.message}`);
    if (error.response?.data) {
      console.log('Error Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Función para pausar y permitir tomar captura
function pausarParaCaptura(mensaje) {
  console.log('\n' + '='.repeat(60));
  console.log(`📸 ${mensaje}`);
  console.log('='.repeat(60));
  console.log('Presiona ENTER para continuar...');
  return new Promise(resolve => {
    process.stdin.once('data', () => {
      resolve();
    });
  });
}

// Función principal para capturas
async function ejecutarParaCapturas() {
  console.log('📸 SCRIPT PARA CAPTURAS DE PANTALLA - LABORATORIO BOOK REVIEWS');
  console.log('Este script te permitirá tomar capturas de cada tarea por separado\n');
  
  // TAREA 1: Obtener todos los libros
  console.log('🎯 TAREA 1: Obtener la lista de libros disponibles en la tienda');
  await makeRequest('GET', '/');
  await pausarParaCaptura('CAPTURA TAREA 1 - Obtener todos los libros');
  
  // TAREA 2: Obtener libro por ISBN
  console.log('🎯 TAREA 2: Obtener los libros por ISBN');
  await makeRequest('GET', '/isbn/1');
  await pausarParaCaptura('CAPTURA TAREA 2 - Obtener libro por ISBN');
  
  // TAREA 3: Obtener libros por autor
  console.log('🎯 TAREA 3: Obtener todos los libros por Autor');
  await makeRequest('GET', '/author/Jane');
  await pausarParaCaptura('CAPTURA TAREA 3 - Obtener libros por autor');
  
  // TAREA 4: Obtener libros por título
  console.log('🎯 TAREA 4: Obtener todos los libros en base al Título');
  await makeRequest('GET', '/title/Pride');
  await pausarParaCaptura('CAPTURA TAREA 4 - Obtener libros por título');
  
  // TAREA 5: Obtener reseñas
  console.log('🎯 TAREA 5: Obtener la Reseña del libro');
  await makeRequest('GET', '/review/1');
  await pausarParaCaptura('CAPTURA TAREA 5 - Obtener reseñas de libro');
  
  // TAREA 6: Registrar usuario
  console.log('🎯 TAREA 6: Registrar nuevo usuario');
  await makeRequest('POST', '/register', {
    username: 'usuario_captura',
    password: 'password123'
  });
  await pausarParaCaptura('CAPTURA TAREA 6 - Registrar nuevo usuario');
  
  // TAREA 7: Iniciar sesión
  console.log('🎯 TAREA 7: Iniciar sesión como usuario registrado');
  await makeRequest('POST', '/customer/login', {
    username: 'usuario_captura',
    password: 'password123'
  });
  await pausarParaCaptura('CAPTURA TAREA 7 - Iniciar sesión');
  
  // TAREA 8: Añadir reseña (sin autenticación - debería fallar)
  console.log('🎯 TAREA 8: Añadir/Modificar una reseña de libro (SIN AUTENTICACIÓN)');
  await makeRequest('PUT', '/customer/auth/review/1', {
    review: 'Esta reseña no debería funcionar sin autenticación'
  });
  await pausarParaCaptura('CAPTURA TAREA 8 - Intentar añadir reseña sin autenticación');
  
  // TAREA 9: Eliminar reseña (sin autenticación - debería fallar)
  console.log('🎯 TAREA 9: Eliminar la reseña de un libro (SIN AUTENTICACIÓN)');
  await makeRequest('DELETE', '/customer/auth/review/1');
  await pausarParaCaptura('CAPTURA TAREA 9 - Intentar eliminar reseña sin autenticación');
  
  // TAREA 10: Obtener todos los libros (Async)
  console.log('🎯 TAREA 10: Obtener todos los libros - Usando función de devolución de llamada asíncrona');
  await makeRequest('GET', '/async/books');
  await pausarParaCaptura('CAPTURA TAREA 10 - Obtener libros async');
  
  // TAREA 11: Buscar por ISBN (Promise)
  console.log('🎯 TAREA 11: Buscar por ISBN - Usando Promises');
  await makeRequest('GET', '/async/isbn/1');
  await pausarParaCaptura('CAPTURA TAREA 11 - Buscar por ISBN con Promise');
  
  // TAREA 12: Búsqueda por autor (Async/Await)
  console.log('🎯 TAREA 12: Búsqueda por autor - Usando Async/Await');
  await makeRequest('GET', '/async/author/Jane');
  await pausarParaCaptura('CAPTURA TAREA 12 - Búsqueda por autor async');
  
  // TAREA 13: Búsqueda por título (Async/Await)
  console.log('🎯 TAREA 13: Búsqueda por título - Usando Async/Await');
  await makeRequest('GET', '/async/title/Pride');
  await pausarParaCaptura('CAPTURA TAREA 13 - Búsqueda por título async');
  
  // CASOS DE ERROR PARA DEMOSTRAR MANEJO DE ERRORES
  console.log('🎯 CASOS DE ERROR: Demostrar manejo de errores');
  console.log('Error 1: ISBN inexistente');
  await makeRequest('GET', '/isbn/999');
  await pausarParaCaptura('CAPTURA ERROR 1 - ISBN inexistente');
  
  console.log('Error 2: Autor inexistente');
  await makeRequest('GET', '/author/NoExiste');
  await pausarParaCaptura('CAPTURA ERROR 2 - Autor inexistente');
  
  console.log('Error 3: Usuario duplicado');
  await makeRequest('POST', '/register', {
    username: 'usuario_captura',
    password: 'password123'
  });
  await pausarParaCaptura('CAPTURA ERROR 3 - Usuario duplicado');
  
  console.log('🎉 ¡TODAS LAS CAPTURAS COMPLETADAS!');
  console.log('Tu laboratorio está completamente funcional.');
  process.exit(0);
}

// Configurar stdin para capturar ENTER
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log('🚀 Iniciando script para capturas de pantalla...');
console.log('Asegúrate de que el servidor esté ejecutándose en http://localhost:5000');
console.log('Presiona ENTER para comenzar...\n');

process.stdin.once('data', () => {
  ejecutarParaCapturas().catch(console.error);
}); 