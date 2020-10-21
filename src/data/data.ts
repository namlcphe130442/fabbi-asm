import DataJson from './dishes.json';

const order: OrderDetail = {meal: {id: 0, name: ''}, people: 1, restaurant: '', dishes: []};
// {id: 1, name: 'Coleslaw Sandwich', numOfDish: 3 }, {id: 2, name: 'Grilled Sandwich', numOfDish: 5 }
localStorage.setItem('OrderDetail', JSON.stringify(order));

var dishes: Array<Dish> = DataJson.dishes !== null ? DataJson.dishes : [];

var meals = [
  {
    id: 1,
    name: "breakfast",
  },
  {
    id: 2,
    name: "lunch",
  },
  {
    id: 3,
    name: "dinner",
  },
];

var restaurants: Array<string> = [];
dishes.forEach(dish => {    
  if(!restaurants.includes(dish.restaurant))
    restaurants.push(dish.restaurant); 
});

export const MEALS = meals;
export const DISHES = dishes;


