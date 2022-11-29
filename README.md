# Proyecto final

## Patrones de diseño utilizados
1. Singleton para las clases Repository que hacen operaciones en la base de datos
2. Facade para la clase que crea el reporte
## Principios SOLID utilizados
S. Se utiliza para las clases Repository que hacen operaciones en la base de datos, ya que cada clase se encarga de las operaciones en la base de datos sobre una entidad
O. Las clases Repository que hacen operaciones en la base de datos pueden ser extendidas pero no modificadas
L. Se pueden extender las clases Repository y mientras se sigan llamando los mismos métodos no habría problema para el código existente
I. Ninguna clase importa código que no utiliza
D. No hay clases que dependan de clases de bajo nivel