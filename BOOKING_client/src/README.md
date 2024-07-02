--------------------------------------------------------------
DESPLIEGUE DEL PROYECTO

link : https://proyecto-integrador-enyoi.vercel.app/


--------------------------------------------------------------

<BrowserRouter>
</BrowserRouter>

 es un componente proporcionado por la biblioteca react-router-dom, que es una herramienta popular para manejar el enrutamiento en aplicaciones React de una sola página (SPA). Aquí hay una explicación de para qué sirve y cómo se utiliza:

<Routes>
</Routes>
se utiliza para definir y gestionar las rutas de tu aplicación. A diferencia de <Switch>, <Routes> garantiza que solo una ruta se renderice a la vez, pero ofrece una API más intuitiva y moderna.

<Route  path="/" element={}/>
se utiliza para definir una ruta en tu aplicación

El path especifica la URL que debe coincidir para que la ruta se active, y element define el componente que se renderizará cuando la URL coincida con el path. Vamos a desglosarlo más detalladamente:

className="navButton"

es un atributo que se utiliza para definir una o más clases CSS que se aplicarán a un elemento en el DOM. Estas clases se utilizan para aplicar estilos CSS a los elementos. ejemplo <button className="navButton">Login</button>



-----------------------------------------------------
DEPENDENCIAS

1.react-router-dom

es una biblioteca de enrutamiento para aplicaciones React que permite gestionar la navegación y las rutas en una aplicación de una sola página (SPA).

2.--save @fortawesome/fontawesome-svg-core

una popular colección de iconos utilizados en el desarrollo web. Instalar esta dependencia proporciona el núcleo necesario para usar iconos SVG con Font Awesome en tu proyecto.

@fortawesome/free-solid-svg-icons
Descripción: Este paquete contiene los iconos en el estilo sólido de Font Awesome.
Uso: Los iconos sólidos tienen un relleno completo y se usan comúnmente para acciones y objetos que necesitan ser visualmente destacados.

@fortawesome/free-regular-svg-icons
Descripción: Este paquete contiene los iconos en el estilo regular de Font Awesome.
Uso: Los iconos regulares generalmente tienen un contorno más delgado y pueden incluir iconos que no son tan pesados visualmente como los sólidos. Son útiles para cuando necesitas un icono que sea menos prominente.

@fortawesome/free-brands-svg-icons
Descripción: Este paquete contiene los iconos de marcas de Font Awesome.
Uso: Incluye logos y símbolos de diversas marcas y servicios (como Facebook, Twitter, GitHub, etc.). Son esenciales para indicar enlaces a perfiles de redes sociales, logotipos de empresas, y otros identificadores de marca.

npm i --save @fortawesome/react-fontawesome@latest

El paquete @fortawesome/react-fontawesome es una biblioteca que proporciona componentes React para integrar y usar fácilmente los iconos de Font Awesome en aplicaciones React. Al instalar este paquete, puedes utilizar los iconos de Font Awesome de manera declarativa dentro de tus componentes de React, aprovechando todas las ventajas de la biblioteca de iconos Font Awesome junto con la simplicidad y la modularidad de React.

3.npm i 'react-date-range'
La dependencia react-date-range es una biblioteca de React que proporciona componentes para seleccionar fechas y rangos de fechas. Es especialmente útil en aplicaciones donde necesitas funcionalidades avanzadas de selección de fechas, como en sistemas de reservas, calendarios, y formularios de planificación

4.npm i date-fns
es una biblioteca de JavaScript para manipular y gestionar fechas. Es una de las bibliotecas más completas y ligeras disponibles para trabajar con fechas en JavaScript, ofreciendo una gran cantidad de funciones que son puras y no mutan los objetos de fecha originales.


-------------------------------------------------------

CONCEPTOS DE REACT

1.Componentes Anidados

2.Renderizar
En el contexto de desarrollo web y, más específicamente, en React, "renderizar" se refiere al proceso de generar la salida visual de la interfaz de usuario (UI) a partir del código. En otras palabras, renderizar es el proceso de convertir los componentes de React (que están escritos en JavaScript y JSX) en elementos del DOM (Document Object Model) que el navegador puede mostrar y con los que el usuario puede interactuar.

3.disabled={options.children <= 0} 

atributo que desabilita un elemento de html ,  segun su  condicion 

4.Fragmento Vacio    {   <>parte del codigo </> }

5.Desestructuración de Objetos

En el contexto de React, la desestructuración es comúnmente usada para extraer props directamente en la firma de la función del componente. 

------------------------------------------------------------

HTML
<span className="logo">lamabooking</span>

Es común usar <span> para aplicar estilos CSS a una porción específica de texto o contenido dentro de un elemento más grande.

----------------------------------------------------------
CSS

1.font-weight
se utiliza para especificar el grosor de las letras en un texto.


-------------------------------------------------------------
JAVASCRIPT

Conceptos

Operador de propagacion 

operador que hace una copia de un objeto anterior para crear otro objeto con esos mismo parametros y cambia o actulizar su valores

...nombreObjeto

Ejemplo
const objeto_1 = {
    name: "Juan David",
    estado: "activo",
}

const objeto_2 = {
    ...objeto_1,
    estado:"no activo"
}

console.log(objeto_2)


Propiedad Computadas y Propiedades de objetos de manera dinámica
Cuando hablamos de propiedades computadas, nos referimos a la capacidad de usar el valor de una variable como el nombre de una propiedad de un objeto

let nombrePropiedadObjeto="Nombre";
const objeto_2 = {
    [nombrePropiedadObjeto]: "Juan Sebastina",
    estado: "activo",
}




--------------------------------------------------------------

FONTAWESOME

link: https://fontawesome.com/icons
pagina para descargar iconos 

----------------------------------------------------------------

IMG

se debe configurar el archivo vite.congig
para que el proyecto admita imagenes PNG

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG']
})

