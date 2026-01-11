const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Base de datos en memoria (para simplicidad)
let calculations = [];
let calculationIdCounter = 1;

// Consejos de reducción
const tips = {
  transporte: [
    {
      level: 'muy_alto',
      title: 'Usa transporte público',
      description: 'Cambiar del auto al transporte público reduce tus emisiones hasta en un 80%.',
      reduction: 2000,
      difficulty: 'medio'
    },
    {
      level: 'alto',
      title: 'Considera un vehículo eléctrico',
      description: 'Los vehículos eléctricos producen significativamente menos emisiones.',
      reduction: 1800,
      difficulty: 'dificil'
    },
    {
      level: 'promedio',
      title: 'Usa bicicleta o camina',
      description: 'Para distancias cortas (< 5km), usa bicicleta o camina.',
      reduction: 800,
      difficulty: 'facil'
    }
  ],
  energia: [
    {
      level: 'muy_alto',
      title: 'Cambia a energías renovables',
      description: 'Instala paneles solares o contrata energía 100% renovable.',
      reduction: 2500,
      difficulty: 'dificil'
    },
    {
      level: 'promedio',
      title: 'Reemplaza bombillas con LED',
      description: 'Las bombillas LED consumen 75% menos energía.',
      reduction: 300,
      difficulty: 'facil'
    },
    {
      level: 'bueno',
      title: 'Desconecta aparatos en standby',
      description: 'Usa regletas con interruptor para apagar aparatos completamente.',
      reduction: 200,
      difficulty: 'facil'
    }
  ],
  alimentacion: [
    {
      level: 'muy_alto',
      title: 'Reduce el consumo de carne roja',
      description: 'La carne roja genera 10-40 veces más emisiones que las verduras.',
      reduction: 1500,
      difficulty: 'medio'
    },
    {
      level: 'alto',
      title: 'Un día sin carne por semana',
      description: 'Implementar "Lunes sin carne" reduce significativamente tu huella.',
      reduction: 500,
      difficulty: 'facil'
    },
    {
      level: 'promedio',
      title: 'Compra productos locales',
      description: 'Los alimentos locales requieren menos transporte.',
      reduction: 300,
      difficulty: 'facil'
    }
  ],
  consumo: [
    {
      level: 'muy_alto',
      title: 'Adopta el minimalismo',
      description: 'Compra solo lo necesario. Cada producto tiene una huella.',
      reduction: 1000,
      difficulty: 'medio'
    },
    {
      level: 'promedio',
      title: 'Repara en lugar de reemplazar',
      description: 'Intenta reparar ropa, electrónicos y muebles antes de tirarlos.',
      reduction: 500,
      difficulty: 'medio'
    },
    {
      level: 'bueno',
      title: 'Implementa las 3R',
      description: 'Reduce, Reutiliza, Recicla - en ese orden de prioridad.',
      reduction: 400,
      difficulty: 'facil'
    }
  ]
};

// Función para calcular emisiones
function calculateEmissions(data) {
  // Factores de emisión
  const CAR_FACTOR = 0.21; // kg CO2 por km
  const PUBLIC_TRANSPORT_FACTOR = 0.089; // kg CO2 por hora
  const FLIGHT_FACTOR = 1100; // kg CO2 por vuelo
  const ELECTRICITY_FACTOR = 0.475; // kg CO2 por kWh
  const GAS_FACTOR = 2.03; // kg CO2 por m³

  // Emisiones de dieta (kg CO2/año)
  const DIET_EMISSIONS = {
    carnivoro: 3300,
    moderado: 2200,
    vegetariano: 1700,
    vegano: 1500
  };

  const SHOPPING_FACTOR = 150; // kg CO2 por compra
  const RECYCLING_REDUCTION = 0.1; // 10%

  // Calcular emisiones
  const transportEmissions = 
    parseFloat(data.carKm || 0) * 52 * CAR_FACTOR +
    parseFloat(data.publicTransportHours || 0) * 52 * PUBLIC_TRANSPORT_FACTOR +
    parseInt(data.flights || 0) * FLIGHT_FACTOR;

  const energyEmissions = 
    parseFloat(data.electricity || 0) * 12 * ELECTRICITY_FACTOR +
    parseFloat(data.gas || 0) * 12 * GAS_FACTOR;

  const foodEmissions = DIET_EMISSIONS[data.diet] || 2200;

  let consumptionEmissions = parseInt(data.shopping || 0) * 12 * SHOPPING_FACTOR;
  if (data.recycles === 'on') {
    consumptionEmissions *= (1 - RECYCLING_REDUCTION);
  }

  const totalEmissions = transportEmissions + energyEmissions + foodEmissions + consumptionEmissions;

  // Determinar nivel
  let level;
  if (totalEmissions < 4000) level = 'excelente';
  else if (totalEmissions < 6000) level = 'bueno';
  else if (totalEmissions < 10000) level = 'promedio';
  else if (totalEmissions < 15000) level = 'alto';
  else level = 'muy_alto';

  return {
    transport: Math.round(transportEmissions),
    energy: Math.round(energyEmissions),
    food: Math.round(foodEmissions),
    consumption: Math.round(consumptionEmissions),
    total: Math.round(totalEmissions),
    level: level
  };
}

// Función para obtener consejos según nivel
function getTipsForLevel(level) {
  const relevantTips = {};
  
  for (const category in tips) {
    relevantTips[category] = tips[category].filter(tip => 
      tip.level === level || tip.level === 'promedio'
    ).slice(0, 3);
  }
  
  return relevantTips;
}

// RUTAS

// Página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Formulario de cálculo
app.get('/calcular', (req, res) => {
  res.render('calculate');
});

// Procesar cálculo
app.post('/calcular', (req, res) => {
  const emissions = calculateEmissions(req.body);
  
  const calculation = {
    id: calculationIdCounter++,
    date: new Date(),
    name: req.body.name || 'Anónimo',
    emissions: emissions,
    data: req.body
  };
  
  calculations.push(calculation);
  
  res.redirect(`/resultados/${calculation.id}`);
});

// Mostrar resultados
app.get('/resultados/:id', (req, res) => {
  const calculation = calculations.find(c => c.id === parseInt(req.params.id));
  
  if (!calculation) {
    return res.redirect('/');
  }
  
  const relevantTips = getTipsForLevel(calculation.emissions.level);
  
  // Calcular porcentajes
  const total = calculation.emissions.total;
  const percentages = {
    transport: ((calculation.emissions.transport / total) * 100).toFixed(1),
    energy: ((calculation.emissions.energy / total) * 100).toFixed(1),
    food: ((calculation.emissions.food / total) * 100).toFixed(1),
    consumption: ((calculation.emissions.consumption / total) * 100).toFixed(1)
  };
  
  // Comparaciones
  const worldAverage = 8000;
  const countryAverage = 6000;
  const comparisons = {
    world: (((total - worldAverage) / worldAverage) * 100).toFixed(1),
    country: (((total - countryAverage) / countryAverage) * 100).toFixed(1)
  };
  
  res.render('results', {
    calculation,
    tips: relevantTips,
    percentages,
    comparisons,
    worldAverage,
    countryAverage
  });
});

// Historial
app.get('/historial', (req, res) => {
  const stats = calculations.length > 0 ? {
    total: calculations.length,
    average: Math.round(calculations.reduce((sum, c) => sum + c.emissions.total, 0) / calculations.length),
    lowest: Math.min(...calculations.map(c => c.emissions.total)),
    highest: Math.max(...calculations.map(c => c.emissions.total))
  } : null;
  
  res.render('history', {
    calculations: calculations.slice().reverse(),
    stats
  });
});

// Consejos
app.get('/consejos', (req, res) => {
  res.render('tips', { tips });
});

// Acerca de
app.get('/acerca', (req, res) => {
  res.render('about');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌱 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Calculadora de Huella de Carbono iniciada`);
});
