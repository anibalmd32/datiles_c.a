export type FeatureCardItem = {
  title: string;
  description: string;
  benefits: string[];
};

export const featureCardItems: FeatureCardItem[] = [
    {
        title: "Configura tu entorno",
        description:
      "Altamente configurable para una experiencia mas personalizada",
        benefits: [
            "Gestiona tu usuario",
            "Agrega categorías para tus productos",
            "Habilita o deshabilita métodos de pagos",
        ],
    },
    {
        title: "Gestiona tu inventario",
        description: "Registra tus productos y lleva el control de tu inventario",
        benefits: [
            "Agrega productos",
            "Búsqueda eficiente mediante filtros",
            "Visualiza tu inversion",
        ],
    },
    {
        title: "Genera ventas",
        description:
      "El resultado final es el aumento de las ventas y el alcance de tu negocio",
        benefits: [
            "Registra ventas en segundos",
            "Despacha a tus clientes al instante",
            "Visualiza tus ganancias",
        ],
    },
];
