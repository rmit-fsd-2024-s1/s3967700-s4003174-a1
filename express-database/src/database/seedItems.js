const db = require("./index.js");

const seedItems = async () => {
  try {
    await db.sequelize.sync(); // Ensure the database is in sync

    // Add sample items
    const items = [
      { ItemName: 'Advocado', Price: 5.35 },
      { ItemName: 'Arugala 100g', Price: 5.20 },
      { ItemName: 'Cabbage', Price: 8.21 },
      { ItemName: 'Carrots', Price: 4.55 },
      { ItemName: 'Chillies 100g', Price: 5.29 },
      { ItemName: 'Cucumber', Price: 5.99 },
      { ItemName: 'Eggplant', Price: 5.95 },
      { ItemName: 'Garlic 100g', Price: 8.92 },
      { ItemName: 'Kale', Price: 5.47 },
      { ItemName: 'Lettuce 100g', Price: 5.99 },
      { ItemName: 'Mangoes', Price: 5.99 },
      { ItemName: 'Mushrooms 150g', Price: 7.79 },
      { ItemName: 'Onions 500g', Price: 3.60 },
      { ItemName: 'Papaya', Price: 4.60 },
      { ItemName: 'Pineapple', Price: 7.69 },
      { ItemName: 'Potatoes 1kg', Price: 7.49 },
      { ItemName: 'Spinach 100g', Price: 4.09 },
      { ItemName: 'Tomatoes 500g', Price: 9.79 },
    ];

    for (const item of items) {
      await db.item.create(item);
    }

    console.log("Items have been added successfully.");
  } catch (error) {
    console.error("Error seeding items:", error);
  }
};

seedItems().then(() => process.exit());