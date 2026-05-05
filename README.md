# aplicacionesMoviles_trabajoIntegrador

Para probar cómo se visualiza con el celular: 
https://aplicaciones-moviles-trabajo-integr.vercel.app/

Puntos a mejorar:

Desktop view:
- Se debe agregar más información a varias de las vistas. Hay más espacio y puede aprovecharse

Botones Cancelar / Agregar en Formulario Favoritos
  Falta formato

Circuitos
- Falta Vista detalle de circuitos
- Falta card de historial de circuitos
- Falta card favoritos de circuito

Código
- Se debe hacer una revisión de código.
- Se separan responsabilidades de Estructura, estilo y comportamiento de componentes.
- Se prioriza el funcionamiento.
- Sin embargo, en ciertos lugares el código puede optimizarse, modularizarse y desacoplarse.
- Además se debe hacer una limpieza de logs (para producción, para test son muy útiles)

Mejoras de performance:
- Las APIs seleccionadas no pueden filtrar por varios query params. Para solucionar eso se trae la base completa de registros
- y se filtran en el lado cliente. Luego se procede a mostrar los resultados con carga progresiva:
- (ej: no puedo filtrar por nombre de piloto ni por nacionalidad en el fetch, esos filtros se aplican en el cliente)
- Las imágenes de autos y de pilotos deben reemplazarse por imágenes de menor resolución para aumentar performance
  
  
