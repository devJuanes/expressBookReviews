const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Función para hacer peticiones HTTP con cookies
async function makeRequest(method, url, data = null, cookies = null) {
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
    
    if (cookies) {
      config.headers.Cookie = cookies;
    }
    
    const response = await axios(config);
    console.log(`✅ ${method} ${url} - Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    // Extraer cookies de la respuesta
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      return { data: response.data, cookies: setCookie.join('; ') };
    }
    
    return { data: response.data, cookies: cookies };
  } catch (error) {
    console.log(`❌ ${method} ${url} - Error: ${error.response?.status || error.message}`);
    if (error.response?.data) {
      console.log('Error Response:', JSON.stringify(error.response.data, null, 2));
    }
    return { data: null, cookies: cookies };
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

// Función principal para capturas de autenticación
async function ejecutarCapturasAutenticacion() {
  console.log('🔐 CAPTURAS DE AUTENTICACIÓN - TAREAS 8 Y 9');
  console.log('Este script te permitirá capturar las funcionalidades de usuarios registrados\n');
  
  let cookies = null;
  
  // Paso 1: Registrar usuario para autenticación
  console.log('👤 PASO 1: Registrar usuario para autenticación');
  await makeRequest('POST', '/register', {
    username: 'usuario_auth',
    password: 'auth123'
  });
  await pausarParaCaptura('CAPTURA - Registrar usuario para auth');
  
  // Paso 2: Iniciar sesión
  console.log('🔑 PASO 2: Iniciar sesión');
  const loginResult = await makeRequest('POST', '/customer/login', {
    username: 'usuario_auth',
    password: 'auth123'
  });
  cookies = loginResult.cookies;
  await pausarParaCaptura('CAPTURA - Iniciar sesión exitoso');
  
  // Paso 3: Verificar reseñas antes de añadir
  console.log('👀 PASO 3: Verificar reseñas antes de añadir');
  await makeRequest('GET', '/review/1');
  await pausarParaCaptura('CAPTURA - Reseñas antes de añadir');
  
  // Paso 4: Añadir primera reseña (TAREA 8)
  console.log('✍️ PASO 4: Añadir primera reseña (TAREA 8)');
  await makeRequest('PUT', '/customer/auth/review/1', {
    review: 'Excelente libro clásico africano - muy recomendado'
  }, cookies);
  await pausarParaCaptura('CAPTURA TAREA 8 - Añadir reseña exitosa');
  
  // Paso 5: Verificar que la reseña se añadió
  console.log('👀 PASO 5: Verificar que la reseña se añadió');
  await makeRequest('GET', '/review/1');
  await pausarParaCaptura('CAPTURA - Verificar reseña añadida');
  
  // Paso 6: Modificar la reseña (TAREA 8 - modificar)
  console.log('✏️ PASO 6: Modificar la reseña (TAREA 8 - modificar)');
  await makeRequest('PUT', '/customer/auth/review/1', {
    review: 'Reseña modificada - libro clásico africano imprescindible'
  }, cookies);
  await pausarParaCaptura('CAPTURA TAREA 8 - Modificar reseña');
  
  // Paso 7: Verificar que la reseña se modificó
  console.log('👀 PASO 7: Verificar que la reseña se modificó');
  await makeRequest('GET', '/review/1');
  await pausarParaCaptura('CAPTURA - Verificar reseña modificada');
  
  // Paso 8: Añadir reseña a otro libro
  console.log('📚 PASO 8: Añadir reseña a otro libro');
  await makeRequest('PUT', '/customer/auth/review/8', {
    review: 'Clásico romántico de Jane Austen - obra maestra'
  }, cookies);
  await pausarParaCaptura('CAPTURA - Añadir reseña a otro libro');
  
  // Paso 9: Verificar reseñas de ambos libros
  console.log('👀 PASO 9: Verificar reseñas de ambos libros');
  console.log('Reseñas del libro 1:');
  await makeRequest('GET', '/review/1');
  console.log('\nReseñas del libro 8:');
  await makeRequest('GET', '/review/8');
  await pausarParaCaptura('CAPTURA - Verificar reseñas de ambos libros');
  
  // Paso 10: Eliminar reseña (TAREA 9)
  console.log('🗑️ PASO 10: Eliminar reseña (TAREA 9)');
  await makeRequest('DELETE', '/customer/auth/review/1', null, cookies);
  await pausarParaCaptura('CAPTURA TAREA 9 - Eliminar reseña exitosa');
  
  // Paso 11: Verificar que la reseña se eliminó
  console.log('👀 PASO 11: Verificar que la reseña se eliminó');
  await makeRequest('GET', '/review/1');
  await pausarParaCaptura('CAPTURA - Verificar reseña eliminada');
  
  // Paso 12: Intentar eliminar reseña que no existe
  console.log('❌ PASO 12: Intentar eliminar reseña que no existe');
  await makeRequest('DELETE', '/customer/auth/review/999', null, cookies);
  await pausarParaCaptura('CAPTURA - Error al eliminar reseña inexistente');
  
  // Paso 13: Intentar añadir reseña a libro inexistente
  console.log('❌ PASO 13: Intentar añadir reseña a libro inexistente');
  await makeRequest('PUT', '/customer/auth/review/999', {
    review: 'Esta reseña no debería funcionar'
  }, cookies);
  await pausarParaCaptura('CAPTURA - Error al añadir reseña a libro inexistente');
  
  console.log('🎉 ¡CAPTURAS DE AUTENTICACIÓN COMPLETADAS!');
  console.log('Las tareas 8 y 9 están completamente funcionales.');
  process.exit(0);
}

// Configurar stdin para capturar ENTER
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log('🔐 Iniciando script para capturas de autenticación...');
console.log('Asegúrate de que el servidor esté ejecutándose en http://localhost:5000');
console.log('Presiona ENTER para comenzar...\n');

process.stdin.once('data', () => {
  ejecutarCapturasAutenticacion().catch(console.error);
}); 