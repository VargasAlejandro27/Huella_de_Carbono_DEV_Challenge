# 🌱 Calculadora de Huella de Carbono - Express.js

Una aplicación web simple y eficiente desarrollada con **Node.js y Express.js** para calcular la huella de carbono personal y proporcionar consejos personalizados para reducir las emisiones de CO₂.

## 📋 Características

- **Cálculo Simple**: Interfaz intuitiva para calcular tu huella de carbono
- **Almacenamiento en Memoria**: Base de datos simple en memoria (sin configuración necesaria)
- **Consejos Personalizados**: Recomendaciones según tu nivel de emisiones
- **Diseño Moderno**: Interfaz responsive con Bootstrap 5
- **Fácil de Usar**: Sin configuración compleja de base de datos

## 🚀 Instalación Rápida

### Requisitos Previos
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Descomprimir el proyecto**
```bash
cd carbon-calculator-express
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🛠️ Modo Desarrollo

Para desarrollo con auto-reload:
```bash
npm run dev
```
(Requiere nodemon: `npm install -g nodemon`)

## 📂 Estructura del Proyecto

```
carbon-calculator-express/
│
├── app.js                  # Servidor principal Express
├── package.json            # Dependencias y scripts
│
├── public/                 # Archivos estáticos
│   └── css/
│       └── style.css      # Estilos personalizados
│
└── views/                  # Plantillas EJS
    ├── index.ejs          # Página principal
    ├── calculate.ejs      # Formulario de cálculo
    ├── results.ejs        # Resultados y consejos
    ├── history.ejs        # Historial de cálculos
    ├── tips.ejs           # Todos los consejos
    └── about.ejs          # Información
```

## 🎯 Uso

### Para Usuarios

1. **Página Principal** (`/`)
   - Introducción a la huella de carbono
   - Información sobre la importancia

2. **Calcular** (`/calcular`)
   - Completa el formulario con tus datos
   - Información sobre transporte, energía, alimentación y consumo

3. **Ver Resultados** (`/resultados/:id`)
   - Huella total en kg CO₂/año
   - Desglose por categorías
   - Comparación con promedios
   - Consejos personalizados

4. **Historial** (`/historial`)
   - Ver todos los cálculos realizados
   - Estadísticas generales

5. **Consejos** (`/consejos`)
   - Todos los consejos organizados por categoría
   - Potencial de reducción
   - Nivel de dificultad

6. **Acerca** (`/acerca`)
   - Información sobre huella de carbono
   - Factores de emisión utilizados
   - Objetivos globales

## 🔧 Configuración

### Puerto del Servidor

Por defecto, el servidor corre en el puerto 3000. Para cambiar el puerto:

**Opción 1: Variable de entorno**
```bash
PORT=8080 npm start
```

**Opción 2: Modificar app.js**
```javascript
const PORT = process.env.PORT || 8080;
```

### Personalizar Consejos

Edita el objeto `tips` en `app.js`:

```javascript
const tips = {
  transporte: [
    {
      level: 'promedio',
      title: 'Tu consejo aquí',
      description: 'Descripción...',
      reduction: 500,
      difficulty: 'facil'
    }
  ]
  // ... más categorías
};
```

### Factores de Emisión

Modifica los factores en la función `calculateEmissions()` en `app.js`:

```javascript
const CAR_FACTOR = 0.21;  // kg CO2 por km
const ELECTRICITY_FACTOR = 0.475;  // kg CO2 por kWh
// etc.
```

## 📊 Modelo de Cálculo

### Factores de Emisión

**Transporte:**
- Auto: 0.21 kg CO₂/km
- Transporte público: 0.089 kg CO₂/hora
- Vuelo: 1,100 kg CO₂/vuelo

**Energía:**
- Electricidad: 0.475 kg CO₂/kWh
- Gas natural: 2.03 kg CO₂/m³

**Alimentación:**
- Carnívoro: 3,300 kg CO₂/año
- Moderado: 2,200 kg CO₂/año
- Vegetariano: 1,700 kg CO₂/año
- Vegano: 1,500 kg CO₂/año

**Consumo:**
- Por compra: 150 kg CO₂
- Beneficio reciclaje: -10%

### Niveles de Huella

- **Excelente**: < 4,000 kg CO₂/año
- **Bueno**: 4,000 - 6,000 kg CO₂/año
- **Promedio**: 6,000 - 10,000 kg CO₂/año
- **Alto**: 10,000 - 15,000 kg CO₂/año
- **Muy Alto**: > 15,000 kg CO₂/año

## 🗄️ Base de Datos

Esta versión usa almacenamiento en **memoria**:
- ✅ No requiere configuración
- ✅ Fácil de usar
- ⚠️ Los datos se pierden al reiniciar el servidor

### Migrar a Base de Datos Persistente

Para producción, considera agregar MongoDB o PostgreSQL:

**MongoDB:**
```bash
npm install mongoose
```

**PostgreSQL:**
```bash
npm install pg sequelize
```

## 🌐 Despliegue

### Opción 1: Heroku

```bash
# Instalar Heroku CLI
heroku login
heroku create mi-calculadora-carbono
git push heroku main
```

### Opción 2: Vercel

```bash
npm install -g vercel
vercel
```

### Opción 3: DigitalOcean / AWS

1. Subir código al servidor
2. Instalar Node.js
3. Instalar dependencias: `npm install --production`
4. Usar PM2 para mantener la app corriendo:
```bash
npm install -g pm2
pm2 start app.js
pm2 startup
pm2 save
```

## 🔒 Seguridad

Para producción:
- [ ] Usar HTTPS
- [ ] Agregar helmet: `npm install helmet`
- [ ] Configurar CORS apropiadamente
- [ ] Validar inputs del usuario
- [ ] Agregar rate limiting

## 🤝 Dependencias

- **express**: Framework web para Node.js
- **ejs**: Motor de plantillas
- **body-parser**: Parsear datos de formularios

## 📝 Licencia

MIT License - Libre de usar, modificar y distribuir

## 💡 Ventajas sobre la Versión Django

1. **Más Simple**: Menos código, más fácil de entender
2. **Sin Configuración**: No requiere configuración de base de datos
3. **Ligero**: Menor footprint de memoria
4. **Rápido**: Node.js es muy eficiente
5. **Fácil Despliegue**: Múltiples opciones gratuitas

## 🎓 Aprendizaje

Este proyecto es ideal para aprender:
- Express.js y Node.js
- Plantillas EJS
- Rutas y middleware
- Formularios y manejo de datos
- Bootstrap y diseño responsive

## 📞 Soporte

Para problemas comunes:

**Error: Cannot find module 'express'**
```bash
npm install
```

**Puerto en uso**
```bash
PORT=8080 npm start
```

**Página no carga**
- Verifica que el servidor esté corriendo
- Revisa la consola por errores
- Verifica que Bootstrap CDN esté accesible

## 🌟 Próximas Mejoras

Ideas para extender el proyecto:
- [ ] Agregar persistencia con MongoDB
- [ ] Sistema de usuarios con autenticación
- [ ] Gráficos con Chart.js
- [ ] Exportar resultados a PDF
- [ ] API REST para apps móviles
- [ ] Comparar con amigos
- [ ] Calculadora de compensación de carbono

---

**¡Disfruta calculando tu huella de carbono! 🌍💚**
